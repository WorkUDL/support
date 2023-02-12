<?php

namespace App\Http\Controllers;

use App\Models\GroupUser;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class UserController extends Controller
{
    public function is_online(Request $request)
    {
        Auth::user()->online = $request->status;
        Auth::user()->save();
        $request->manager_id = Auth::user()->id;

        if ($request->status == 1) {

            $groups = GroupUser::where('user_id', $request->manager_id)->get();

            if ($groups->count() == 0) {
                return 'Коллекция $groups пуста';
            }

            $groups_id = $groups->map(function ($group){
                return $group->group_id;
            });

            //id других менеджеров из своих групп
            $managers_id = $groups->map(function ($group){
                return GroupUser::where('group_id', $group->group_id)->pluck('user_id')->filter(function($user_id) {
                        return $user_id != Auth::id();
                    });
            });

            if ($managers_id->count() == 0) {
                return 'Коллекция $managers_id пуста';
            }

            //id других менеджеров из своих групп, которые сейчас онлайн
            $id_online_managers_my_groups = collect($managers_id)->flatten()->map(function ($id){
                $user = User::find($id);
                if($user->online == 1) {
                    return $user->id;
                }
            })->filter();

            // все нужные активные тикеты (уже отсортированы)
            $not_read_message = Ticket::where('active', 1)
                ->leftJoin('reasons', 'tickets.reason_id', '=', 'reasons.id')
                ->leftJoin('messages', 'tickets.id', '=', 'messages.ticket_id')
                ->whereIn('reasons.group_id', $groups_id)
                ->whereNotIn('messages.user_id', $id_online_managers_my_groups)
                ->orderBy('reasons.weight', 'desc')
                ->pluck('tickets.id');

            if ($not_read_message->count() == 0) {
                return 'Коллекция $not_read_message пуста';
            }

            for ($i = 0; $i < $not_read_message->count(); $i += $id_online_managers_my_groups->count() + 1) {
                Ticket::where('id', $not_read_message[$i])->update([
                    'manager_id' => $request->manager_id
                ]);
            }

            return 'success';
        }
    }

    public function data(Request $request)
    {
        $ticket = Ticket::find($request->id);
        return User::where('id', $ticket->user_id)->value('bitrix_id');
    }

    public function all_managers()
    {
        return User::where('is_manager', 1)->get();
    }

    public function transfer_manager(Request $request)
    {
        $giving_manager = User::where('id', $request->user_id)->first();
        $host_manager = User::where('last_name', $request->manager)->first();
        $ticket = $request->ticket;

        Ticket::find($ticket['id'])->update([
            'manager_id' => $host_manager->id
        ]);

        return Http::post(CRest::WEBHOOK.'/im.message.add', [
                'DIALOG_ID' => $host_manager->bitrix_id,
                'MESSAGE' => $giving_manager->name.' '.$giving_manager->last_name. ' передал Вам тикет [URL=/marketplace/view/120/?params[ticket_id]='.$ticket['id'].']#'.$ticket['id'].'[/URL]'
            ]);

    }

    public function transfer_manager_inside_dialog(Request $request)
    {
        $giving_manager = User::where('id', $request->user_id)->first();
        $host_manager = User::where('last_name', $request->manager)->first();
        $ticket = $request->ticket;


        Ticket::find($ticket['ticket_id'])->update([
            'manager_id' => $host_manager->id
        ]);

        return Http::post(CRest::WEBHOOK.'/im.message.add', [
            'DIALOG_ID' => $host_manager->bitrix_id,
            'MESSAGE' => $giving_manager->name.' '.$giving_manager->last_name. ' передал Вам тикет [URL=/marketplace/view/120/?params[ticket_id]='.$ticket['ticket_id'].']#'.$ticket['ticket_id'].'[/URL]'
        ]);

    }
}
