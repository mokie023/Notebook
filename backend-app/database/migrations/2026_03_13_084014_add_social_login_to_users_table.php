<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // 1. Make the existing password column optional
            $table->string('password')->nullable()->change();

            // 2. Add columns to store the Google and GitHub IDs
            $table->string('google_id')->nullable()->unique();
            $table->string('github_id')->nullable()->unique();

            // 3. Keep track of how they registered (email, google, or github)
            $table->string('auth_type')->default('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Revert password to required
            $table->string('password')->nullable(false)->change();

            // Remove the newly added columns
            $table->dropColumn(['google_id', 'github_id', 'auth_type']);
        });
    }
};
