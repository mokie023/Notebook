<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateJournalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['sometimes', 'nullable', 'string', 'max:255'],
            'entry' => ['sometimes', 'required', 'string'],
            'entry_date' => ['sometimes', 'required', 'date'],
            'mood' => ['sometimes', 'nullable', 'string', 'max:50'],
            'category' => ['sometimes', 'nullable', 'string', 'max:100'],
        ];
    }
}
