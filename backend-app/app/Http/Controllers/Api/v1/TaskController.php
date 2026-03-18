<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = Task::query()
            ->where('user_id', $request->user()->id)
            ->latest();

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($nested) use ($search) {
                $nested
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status')->toString());
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->string('priority')->toString());
        }

        if ($request->boolean('overdue')) {
            $query
                ->whereNotNull('due_date')
                ->where('status', '!=', 'completed')
                ->where('due_date', '<', Carbon::now());
        }

        if ($request->filled('due_from')) {
            $query->whereDate('due_date', '>=', $request->date('due_from')->toDateString());
        }

        if ($request->filled('due_to')) {
            $query->whereDate('due_date', '<=', $request->date('due_to')->toDateString());
        }

        $perPage = max(1, min(100, $request->integer('per_page', 10)));

        return $this->success($query->paginate($perPage)->withQueryString(), 'Tasks fetched');
    }

    public function store(StoreTaskRequest $request): JsonResponse
    {
        $payload = $this->normalizePayload($request->validated());
        $task = $request->user()->tasks()->create($payload);

        return $this->success($task, 'Task created', 201);
    }

    public function show(Request $request, Task $task): JsonResponse
    {
        $this->abortIfNotOwner($task, $request);

        return $this->success($task->load('pomodoroSessions'), 'Task fetched');
    }

    public function update(UpdateTaskRequest $request, Task $task): JsonResponse
    {
        $this->abortIfNotOwner($task, $request);

        $payload = $this->normalizePayload($request->validated(), $task);
        $task->update($payload);

        return $this->success($task, 'Task updated');
    }

    public function destroy(Request $request, Task $task): JsonResponse
    {
        $this->abortIfNotOwner($task, $request);

        $task->delete();

        return $this->success(null, 'Task deleted');
    }

    private function normalizePayload(array $payload, ?Task $task = null): array
    {
        $status = $payload['status'] ?? $task?->status ?? 'pending';
        $progress = $payload['progress_percent'] ?? $task?->progress_percent ?? 0;

        if ($progress >= 100) {
            $status = 'completed';
            $progress = 100;
        }

        if ($status === 'completed') {
            $payload['completed_at'] = $payload['completed_at'] ?? $task?->completed_at ?? Carbon::now();
            if (! isset($payload['progress_percent']) && $progress < 100) {
                $progress = 100;
            }
        }

        if ($status !== 'completed') {
            $payload['completed_at'] = null;
        }

        $payload['status'] = $status;
        $payload['progress_percent'] = $progress;

        return $payload;
    }

    private function abortIfNotOwner(Task $task, Request $request): void
    {
        abort_if($task->user_id !== $request->user()->id, 404);
    }
}
