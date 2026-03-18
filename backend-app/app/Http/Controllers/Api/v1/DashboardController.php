<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Journal;
use App\Models\Note;
use App\Models\PomodoroSession;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    use ApiResponse;

    public function summary(Request $request): JsonResponse
    {
        $user = $request->user();

        $taskBaseQuery = $user->tasks();

        $today = Carbon::now();
        $startOfWeek = Carbon::now()->startOfWeek();

        $stats = [
            'total_tasks' => (clone $taskBaseQuery)->count(),
            'pending_tasks' => (clone $taskBaseQuery)->whereIn('status', ['pending', 'in_progress'])->count(),
            'completed_tasks' => (clone $taskBaseQuery)->where('status', 'completed')->count(),
            'overdue_tasks' => (clone $taskBaseQuery)
                ->where('status', '!=', 'completed')
                ->whereNotNull('due_date')
                ->where('due_date', '<', $today)
                ->count(),
            'focus_minutes_this_week' => (int) PomodoroSession::query()
                ->where('user_id', $user->id)
                ->where('session_type', 'focus')
                ->where('status', 'completed')
                ->where('started_at', '>=', $startOfWeek)
                ->sum('actual_minutes'),
            'journals_this_week' => Journal::query()
                ->where('user_id', $user->id)
                ->where('entry_date', '>=', $startOfWeek->toDateString())
                ->count(),
        ];

        $recentNotes = Note::query()
            ->where('user_id', $user->id)
            ->latest('updated_at')
            ->limit(5)
            ->get(['id', 'title', 'updated_at']);

        $recentJournals = Journal::query()
            ->where('user_id', $user->id)
            ->latest('entry_date')
            ->limit(5)
            ->get(['id', 'title', 'entry_date', 'mood']);

        $recentActivity = [
            'notes' => Note::query()
                ->where('user_id', $user->id)
                ->latest('updated_at')
                ->limit(3)
                ->get(['id', 'title', 'updated_at'])
                ->map(fn(Note $note) => [
                    'type' => 'note',
                    'id' => $note->id,
                    'title' => $note->title,
                    'timestamp' => $note->updated_at,
                ]),
            'journals' => Journal::query()
                ->where('user_id', $user->id)
                ->latest('updated_at')
                ->limit(3)
                ->get(['id', 'title', 'updated_at'])
                ->map(fn(Journal $journal) => [
                    'type' => 'journal',
                    'id' => $journal->id,
                    'title' => $journal->title ?: 'Journal entry',
                    'timestamp' => $journal->updated_at,
                ]),
            'pomodoro_sessions' => PomodoroSession::query()
                ->where('user_id', $user->id)
                ->latest('updated_at')
                ->limit(3)
                ->get(['id', 'session_type', 'status', 'updated_at'])
                ->map(fn(PomodoroSession $session) => [
                    'type' => 'pomodoro',
                    'id' => $session->id,
                    'title' => ucfirst(str_replace('_', ' ', $session->session_type)) . ' session',
                    'status' => $session->status,
                    'timestamp' => $session->updated_at,
                ]),
        ];

        return $this->success([
            'stats' => $stats,
            'recent_notes' => $recentNotes,
            'recent_journals' => $recentJournals,
            'recent_activity' => $recentActivity,
        ], 'Dashboard summary fetched');
    }
}
