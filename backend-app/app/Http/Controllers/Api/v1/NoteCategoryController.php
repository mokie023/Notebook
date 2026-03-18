<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Api\Concerns\ApiResponse;
use App\Http\Controllers\Controller;
use App\Models\NoteCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;

class NoteCategoryController extends Controller
{
    use ApiResponse;

    public function index(Request $request): JsonResponse
    {
        $categories = NoteCategory::query()
            ->where('user_id', $request->user()->id)
            ->orderBy('name')
            ->get();

        return $this->success($categories, 'Note categories fetched');
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:80'],
            'color' => ['nullable', 'string', 'max:20'],
        ]);

        $slug = Str::slug(Str::lower($validated['name']));

        $request->validate([
            'name' => [
                Rule::unique('note_categories', 'name')->where('user_id', $request->user()->id),
            ],
        ]);

        $category = $request->user()->noteCategories()->create([
            'name' => $validated['name'],
            'slug' => $slug,
            'color' => $validated['color'] ?? null,
        ]);

        return $this->success($category, 'Category created', 201);
    }

    public function update(Request $request, NoteCategory $noteCategory): JsonResponse
    {
        $this->abortIfNotOwner($noteCategory, $request);

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:80'],
            'color' => ['sometimes', 'nullable', 'string', 'max:20'],
        ]);

        if (isset($validated['name'])) {
            $request->validate([
                'name' => [
                    Rule::unique('note_categories', 'name')
                        ->where('user_id', $request->user()->id)
                        ->ignore($noteCategory->id),
                ],
            ]);

            $validated['slug'] = Str::slug(Str::lower($validated['name']));
        }

        $noteCategory->update($validated);

        return $this->success($noteCategory, 'Category updated');
    }

    public function destroy(Request $request, NoteCategory $noteCategory): JsonResponse
    {
        $this->abortIfNotOwner($noteCategory, $request);

        $noteCategory->delete();

        return $this->success(null, 'Category deleted');
    }

    private function abortIfNotOwner(NoteCategory $noteCategory, Request $request): void
    {
        abort_if($noteCategory->user_id !== $request->user()->id, 404);
    }
}
