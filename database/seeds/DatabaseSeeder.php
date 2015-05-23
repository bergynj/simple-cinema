<?php

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
        $this->call( 'CinemaTableSeeder' );
        $this->call( 'MoviesTableSeeder' );
        // $this->call( 'SessionsTableSeeder' );

	}

}

// seed cinema tables using Eloquent model
use App\Cinema as Cinema;

class CinemaTableSeeder extends Seeder {
    public function run() {

        // clear table
        Cinema::truncate();

        Cinema::create([
            'name' => 'Ritz Randwick',
            'address' => '45 St Pauls Street, Randwick NSW 2031',
            'geo' => '{
                "lat" : "",
                "lang" : "",
            }',
        ]);

        Cinema::create([
            'name' => 'Dendy Newtown',
            'address' => '261-263 King Street, Newtown NSW 2042',
            'geo' => '{
                "lat" : "",
                "lang" : "",
            }',
        ]);

        Cinema::create([
            'name' => 'Dendy Opera Quay',
            'address' => 'Shop9, 2 East Circular Quay, Sydney NSW 2000',
            'geo' => '{
                "lat" : "",
                "lang" : "",
            }',
        ]);
        Cinema::create( [
            'name' => 'Palace Norton Street',
            'address' => '99 Norton Street, Leichhardt NSW 2040',
            'geo' => '{
                "lat" : "",
                "lang" : "",
            }',
        ] );

        Cinema::create([
            'name' => 'Palace Verona',
            'address' => '17 Oxford Street, Paddington',
            'geo' => '{
                "lat" : "",
                "lang" : "",
            }',
        ]);

    }
}

// seed movies tables
use App\Movies as Movies;

class moviesTableSeeder extends Seeder {
    public function run() {

        // clear table
        Movies::truncate();

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
use App\Sessions as Mvsessions;

class mvsessionsTableSeeder extends Seeder {
    public function run() {

        // clear table
        // Mvsessions::truncate();


    }
}
