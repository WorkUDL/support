<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCouponsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coupons', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(\App\Models\User::class)->comment('ID сотрудника');
            $table->string('code')->comment('Код купона')->index();
            $table->tinyInteger('weight')->comment('Вес')->default(1);
            $table->boolean('active')->comment('Статус')->default(1);
            $table->date('expiration_date')->comment('Срок жизни');
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
        Schema::dropIfExists('coupons');
    }
}
