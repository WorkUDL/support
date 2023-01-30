<?php

namespace App\Http\Controllers;

use App\Models\Coupon;
use App\Models\GroupUser;
use App\Models\History;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;

class CouponController extends Controller
{
    public function userList()
    {
        $users = User::all();

        PartnerController::bxConnect(1);
        return collect(CRest::firstBatch('user.get', [
            'FILTER' => [
                'ACTIVE' => 'Y'
            ]
        ], true))->map(function($user) use ($users) {
            $is_manager = $users->where('bitrix_id', $user['ID']);

            return array_merge([
                'id' => $user['ID'],
                'user_id' => $is_manager->count() ? $is_manager->first()->id : 0,
                'name' => $user['LAST_NAME'].' '.$user['NAME'].' '.$user['SECOND_NAME'],
                'photo' => $user['PERSONAL_PHOTO'],
                'work_position' => $user['WORK_POSITION'],
                'is_manager' => $is_manager->count() ? $is_manager->first()->is_manager : 0
            ], $user);
        });
    }

    public function userSet(Request $request)
    {
        $user = User::where('bitrix_id', $request->id)->first();

        if(is_null($user)){
            PartnerController::bxConnect(1);

            $userBX = CRest::call('user.get', [
                'ID' => $request->id
            ]);

            $user = PartnerController::checkUserExists((object)$userBX['result'][0]);
        }

        $user->update([
            'is_manager' => $request->is_manager
        ]);

        if($request->is_manager == 0){
            GroupUser::where('user_id', $request->id)->delete();
        }

        return $user;
    }

    public function transfer(Request $request)
    {
        $coupon = Coupon::find($request->id);

        if(is_null($coupon)){
            return response([
                'error' => 'Купон не найден'
            ], 400);
        }

        if(Auth::id() !== $coupon->user_id and !Auth::user()->is_manager){
            return response([
                'error' => 'Купон не ваш'
            ], 400);
        }

        $user = User::where('bitrix_id', $request->user)->first();
        if(is_null($user)){
            PartnerController::bxConnect(1);

            $userBX = CRest::call('user.get', [
                'ID' => $request->user
            ]);

            $user = PartnerController::checkUserExists((object)$userBX['result'][0]);
        }

        $coupon->user_id = $user->id;
        $coupon->save();

        if($coupon->active == 1 and $coupon->expiration_date >= date('Y-m-d')){
            $status = 'Активный';
        }elseif($coupon->active == 1 and $coupon->expiration_date < date('Y-m-d')){
            $status = 'Просрочен';
        }else{
            $status = 'Потрачен';
        }

        Http::post('https://xn--d1ao9c.xn--p1ai/rest/10033/n2wsemk4cijkw3ev/im.message.add', [
            'DIALOG_ID' => $user->bitrix_id,
            'MESSAGE' => 'Вам передан купон[br][br][b]Код:[/b] '.$coupon->code.'[br][b]Вес:[/b] '.$coupon->weight.'[br][b]Статус:[/b] '.$status.'[br][b]Годен до:[/b] '.date('d.m.Y', strtotime($coupon->expiration_date)),
        ]);

        History::create([
            'user_id' => Auth::id(),
            'activity_id' => 9,
            'coupon_id' => $coupon->id
        ]);
    }

    public function add(Request $request)
    {
        $user = User::where('bitrix_id', $request->user)->first();
        if(is_null($user)){
            PartnerController::bxConnect(1);

            $userBX = CRest::call('user.get', [
                'ID' => $request->user
            ]);

            $user = PartnerController::checkUserExists((object)$userBX['result'][0]);
        }

        $coupon = Coupon::create([
            'user_id' => $user->id,
            'code' => Str::random(10),
            'weight' => $request->weight,
            'active' => 1,
            'expiration_date' => $request->expiration_date
        ]);

        History::create([
            'user_id' => Auth::id(),
            'activity_id' => 7,
            'comment' => $coupon->id
        ]);

        Http::post('https://xn--d1ao9c.xn--p1ai/rest/10033/n2wsemk4cijkw3ev/im.message.add', [
            'DIALOG_ID' => $request->user,
            'MESSAGE' => 'Вам предоставлен новый купон[br][br][b]Код:[/b] '.$coupon->code.'[br][b]Вес:[/b] '.$coupon->weight.'[br][b]Годен до:[/b] '.date('d.m.Y', strtotime($coupon->expiration_date)),
        ]);

        return [
            'id' => $coupon->id,
            'user_id' => $coupon->user_id,
            'code' => $coupon->code,
            'weight' => $coupon->weight,
            'active' => $coupon->active,
            'expiration_date' => is_null($coupon->expiration_date)
                ? $coupon->expiration_date
                : strtotime($coupon->expiration_date),
            'created_at' => is_null($coupon->created_at)
                ? $coupon->created_at
                : $coupon->created_at->getTimestamp()
        ];
    }

    public function list()
    {
        return Coupon::all()->filter(function($item){
            return (Auth::user()->is_manager == 0 and $item->user_id == Auth::id()) or Auth::user()->is_manager == 1;
        })->map(function($item){
            if($item->active == 1 and $item->expiration_date >= date('Y-m-d')){
                $status = 1;    // Активный, не просрочен
            }elseif($item->active == 1 and $item->expiration_date < date('Y-m-d')){
                $status = 2;    // Активный, просрочен
            }else{
                $status = 3;    // Потрачен
            }

            return [
                'id' => $item->id,
                'user_id' => $item->user_id,
                'code' => $item->code,
                'weight' => $item->weight,
                'status' => $status,
                'expiration_date' => is_null($item->expiration_date)
                    ? $item->expiration_date
                    : strtotime($item->expiration_date),
                'created_at' => is_null($item->created_at)
                    ? $item->created_at
                    : $item->created_at->getTimestamp()
            ];
        })->values();
    }

    public function apply(Request $request)
    {
        $coupon = Coupon::where('code', $request->code)->first();

        if(is_null($coupon)){
            History::create([
                'user_id' => Auth::id(),
                'ticket_id' => $request->ticket_id,
                'activity_id' => 2,
                'comment' => $request->code
            ]);

            return response([
                'error' => 'Купон не найден'
            ], 403);
        }

        if($coupon->active == 0){
            History::create([
                'user_id' => Auth::id(),
                'ticket_id' => $request->ticket_id,
                'coupon_id' => $coupon->id,
                'activity_id' => 3
            ]);

            return response([
                'error' => 'Купон уже использован'
            ], 403);
        }

        if($coupon->expiration_date < date('Y-m-d')){
            History::create([
                'user_id' => Auth::id(),
                'ticket_id' => $request->ticket_id,
                'coupon_id' => $coupon->id,
                'activity_id' => 4
            ]);

            return response([
                'error' => 'Купон просрочен'
            ], 403);
        }

        History::create([
            'user_id' => Auth::id(),
            'ticket_id' => $request->ticket_id,
            'coupon_id' => $coupon->id,
            'activity_id' => 1
        ]);

        Ticket::find($request->ticket_id)->update([
            'coupon_id' => $coupon->id
        ]);

        $coupon->active = 0;
        $coupon->save();
    }
}
