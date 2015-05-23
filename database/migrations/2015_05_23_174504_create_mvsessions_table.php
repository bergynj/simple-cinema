<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMvsessionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mvsessions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->integer('cinema_id');
			$table->integer('movie_id');
			$table->date('session_time');
			$table->timestamps();
			// $table->foreign('cinema_id')->references('id')->on('cinema');
			// $table->foreign('movie_id')->references('id')->on('movies');
			// $table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
            // $table->softDeletes();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('mvsessions');
	}

}
