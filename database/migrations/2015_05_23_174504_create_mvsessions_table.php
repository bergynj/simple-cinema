<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMvsessionsTable extends Migration {

	/**
	 * Create Session time schema to run  for the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('mvsessions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamp('session_time');
			$table->timestamps();
            // $table->softDeletes();
		});

        // create pivot table : cinema, mvsessions => cinema_mvsession
        Schema::create('cinema_mvsession', function(Blueprint $table)
        {
			$table->integer('cinema_id')->unsigned()->index();
			$table->integer('mvsesion_id')->unsigned()->index();
			$table->timestamps();
            $table->foreign('cinema_id')->references('id')->on('cinema')->onDelete('cascade');
        });

        // create pivot table : movies, mvsessions => movie_mvsession
        Schema::create('movie_mvsession', function(Blueprint $table)
        {
			$table->integer('movie_id')->unsigned()->index();
			$table->integer('mvsesion_id')->unsigned()->index();
			$table->timestamps();
			$table->foreign('movie_id')->references('id')->on('movies')->onDelete('cascade');
        });
	}

	/**
	 * Drpo Session time tables to reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('mvsessions');
		Schema::drop('cinema_mvsession');
		Schema::drop('movie_mvsession');
	}

}