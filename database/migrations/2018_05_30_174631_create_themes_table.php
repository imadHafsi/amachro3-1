<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateThemesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('themes', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('user_id')->unsigned();
            $table->string('primary')->default('#1976D2');
            $table->string('secondary')->default('#424242');
            $table->string('accent')->default('#82B1FF');
            $table->string('error')->default('#FF5252');
            $table->string('info')->default('#2196F3');
            $table->string('success')->default('#4CAF50');
            $table->string('warning')->default('#FFC107');
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
        Schema::dropIfExists('themes');
    }
}
