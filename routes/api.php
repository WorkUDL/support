<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [\App\Http\Controllers\PartnerController::class, 'login']);

//////////////////////////////////////////////////////////////////////////

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'ticket'
], function ($router) {
    Route::post('/list', [\App\Http\Controllers\TicketController::class, 'list']);
    Route::post('/get', [\App\Http\Controllers\TicketController::class, 'get']);
    Route::post('/add', [\App\Http\Controllers\TicketController::class, 'add']);
    Route::post('/archive', [\App\Http\Controllers\TicketController::class, 'archive']);

});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'reason'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\ReasonController::class, 'get']);
    Route::post('/add', [\App\Http\Controllers\ReasonController::class, 'add']);
    Route::post('/information', [\App\Http\Controllers\ReasonController::class, 'information']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'template_response'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\TemplateResponseController::class, 'get']);
    Route::post('/add', [\App\Http\Controllers\TemplateResponseController::class, 'add']);
    Route::post('/delete', [\App\Http\Controllers\TemplateResponseController::class, 'delete']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'group'
], function ($router) {
    Route::post('/add', [\App\Http\Controllers\GroupController::class, 'add']);
    Route::post('/list', [\App\Http\Controllers\GroupController::class, 'list']);
    Route::post('/update', [\App\Http\Controllers\GroupController::class, 'update']);
    Route::post('/delete', [\App\Http\Controllers\GroupController::class, 'delete']);
    Route::post('/managers', [\App\Http\Controllers\GroupController::class, 'managers']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'hint'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\HintController::class, 'get']);
    Route::post('/add', [\App\Http\Controllers\HintController::class, 'add']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'message'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\MessageController::class, 'get']);
    Route::post('/add', [\App\Http\Controllers\MessageController::class, 'add']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'file'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\FileController::class, 'get']);
    Route::post('/add', [\App\Http\Controllers\FileController::class, 'add']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'message_read'
], function ($router) {
    Route::post('/read', [\App\Http\Controllers\MessageReadController::class, 'read']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'coupon'
], function ($router) {
    Route::post('/add', [\App\Http\Controllers\CouponController::class, 'add']);
    Route::post('/list', [\App\Http\Controllers\CouponController::class, 'list']);
    Route::post('/apply', [\App\Http\Controllers\CouponController::class, 'apply']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'user'
], function ($router) {
    Route::post('/list', [\App\Http\Controllers\CouponController::class, 'userList']);
    Route::post('/set', [\App\Http\Controllers\CouponController::class, 'userSet']);
    Route::post('/is_online', [\App\Http\Controllers\UserController::class, 'is_online']);
    Route::post('/take_tickets', [\App\Http\Controllers\UserController::class, 'take_tickets']);
    Route::post('/data', [\App\Http\Controllers\UserController::class, 'data']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'information'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\InformationController::class, 'get']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'participant'
], function ($router) {
    Route::post('/list', [\App\Http\Controllers\ParticipantController::class, 'list']);
});
