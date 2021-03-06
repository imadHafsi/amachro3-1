<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Theme extends Model
{
    //
    protected $fillable=['user_id',
				'primary',
				'secondary',
				'accent',
				'error',
				'info',
				'success',
				'warning'];
}
