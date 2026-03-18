<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\Tag;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class TagController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $query = Tag::query()->where('user_id', $request->user()->id)->orderBy('name');

        if ($request->filled('search')) {
            $search = $request->string('search')->toString();
            $query->where('name', 'like', "%{$search}%");
        }

        return $this->success($query->get(), 'Tags fetched');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50'],
        ]);

        $slug = Str::slug(Str::lower($validated['name']));

        $request->validate([
            'name' => [
                Rule::unique('tags', 'name')->where('user_id', $request->user()->id),
            ],
        ]);

        $tag = $request->user()->tags()->create([
            'name' => $validated['name'],
            'slug' => $slug,
        ]);

        return $this->success($tag, 'Tag created', 201);
    }

    public function update(Request $request, Tag $tag): JsonResponse
    {
        $this->abortIfNotOwner($tag, $request);

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:50'],
        ]);

        $request->validate([
            'name' => [
                Rule::unique('tags', 'name')->where('user_id', $request->user()->id)->ignore($tag->id),
            ],
        ]);

        $tag->update([
            'name' => $validated['name'],
            'slug' => Str::slug(Str::lower($validated['name'])),
        ]);

        return $this->success($tag, 'Tag updated');
    }

    public function destroy(Request $request, Tag $tag): JsonResponse
    {
        $this->abortIfNotOwner($tag, $request);

        $tag->delete();

        return $this->success(null, 'Tag deleted');
    }

    private function abortIfNotOwner(Tag $tag, Request $request): void
    {
        abort_if($tag->user_id !== $request->user()->id, 404);
    }
}
