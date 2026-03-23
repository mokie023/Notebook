<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateNoteRequest extends FormRequest
{
    public function rules()
    {
        return [
            'content' => 'nullable|string',
            'file' => 'sometimes|file|mimes:jpg,jpeg,png,pdf',
            // other rules as needed
        ];
    }

    public function authorize()
    {
        return true;
    }
}