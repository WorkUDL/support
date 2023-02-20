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
    Route::post('/participants', [\App\Http\Controllers\TicketController::class, 'tickets_for_participants']);

});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'reason'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\ReasonController::class, 'get']);
    Route::post('/add', [\App\Http\Controllers\ReasonController::class, 'add']);
    Route::post('/information', [\App\Http\Controllers\ReasonController::class, 'information']);
    Route::post('/parent_id', [\App\Http\Controllers\ReasonController::class, 'get_parent_id']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'template_response'
], function ($router) {
    Route::post('/get_inside_ticket_massage', [\App\Http\Controllers\TemplateResponseController::class, 'get_inside_ticket_massage']);
    Route::post('/add', [\App\Http\Controllers\TemplateResponseController::class, 'add']);
    Route::post('/get', [\App\Http\Controllers\TemplateResponseController::class, 'get']);
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
    Route::post('/add_image', [\App\Http\Controllers\ImageHintController::class, 'add_image']);
    Route::post('/get_image', [\App\Http\Controllers\ImageHintController::class, 'get_image']);
    Route::post('/delete_image', [\App\Http\Controllers\ImageHintController::class, 'delete_image']);
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
    Route::post('/data', [\App\Http\Controllers\UserController::class, 'data']);
    Route::post('/all_managers', [\App\Http\Controllers\UserController::class, 'all_managers']);
    Route::post('/transfer_manager', [\App\Http\Controllers\UserController::class, 'transfer_manager']);
    Route::post('/transfer_manager_inside_dialog', [\App\Http\Controllers\UserController::class, 'transfer_manager_inside_dialog']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'information'
], function ($router) {
    Route::post('/get', [\App\Http\Controllers\InformationController::class, 'get']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'city'
], function ($router) {
    Route::post('/get_call_managers', [\App\Http\Controllers\TrainerController::class, 'get_call_managers']);
    Route::post('/get_bitrix_managers', [\App\Http\Controllers\TrainerController::class, 'get_bitrix_managers']);
});

Route::group([
    'middleware' => 'auth:sanctum',
    'prefix' => 'participant'
], function ($router) {
    Route::post('/list', [\App\Http\Controllers\ParticipantController::class, 'list']);
    Route::post('/add', [\App\Http\Controllers\ParticipantController::class, 'add']);
});
