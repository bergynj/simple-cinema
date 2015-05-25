<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMsessionsTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('msessions', function(Blueprint $table)
		{
			$table->increments('id');
			$table->timestamp('session_time');
			$table->timestamps();
			$table->softDeletes();
		});

		// create pivot table : cinemas, msessions => cinema_msession
		Schema::table('cinema_msession', function(Blueprint $table)
		{
			$table->integer('cinema_id')->unsigned()->index();
			$table->foreign('cinema_id')
 				  ->references('id')->on('cinemas')
				  ->onDelete('cascade');

			$table->integer('msesion_id')->unsigned()->index();
			$table->foreign('mvsesion_id')
				  ->references('id')->on('msessions')
				  ->onDelete('cascade');

			$table->timestamps();
		});

		// create pivot table : movies, msessions => movie_msession
		Schema::table('movie_msession', function(Blueprint $table)
		{
			$table->integer('movie_id')->unsigned()->index();
			$table->foreign('movie_id')
				  ->references('id')->on('movies')
				  ->onDelete('cascade');

			$table->integer('msesion_id')->unsigned()->index();
			$table->foreign('mvsesion_id')
				  ->references('id')->on('msessions')
				  ->onDelete('cascade');

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
		Schema::table('msessions', function(Blueprint $table)
		{
			DB::statement('SET FOREIGN_KEY_CHECKS = 0');
  			Schema::dropIfExists('msessions');
			Schema::dropIfExists('cinema_msession');
			Schema::dropIfExists('movie_msession');
			DB::statement('SET FOREIGN_KEY_CHECKS = 1');
		});
	}

}
