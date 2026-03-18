<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StorePomodoroSessionRequest;
use App\Http\Requests\UpdatePomodoroSessionRequest;
use App\Models\PomodoroSession;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PomodoroSessionController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = PomodoroSession::query()
            ->where('user_id', $request->user()->id)
            ->with('task:id,title')
            ->latest('started_at');

        if ($request->filled('session_type')) {
            $query->where('session_type', $request->string('session_type')->toString());
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->toString());
        }

        if ($request->filled('task_id')) {
            $query->where('task_id', $request->integer('task_id'));
        }

        if ($request->filled('date_from')) {
            $query->whereDate('started_at', '>=', $request->date('date_from')->toDateString());
        }

        if ($request->filled('date_to')) {
            $query->whereDate('started_at', '<=', $request->date('date_to')->toDateString());
        }

        $perPage = max(1, min(100, $request->integer('per_page', 10)));

        return $this->success($query->paginate($perPage)->withQueryString(), 'Pomodoro sessions fetched');
    }

    public function store(StorePomodoroSessionRequest $request): JsonResponse
    {
        $this->ensureTaskOwnership($request);

        $payload = $this->normalizePayload($request->validated());
        $session = $request->user()->pomodoroSessions()->create($payload);

        return $this->success($session->load('task:id,title'), 'Pomodoro session created', 201);
    }

    public function show(Request $request, PomodoroSession $pomodoroSession): JsonResponse
    {
        $this->abortIfNotOwner($pomodoroSession, $request);

        return $this->success($pomodoroSession->load('task:id,title'), 'Pomodoro session fetched');
    }

    public function update(UpdatePomodoroSessionRequest $request, PomodoroSession $pomodoroSession): JsonResponse
    {
        $this->abortIfNotOwner($pomodoroSession, $request);
        $this->ensureTaskOwnership($request);

        $payload = $this->normalizePayload($request->validated(), $pomodoroSession);
        $pomodoroSession->update($payload);

        return $this->success($pomodoroSession->load('task:id,title'), 'Pomodoro session updated');
    }

    public function destroy(Request $request, PomodoroSession $pomodoroSession): JsonResponse
    {
        $this->abortIfNotOwner($pomodoroSession, $request);

        $pomodoroSession->delete();

        return $this->success(null, 'Pomodoro session deleted');
    }

    public function stats(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        $completedFocusMinutes = (int) PomodoroSession::query()
            ->where('user_id', $userId)
            ->where('session_type', 'focus')
            ->where('status', 'completed')
            ->sum('actual_minutes');

        $completedSessions = PomodoroSession::query()
            ->where('user_id', $userId)
            ->where('status', 'completed')
            ->count();

        $cancelledSessions = PomodoroSession::query()
            ->where('user_id', $userId)
            ->where('status', 'cancelled')
            ->count();

        return $this->success([
            'completed_focus_minutes' => $completedFocusMinutes,
            'completed_sessions' => $completedSessions,
            'cancelled_sessions' => $cancelledSessions,
        ], 'Pomodoro stats fetched');
    }

    private function ensureTaskOwnership(Request $request): void
    {
        if (! $request->filled('task_id')) {
            return;
        }

        $taskExists = Task::query()
            ->where('id', $request->integer('task_id'))
            ->where('user_id', $request->user()->id)
            ->exists();

        abort_if(! $taskExists, 422, 'Selected task does not belong to authenticated user.');
    }

    private function normalizePayload(array $payload, ?PomodoroSession $session = null): array
    {
        $startedAt = isset($payload['started_at'])
            ? Carbon::parse($payload['started_at'])
            : ($session?->started_at ?? Carbon::now());

        $endedAt = isset($payload['ended_at']) && $payload['ended_at'] !== null
            ? Carbon::parse($payload['ended_at'])
            : ($session?->ended_at);

        if ($endedAt !== null && ! isset($payload['actual_minutes'])) {
            $payload['actual_minutes'] = max(0, (int) $startedAt->diffInMinutes($endedAt));
        }

        if (($payload['status'] ?? $session?->status) === 'completed' && $endedAt === null) {
            $payload['ended_at'] = Carbon::now();

            if (! isset($payload['actual_minutes'])) {
                $payload['actual_minutes'] = max(0, (int) $startedAt->diffInMinutes(Carbon::now()));
            }
        }

        return $payload;
    }

    private function abortIfNotOwner(PomodoroSession $session, Request $request): void
    {
        abort_if($session->user_id !== $request->user()->id, 404);
    }
}
