<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Sentinel;
class TestController extends Controller
{
    //
   
   public function test(Request $request){

   		$user=JWTAuth::parseToken()->authenticate();
   		
   		$role = Sentinel::findRoleByName('Subscribers');

		//$role->users()->attach($user);

   		return $user->roles;
   }
}