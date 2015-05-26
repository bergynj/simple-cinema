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
			$table->integer('cinema_id')->unsigned()->index();
			$table->foreign('cinema_id')
 				  ->references('id')->on('cinemas')
				  ->onDelete('cascade');
			$table->integer('movie_id')->unsigned()->index();
			$table->foreign('movie_id')
				  ->references('id')->on('movies')
				  ->onDelete('cascade');
			$table->timestamp('session_time');
			$table->timestamps();
			$table->softDeletes();
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
			DB::statement('SET FOREIGN_KEY_CHECKS = 1');
		});
	}

}
