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
Route::get('/cinema/{id}', 'CinemasController@show');
Route::get('/api/cinema/{id}', 'CinemasController@get');

// Movie Routing
Route::get('/movies', 'MoviesController@index');
Route::get('/api/movies', 'MoviesController@all');

// Show movie details
Route::get('/movie/{title}', 'MoviesController@show');
Route::get('/api/movie/{title}', 'MoviesController@get');

// Admin Routing
Route::get('/admin', function(){
	return view('admin');
});

Route::get('home', 'HomeController@index');
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
	]);
