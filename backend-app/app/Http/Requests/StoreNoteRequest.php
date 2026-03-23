<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'content' => ['nullable', 'string'],
            'file' => ['nullable', 'file', 'mimes:pdf,docx,doc,txt', 'max:10240'],
            'note_category_id' => [
                'nullable',
                'integer',
                Rule::exists('note_categories', 'id')->where('user_id', $this->user()->id),
            ],
            'is_pinned' => ['sometimes', 'boolean'],
            'tag_ids' => ['sometimes', 'array'],
            'tag_ids.*' => [
                'integer',
                Rule::exists('tags', 'id')->where('user_id', $this->user()->id),
            ],
            'new_tags' => ['sometimes', 'array'],
            'new_tags.*' => ['string', 'max:50'],
        ];
    }

    public function withValidator($validator): void
    {
        $validator->after(function ($validator) {
            $hasContent = $this->filled('content') && trim($this->input('content')) !== '';
            $hasFile = $this->hasFile('file');

            if (!$hasContent && !$hasFile) {
                $validator->errors()->add(
                    'content',
                    'At least one of text content or file must be provided.'
                );
            }
        });
    }
}