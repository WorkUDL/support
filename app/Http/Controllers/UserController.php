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
        $groups_id = $groups->map(function ($group){
            return $group->group_id;
        });


        $managers_id = $groups->map(function ($group){
            return GroupUser::where('group_id', $group->group_id)->pluck('user_id')->filter(function($user_id) {
                    return $user_id != Auth::id();
                });
        });

        $is_online_my_groups = collect($managers_id)->flatten()->map(function ($id){
            $user = User::find($id);
            return $user->online;
        });


        $id_online_managers_my_groups = collect($managers_id)->flatten()->map(function ($id){
            $user = User::find($id);
            return $user->id;
        });

            $percent_tickets = 100 / ($is_online_my_groups->count() + 1);

            $not_read_message = Ticket::where('active', 1)  // все нужные активные тикеты
            ->join('reasons', function ($join) use ($groups_id) {
                $join->on('tickets.reason_id', '=', 'reasons.id')
                    ->whereIn('reasons.group_id', $groups_id);
            })
                ->join('messages', function ($join) use ($id_online_managers_my_groups) {
                    $join->on('tickets.id', '=', 'messages.ticket_id')
                        ->whereNotIn('messages.user_id', $id_online_managers_my_groups);
                })
                ->pluck('ticket_id');

            $sum_active_tickets = Ticket::whereIn('tickets.id', $not_read_message) // вес всех нужных активных тикетов
            ->join('reasons', 'tickets.reason_id', 'reasons.id')
                ->sum('reasons.weight');

            $take_this_weight_tickets = $sum_active_tickets * ($percent_tickets / 100); // сумма веса, который нужно забрать

            $selected_tickets = collect();
            $selected_weight = 0;

            foreach ($not_read_message as $ticket_id){
                $tiket_weight = Ticket::where('tickets.id', $ticket_id)
                    ->join('reasons', 'tickets.reason_id', 'reasons.id')
                    ->value('weight');
                if($selected_weight + $tiket_weight <= $take_this_weight_tickets){
                    $selected_tickets->push($ticket_id);
                    $selected_weight += $tiket_weight;
                } else {
                    break;
                }
            }

            foreach ($selected_tickets as $ticket_id) {
                Ticket::where('id', $ticket_id)->update([
                    'manager_id' => Auth::user()->id
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
