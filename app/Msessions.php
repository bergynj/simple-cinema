<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Msessions extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'msessions';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['session_time','cinema_id', 'movie_id'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];

	/**
	 * The cinema associated with this session time
	 *
	 * @param
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function cinemas()
	{
	   return $this->belongsToMany('App\Cinemas','cinema_msession')->withTimestamps();
	}

	/**
	 * The movie associated with this session time
	 *
	 * @param
	 * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
	 */
	public function movies()
	{
	   return $this->belongsToMany('App\Movies','movie_msession')->withTimestamps();
	}

}
