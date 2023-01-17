<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('histories', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->comment('ID пользователя');
            $table->foreignIdFor(\App\Models\Ticket::class)->comment('ID тикета');
            $table->foreignIdFor(\App\Models\Coupon::class)->comment('ID купона')->nullable();
            $table->foreignIdFor(\App\Models\Activity::class)->comment('ID действия');
            $table->string('comment')->comment('Комментарий')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('histories');
    }
}
