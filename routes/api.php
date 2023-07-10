<?php

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Mod;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::get('/user', function (Request $request) {
    return [$request->user(), decrypt($request->cookie('ait'))];
})->middleware('auth:sanctum');

Route::post('clear-auth-cookie', function () {
    return response('Cookies deleted')
        ->cookie('ait', null, -1)
        ->cookie('jwt', null, -1);
});

Route::namespace('App\Http\Controllers')->group(function () {

    Route::namespace('Auth')->group(function () {
        Route::post('/register', 'RegisterController');
        Route::post('/login', 'LoginController');
        Route::post('/logout', 'LogoutController')->middleware('auth:sanctum');
    });

});

Route::get('shop/goods-mods', function () {
    return Mod::orderBy('title', 'asc')->pluck('title');
});

Route::get('/shop/products', \App\Http\Controllers\Shop\ShopController::class);

Route::get('/test', function (Request $request) {
    return $request->all();
});
