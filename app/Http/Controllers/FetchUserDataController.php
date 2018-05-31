<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Auth;

class FetchUserDataController extends Controller
{
   public function info()
    {
    	$user=Auth::user();
              Auth::user()->roles;
              
        $user=$user->only([
            'name',
            'email',
            'last_name',
            'first_name',
            'permissions',
            'roles'
        ]);

        return response()->json([
            'user'=>$user
        ]);
    }

    public function theme()
    {
    	$user=Auth::user();

        return response()->json([
            'theme'=>$user->theme->only([
	            'primary',
	            'secondary',
	            'accent',
	            'error',
	            'info',
	            'success',
	            'warning'
	      	  ])
        	]);
    }
}
