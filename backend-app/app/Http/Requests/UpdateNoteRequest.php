<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'required', 'string', 'max:255'],
            'content' => ['sometimes', 'required', 'string'],
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
}
