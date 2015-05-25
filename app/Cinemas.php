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
	 * Cinema session times
	 * A cinema can have many session times
	 *
	 * @param
	 * @return \Illuminate\Database\Eloquent\Relations\HasMany
	 */
	public function csessions()
	{
	   return $this->hasMany('App\Msessions');
	}
}
