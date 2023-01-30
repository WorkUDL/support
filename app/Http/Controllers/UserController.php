<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupUser;
use App\Models\Ticket;
use App\Models\Reason;
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
        dump($request->status);
        if ($request->status == 1) {
            $ticket_ids = $this->take_tickets($request);
            Ticket::whereIn('id', $ticket_ids)
                ->where('manager_id', 4)
                ->update([
                    'manager_id' => Auth::user()->id
                ]);
        }
    }

    public function take_tickets(Request $request)
    {
        $groups = GroupUser::where('user_id', $request->manager_id)->get(); //array
        $groups_id = $groups->map(function ($group) {
            return $group->group_id;
        });

        $results_tickets = Ticket::whereHas('reason', function ($query) use ($groups_id) {
            $query->whereIn('group_id', $groups_id)->where('manager_id', 4);
        })->where('active', 1)->with(['reason' => function ($query) {
            $query->select('id', 'weight');
        }])->get()->sortByDesc(function ($ticket) {
            return $ticket->reason->weight;
        });
        $top_five_tickets = $results_tickets->take(5);
        $id_five_tickets = $top_five_tickets->map(function ($el) {
            return $el->id;
        });
        return $id_five_tickets;
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
}
