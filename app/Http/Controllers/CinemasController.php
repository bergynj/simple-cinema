<?php namespace App\Http\Controllers;

// import Cinema Class
use App\Cinemas;

use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class CinemasController extends Controller {

	/**
	 * Display page listing of all Cinemas.
	 *
	 * @return Response
	 */
	public function index()
	{
		//
        $cinemas = Cinemas::all();

        return view('cinemas', compact('cinemas'));
	}

	/**
	 * List JSON listing of all Cinemas.
	 *
	 * @return Response
	 */
	public function all()
	{
		//
        $cinemas = Cinemas::all();

        // return response()->json(['data' => $cinemas], 200);
        return response()->json([$cinemas], 200);
	}

    /**
	 * Display Cinema page by the specified id
	 *
	 * @return Response
	 */
	public function show($id)
	{
		//
        $cinema = Cinemas::findOrFail($id);

        return view('cinemas', compact('cinema'));
	}

    /**
	 * Get a JSON Cinema instance by the specified id
	 *
	 * @return Response
	 */
	public function get($id)
	{
		//
        $cinema = Cinemas::find($id);

        if (!$cinema)
        {
           return response()->json(['message' => 'Could not find cinema specified', 'code' => 404], 404);
        }

        return response()->json(['data' => $cinema],200);
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
