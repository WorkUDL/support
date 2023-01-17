<?php

use App\Http\Controllers\MemberController;
use App\Http\Controllers\PartnerController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
    'middleware' => 'cba',
    'prefix' => 'de882a5907b86bcb151b4f726b19a3c0'
], function ($router) {
    Route::post('/', function () {
        return view('welcome');
    })->where('vue', '[\/\w\.-]*');

    Route::post('/tickets', function () {
        return view('welcome');
    })->where('vue', '[\/\w\.-]*');

    Route::post('/install', [PartnerController::class, 'install']);
});

Route::get('/{vue?}', function () {
    return view('welcome');
})->where('vue', '[\/\w\.-]*');

Auth::routes();
