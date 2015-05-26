<?php

use Carbon\Carbon;

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Model::unguard();

		// $this->call('UserTableSeeder');
        $this->call( 'CinemasTableSeeder' );
        $this->call( 'MoviesTableSeeder' );
        $this->call( 'MsessionTableSeeder' );

	}

}

// seed cinema tables using Eloquent model
use App\Cinemas as Cinemas;

class CinemasTableSeeder extends Seeder {
    public function run() {

        Cinemas::create([
            'name' => 'Ritz Randwick',
            'address' => '45 St Pauls Street, Randwick NSW 2031',
            'geo' => json_encode(array("lat" => "", "lang" => "")),
        ]);

        Cinemas::create([
            'name' => 'Dendy Newtown',
            'address' => '261-263 King Street, Newtown NSW 2042',
            'geo' => json_encode(array("lat" => "", "lang" => "")),
        ]);

        Cinemas::create([
            'name' => 'Dendy Opera Quay',
            'address' => 'Shop9, 2 East Circular Quay, Sydney NSW 2000',
            'geo' => json_encode(array("lat" => "", "lang" => "")),
        ]);
        Cinemas::create( [
            'name' => 'Palace Norton Street',
            'address' => '99 Norton Street, Leichhardt NSW 2040',
            'geo' => json_encode(array("lat" => "", "lang" => "")),
        ] );

        Cinemas::create([
            'name' => 'Palace Verona',
            'address' => '17 Oxford Street, Paddington',
            'geo' =>  json_encode(array("lat" => "", "lang" => "")),
        ]);

    }
}

// seed movies tables
use App\Movies as Movies;

class moviesTableSeeder extends Seeder {
    public function run() {

        Movies::create([
            'title' => 'Spy',
        ]);
        Movies::create([
            'title' => 'Mad Max: Fury Road',
        ]);
        Movies::create([
            'title' => 'Woman in Gold',
        ]);
        Movies::create([
            'title' => 'Cloud Sils of Maria',
        ]);
        Movies::create([
            'title' => 'Avengers: Age of Ultron',
        ]);

    }
}


// seed session tables
use App\Msessions as Msessions;

class MsessionTableSeeder extends Seeder {
    public function run() {

        // Carbon::create($year, $month, $day, $hour, $minute, $second, $tz);
        Msessions::create([
            'cinema_id' => 1,
            'movie_id' => 1,
            'session_time' => Carbon::create(2015, 5, 26, 9, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 2,
            'movie_id' => 3,
            'session_time' => Carbon::create(2015, 5, 26, 10, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 2,
            'movie_id' => 2,
            'session_time' => Carbon::create(2015, 5, 26, 13, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 3,
            'movie_id' => 4,
            'session_time' => Carbon::create(2015, 5, 26, 11, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 3,
            'movie_id' => 5,
            'session_time' => Carbon::create(2015, 5, 26, 9, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 3,
            'movie_id' => 4,
            'session_time' => Carbon::create(2015, 5, 26, 11, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 4,
            'movie_id' => 2,
            'session_time' => Carbon::create(2015, 5, 26, 13, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 4,
            'movie_id' => 1,
            'session_time' => Carbon::create(2015, 5, 26, 14, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 4,
            'movie_id' => 3,
            'session_time' => Carbon::create(2015, 5, 26, 18, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 5,
            'movie_id' => 5,
            'session_time' => Carbon::create(2015, 5, 26, 15, 30, 0, 'Australia/Sydney'),
        ]);

        Msessions::create([
            'cinema_id' => 5,
            'movie_id' => 4,
            'session_time' => Carbon::create(2015, 5, 26, 13, 30, 0, 'Australia/Sydney'),
        ]);

    }
}
