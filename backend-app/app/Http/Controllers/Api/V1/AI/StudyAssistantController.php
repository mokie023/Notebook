<?php

namespace App\Http\Controllers\Api\V1\AI;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StudyAssistantController extends Controller
{
    public function summarize(Request $request): JsonResponse
    {
        return response()->json([
            'success' => true,
            'feature' => 'summarize',
            'message' => 'Summarize endpoint reached successfully.',
            'data' => [
                'input' => $request->input('content'),
                'summary' => 'This is a mock summary for now.'
            ]
        ]);
    }
}