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
Route::get('/cinema', 'CinemaController@index');
Route::get('/cinema/{id}', 'CinemaController@show');

Route::get('/api/cinemas', 'CinemaController@all');
Route::get('/api/cinema/{id}', 'CinemaController@get');

// Movie Routing
Route::get('/movies', 'MovieController@index');
Route::get('/movie/{title}', 'MovieController@show');

Route::get('/api/movies', 'MovieController@all');
Route::get('/api/movie/{title}', 'MovieController@get');

// Admin Routing
Route::get('admin', function(){
	return view('add');
});

Route::get('home', 'HomeController@index');
Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
	]);
