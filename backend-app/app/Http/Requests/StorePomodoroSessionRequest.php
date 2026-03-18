<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePomodoroSessionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'task_id' => ['nullable', 'integer', 'exists:tasks,id'],
            'session_type' => ['sometimes', Rule::in(['focus', 'short_break', 'long_break'])],
            'planned_minutes' => ['sometimes', 'integer', 'min:1', 'max:180'],
            'actual_minutes' => ['sometimes', 'nullable', 'integer', 'min:0', 'max:180'],
            'status' => ['sometimes', Rule::in(['running', 'completed', 'cancelled'])],
            'started_at' => ['required', 'date'],
            'ended_at' => ['nullable', 'date', 'after_or_equal:started_at'],
        ];
    }
}
