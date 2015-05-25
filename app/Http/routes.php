<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

// Angular Routing
Route::get('/', function(){
	return view('index');
});

// API test
Route::get('/api', 'WelcomeController@index');

// Cinema Routing
Route::get('/cinemas', 'CinemasController@index');
Route::get('/api/cinemas', 'CinemasController@all');

// List movies & session time
Route::get('/cinema/{id}', 'CinemaController@show');
Route::get('/api/cinema/{id}', 'CinemaController@get');

// Movie Routing
Route::get('/movies', 'MovieController@index');
Route::get('/api/movies', 'MovieController@all');

// Show movie details
Route::get('/movie/{title}', 'MovieController@show');
Route::get('/api/movie/{title}', 'MovieController@get');

// Admin Routing
Route::get('/admin', function(){
	return view('admin');
});

Route::get('home', 'HomeController@index');
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
	]);
