<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Movies extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'movies';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['title'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];

	/**
	 * Movie session times
	 * A movie can have many session time
	 *
	 * @param
	 * @foreign_key movie_id
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function sessions()
	{
	   return $this->hasMany('App\Msessions', 'movie_id');
	}

}
