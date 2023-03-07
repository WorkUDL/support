<?php

namespace App\Http\Controllers;

use App\Models\Participant;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ParticipantController extends Controller
{
    public function list(Request $request)
    {
        $managers = User::where('is_manager', 1)->get();
        $ticket = Ticket::find($request->ticket_id);

        return Participant::where('ticket_id', $request->ticket_id)->get()->map(function($item) use ($managers, $ticket) {
            $status = 0;    // Прочие участники

            if($managers->find($item->user_id))         $status = 3;    // Прочие менеджеры
            if($ticket->user_id == $item->user_id)      $status = 1;    // Ответственный сотрудник
            if($ticket->manager_id == $item->user_id)   $status = 2;    // Ответственный менеджер

            return [
                'user_id' => $item->user_id,
                'status' => $status,
            ];
        });
    }

    public function add(Request $request)
    {
        foreach ($request->users as $user) {
            Participant::firstOrCreate([
                'ticket_id' => $request->ticket_id,
                'user_id' => PartnerController::checkUserExists((object)$user)->id
            ]);

        }
        Http::post(CRest::WEBHOOK.'/im.message.add', [
            'DIALOG_ID' => $request->users[0]['id'],
            'MESSAGE' => 'Вас добавили в тикет: [URL=/marketplace/view/120/?params[ticket_id]='.$request->ticket_id.']#'.$request->ticket_id.'[/URL]'
        ]);
    }
}
