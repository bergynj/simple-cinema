<?php namespace App\Http\Controllers;

// get Movies Model
use App\Movies;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class MoviesController extends Controller {

	/**
	 * Display page listing of Movies.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
        $movies = Movies::all();

        return view('movies', compact('movies'));
	}

	/**
	 * List JSON listing of all Movies.
	 *
	 * @return Response
	 */
    public function all()
	{
		//
        $movies = Movies::all();

        return response()->json(['data' => $movies], 200);
	}

    /**
	 * Display Movie page by the specified title
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($title)
	{
		//
        $movie = Movies::where('title', $title)->firstOrFail();

        return view('movies', compact('movie'));
	}

    /**
	 * Get a JSON Movie instance by the specified title
	 *
	 * @return Response
	 */
	public function get($title)
	{
		//
        $movie = Movies::where('title', $title)->first();

        if (!$movie)
        {
            return response()->json(['message' => 'Could not find movie with this title', 'code' => 404], 404);
        }

        return response()->json(['data' => $movie], 200);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create()
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
	}

}
