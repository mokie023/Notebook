<?php

use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\DashboardController;
use App\Http\Controllers\Api\V1\JournalController;
use App\Http\Controllers\Api\V1\NoteCategoryController;
use App\Http\Controllers\Api\V1\NoteController;
use App\Http\Controllers\Api\V1\PomodoroSessionController;
use App\Http\Controllers\Api\V1\TagController;
use App\Http\Controllers\Api\V1\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post('register', [AuthController::class, 'register']);
        Route::post('login', [AuthController::class, 'login']);

        Route::get('{provider}/redirect', [AuthController::class, 'redirect']);
        Route::get('{provider}/callback', [AuthController::class, 'callback']);

        Route::middleware('auth:sanctum')->group(function () {
            Route::get('me', [AuthController::class, 'me']);
            Route::post('logout', [AuthController::class, 'logout']);
        });
    });

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('dashboard/summary', [DashboardController::class, 'summary']);

        Route::apiResource('note-categories', NoteCategoryController::class)->except(['show']);
        Route::apiResource('tags', TagController::class)->except(['show']);
        Route::apiResource('notes', NoteController::class);
        Route::apiResource('journals', JournalController::class);
        Route::apiResource('tasks', TaskController::class);
        Route::apiResource('pomodoro-sessions', PomodoroSessionController::class);

        Route::get('pomodoro-sessions-stats', [PomodoroSessionController::class, 'stats']);
    });
});
