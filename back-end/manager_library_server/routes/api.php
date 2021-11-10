<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::middleware('auth:api')->group(function () {
    Route::get('/infor',[App\Http\Controllers\Account\AccountAuthenticationController::class, 'getInfor'] );
});
Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    
    Route::post('/login', [App\Http\Controllers\Account\AccountAuthenticationController::class, 'doLogin']);
    Route::post('/register', [App\Http\Controllers\Account\AccountAuthenticationController::class, 'doRegisterAccount']);
});