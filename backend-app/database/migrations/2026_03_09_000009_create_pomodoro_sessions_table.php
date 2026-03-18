<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pomodoro_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('task_id')->nullable()->constrained()->nullOnDelete();
            $table->enum('session_type', ['focus', 'short_break', 'long_break'])->default('focus');
            $table->unsignedTinyInteger('planned_minutes')->default(25);
            $table->unsignedTinyInteger('actual_minutes')->nullable();
            $table->enum('status', ['running', 'completed', 'cancelled'])->default('running');
            $table->dateTime('started_at');
            $table->dateTime('ended_at')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'session_type']);
            $table->index(['user_id', 'status']);
            $table->index(['user_id', 'started_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pomodoro_sessions');
    }
};
