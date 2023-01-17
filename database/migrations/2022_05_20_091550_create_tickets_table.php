<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->comment('ID подавшего');
            $table->foreignIdFor(\App\Models\User::class, 'manager_id')->comment('ID ответственного');
            $table->foreignIdFor(\App\Models\Coupon::class)->nullable()->comment('ID купон');
            $table->foreignIdFor(\App\Models\Reason::class)->comment('ID проблемы');
            $table->boolean('active')->comment('Статус тикета');
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
        Schema::dropIfExists('tickets');
    }
}
