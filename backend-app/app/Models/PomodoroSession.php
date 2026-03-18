<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PomodoroSession extends Model
{
    use HasFactory;

    public const SESSION_TYPES = ['focus', 'short_break', 'long_break'];
    public const STATUSES = ['running', 'completed', 'cancelled'];

    protected $fillable = [
        'user_id',
        'task_id',
        'session_type',
        'planned_minutes',
        'actual_minutes',
        'status',
        'started_at',
        'ended_at',
    ];

    protected function casts(): array
    {
        return [
            'planned_minutes' => 'integer',
            'actual_minutes' => 'integer',
            'started_at' => 'datetime',
            'ended_at' => 'datetime',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function task(): BelongsTo
    {
        return $this->belongsTo(Task::class);
    }
}
