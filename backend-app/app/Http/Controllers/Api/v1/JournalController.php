<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreJournalRequest;
use App\Http\Requests\UpdateJournalRequest;
use App\Models\Journal;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class JournalController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = Journal::query()
            ->where('user_id', $request->user()->id)
            ->latest('entry_date');

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($nested) use ($search) {
                $nested
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('entry', 'like', "%{$search}%");
            });
        }

        if ($request->filled('mood')) {
            $query->where('mood', $request->string('mood')->toString());
        }

        if ($request->filled('category')) {
            $query->where('category', $request->string('category')->toString());
        }

        if ($request->filled('date_from')) {
            $query->whereDate('entry_date', '>=', $request->date('date_from')->toDateString());
        }

        if ($request->filled('date_to')) {
            $query->whereDate('entry_date', '<=', $request->date('date_to')->toDateString());
        }

        $perPage = max(1, min(100, $request->integer('per_page', 10)));

        return $this->success($query->paginate($perPage)->withQueryString(), 'Journals fetched');
    }

    public function store(StoreJournalRequest $request): JsonResponse
    {
        $journal = $request->user()->journals()->create($request->validated());

        return $this->success($journal, 'Journal created', 201);
    }

    public function show(Request $request, Journal $journal): JsonResponse
    {
        $this->abortIfNotOwner($journal, $request);

        return $this->success($journal, 'Journal fetched');
    }

    public function update(UpdateJournalRequest $request, Journal $journal): JsonResponse
    {
        $this->abortIfNotOwner($journal, $request);

        $journal->update($request->validated());

        return $this->success($journal, 'Journal updated');
    }

    public function destroy(Request $request, Journal $journal): JsonResponse
    {
        $this->abortIfNotOwner($journal, $request);

        $journal->delete();

        return $this->success(null, 'Journal deleted');
    }

    private function abortIfNotOwner(Journal $journal, Request $request): void
    {
        abort_if($journal->user_id !== $request->user()->id, 404);
    }
}
