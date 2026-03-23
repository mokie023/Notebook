<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNoteRequest extends FormRequest
{
    public function rules()
    {
        return [
            'content' => 'nullable|string',
            'file' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (!$this->input('content') && !$this->hasFile('file')) {
                $validator->errors()->add('content', 'You must provide either content or a file.');
            }
        });
    }

    public function authorize()
    {
        return true;
    }
}