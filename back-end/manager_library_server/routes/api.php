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
    Route::post('/changePassword', [App\Http\Controllers\Account\AccountAuthenticationController::class, 'doChangePassword']);
    Route::get('/infor', [App\Http\Controllers\Account\AccountAuthenticationController::class, 'doGetInfor']);
    Route::get('/findAccount', [App\Http\Controllers\Account\AccountAuthenticationController::class, 'doFindAccount']);
    Route::post('/addAccount',[App\Http\Controllers\Account\AccountAuthenticationController::class, 'doAddAccount']);
    Route::get('/getRoleForAccount', [App\Http\Controllers\Account\AccountAuthenticationController::class,'doGetRoleForAccount']);
    Route::get('/getAllAccount', [App\Http\Controllers\Account\AccountAuthenticationController::class,'doGetAllAccount']);
    Route::post('/updateAccount', [App\Http\Controllers\Account\AccountAuthenticationController::class, 'doUpdateAccount']);
    Route::post('/deleteAccount', [App\Http\Controllers\Account\AccountAuthenticationController::class, 'doDeleteAccount']);
});


Route::group([
    'middleware' => 'api',
    'prefix' => 'category'

], function ($router) {

    Route::post('/AddCategory', [App\Http\Controllers\Category\CategoryController::class, 'doAddcategory']);
    Route::get('/GetCategory', [App\Http\Controllers\Category\CategoryController::class, 'doGetAllCategory']);
    Route::post('/DeleteCategory', [App\Http\Controllers\Category\CategoryController::class, 'doDeleteCategory']);
    Route::post('/UpdateCategory', [App\Http\Controllers\Category\CategoryController::class, 'doUpdateCategory']);

});

Route::group([
    'middleware' => 'api',
    'prefix' => 'book'

], function ($router) {

    Route::post('/AddBook', [App\Http\Controllers\Book\BookController::class, 'doAddBook']);
    Route::get('/getAllBook', [App\Http\Controllers\Book\BookController::class, 'doGetAllBook']);
    Route::post('/GetInforBook', [App\Http\Controllers\Book\BookController::class, 'doGetInforBook']);
    Route::post('/UpdateBook', [App\Http\Controllers\Book\BookController::class, 'doUpdateBook']);
    Route::post('/DeleteBook', [App\Http\Controllers\Book\BookController::class, 'doDeleteBook']);
    Route::post('/findBook', [App\Http\Controllers\Book\BookController::class, 'doFindBook']);
});
