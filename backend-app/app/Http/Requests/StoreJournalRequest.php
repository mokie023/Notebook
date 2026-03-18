<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJournalRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['nullable', 'string', 'max:255'],
            'entry' => ['required', 'string'],
            'entry_date' => ['required', 'date'],
            'mood' => ['nullable', 'string', 'max:50'],
            'category' => ['nullable', 'string', 'max:100'],
        ];
    }
}
