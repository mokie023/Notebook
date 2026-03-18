<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('journals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title')->nullable();
            $table->longText('entry');
            $table->date('entry_date');
            $table->string('mood', 50)->nullable();
            $table->string('category', 100)->nullable();
            $table->timestamps();

            $table->index(['user_id', 'entry_date']);
            $table->index(['user_id', 'mood']);
            $table->index(['user_id', 'category']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
