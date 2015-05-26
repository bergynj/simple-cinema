<?php namespace App;

use Illuminate\Database\Eloquent\Model;

class Cinemas extends Model {

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'cinemas';

	/**
	 * The attributes that are mass assignable.
	 *
	 * @var array
	 */
	protected $fillable = ['name','address', 'geo'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['created_at', 'updated_at'];

	/**
	 * The movie showing in this cinema
	 * Movies lookup through Msessions table
	 *
	 * @param
	 * @return \Illuminate\Database\Eloquent\Relations\hasManyThrough
	 */
	public function movies()
	{
	   return $this->hasManyThrough('App\Movies', 'App\Msessions');
	}

}
