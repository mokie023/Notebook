<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Models\Note;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NoteController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = Note::query()
            ->where('user_id', $request->user()->id)
            ->with(['category:id,name,color', 'tags:id,name,slug'])
            ->latest();

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where(function ($nested) use ($search) {
                $nested
                    ->where('title', 'like', "%{$search}%")
                    ->orWhere('content', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category_id')) {
            $query->where('note_category_id', $request->integer('category_id'));
        }

        if ($request->filled('tag')) {
            $tag = $request->string('tag')->toString();
            $query->whereHas('tags', function ($nested) use ($tag) {
                $nested->where('slug', $tag)->orWhere('name', $tag);
            });
        }

        if ($request->has('is_pinned')) {
            $query->where('is_pinned', $request->boolean('is_pinned'));
        }

        $perPage = max(1, min(100, $request->integer('per_page', 10)));

        return $this->success($query->paginate($perPage)->withQueryString(), 'Notes fetched');
    }

    public function store(StoreNoteRequest $request): JsonResponse
    {
        $payload = $request->safe()->except(['tag_ids', 'new_tags', 'file']);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $payload['file_path'] = $file->store('notes', 'public');
            $payload['file_name'] = $file->getClientOriginalName();
            $payload['file_type'] = $file->extension();
            $payload['file_size'] = $file->getSize();
        }

        $note = $request->user()->notes()->create($payload);

        $this->syncTags($note, $request);

        return $this->success($note->load(['category', 'tags']), 'Note created', 201);
    }

    public function show(Request $request, Note $note): JsonResponse
    {
        $this->abortIfNotOwner($note, $request);

        return $this->success($note->load(['category', 'tags']), 'Note fetched');
    }

    public function update(UpdateNoteRequest $request, Note $note): JsonResponse
    {
        $this->abortIfNotOwner($note, $request);

        $payload = $request->safe()->except(['tag_ids', 'new_tags', 'file']);

        if ($request->hasFile('file')) {
            if ($note->file_path && Storage::disk('public')->exists($note->file_path)) {
                Storage::disk('public')->delete($note->file_path);
            }

            $file = $request->file('file');
            $payload['file_path'] = $file->store('notes', 'public');
            $payload['file_name'] = $file->getClientOriginalName();
            $payload['file_type'] = $file->extension();
            $payload['file_size'] = $file->getSize();
        }

        $note->update($payload);

        if ($request->has('tag_ids') || $request->has('new_tags')) {
            $this->syncTags($note, $request);
        }

        return $this->success($note->load(['category', 'tags']), 'Note updated');
    }

    public function destroy(Request $request, Note $note): JsonResponse
    {
        $this->abortIfNotOwner($note, $request);

        if ($note->file_path && Storage::disk('public')->exists($note->file_path)) {
            Storage::disk('public')->delete($note->file_path);
        }

        $note->delete();

        return $this->success(null, 'Note deleted');
    }

    private function abortIfNotOwner(Note $note, Request $request): void
    {
        abort_if($note->user_id !== $request->user()->id, 404);
    }

    private function syncTags(Note $note, Request $request): void
    {
        $userId = $request->user()->id;

        $existingTagIds = collect($request->input('tag_ids', []));

        $createdTagIds = collect($request->input('new_tags', []))
            ->filter(fn($name) => is_string($name) && trim($name) !== '')
            ->map(function (string $name) use ($userId) {
                $normalized = trim($name);
                $slug = Str::slug(Str::lower($normalized));

                return Tag::firstOrCreate(
                    ['user_id' => $userId, 'slug' => $slug],
                    ['name' => $normalized]
                )->id;
            });

        $note->tags()->sync($existingTagIds->merge($createdTagIds)->unique()->values());
    }
}
