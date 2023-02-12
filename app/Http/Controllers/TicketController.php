<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\Message;
use App\Models\MessageRead;
use App\Models\Participant;
use App\Models\Reason;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class TicketController extends Controller
{
    protected $managers;

    public function archive(Request $request)
    {
        Ticket::query()->find($request->id)->update([
            'active' => 0
        ]);
    }

    public function get(Request $request)
    {
        return Ticket::query()->find($request->id);
    }

    public function list(Request $request)
    {
        $users = User::query()->where('is_manager', 1)->get()->each(function($user) {
            $user->ticketList = $user->tickets->map(function($ticket) {
                $ticket->weight = $ticket->reason->weight + ($ticket->coupon->weight ?? 0);
                return $ticket;
            })->sortByDesc('weight')->values();

            return $user;
        });

        PartnerController::bxConnect(1);

        $departments = CRest::call('department.get', [
            'UF_HEAD' => Auth::user()->bitrix_id
        ]);

        $ticketUsers = [Auth::id()];

        if($departments['total'] > 0){
            $usersBX = CRest::call('user.get', [
                'FILTER' => [
                    'UF_DEPARTMENT' => collect($departments['result'])->pluck('ID')->toArray(),
                    'ACTIVE' => 1
                ]
            ]);

            $ticketUsers = User::query()->whereIn('bitrix_id', collect($usersBX['result'])->pluck('ID'))
                ->get()->pluck('id')->toArray();
        }

        return Ticket::query()->where('active', $request->active ?? 1)->get()->filter(function($ticket) use ($ticketUsers) {
            return (Auth::user()->is_manager and $ticket->manager_id == Auth::id())
                or in_array($ticket->user_id, $ticketUsers);
        })->map(function ($item) use ($users) {
            $unread = $this->checkStatus($item->id, Auth::id());

            return [
                'id' => $item->id,
                'user' => $item->user,
                'coupon' => $item->coupon_id,
                'name' => Reason::query()->find($item->reason_id)->name,
                'status' => $unread > 0,
                'queue' => $this->getQueue($item, $users),
                'weight' => $item->weight,
                'unread' => $unread,
                'created_at' => $item->created_at->getTimestamp(),
            ];
        })->values();
    }

    private function getQueue($item, $users)
    {
        if($users->find($item->manager_id) and $users->find($item->manager_id)->ticketList){
            $queue = $users->find($item->manager_id)->ticketList->filter(function ($ticket) use ($users) {
                //return $users->where('id', $ticket->messages->sortByDesc('id')->first()->user_id)->count() == 0;
                $messages = $ticket->messages->sortByDesc('id')->first();

                return is_null($messages) or $users->where('id', $messages->user_id)->count() == 0;
            })->values()->filter(function($ticket) use ($item) {
                return $ticket->id == $item->id;
            });

            return $queue->count() ? $queue->keys()->first() + 1 : null;
        }

        return null;
    }

    private function checkStatus($ticket_id, $user_id): int
    {
        $read = MessageRead::query()->where('user_id', $user_id)->where('ticket_id', $ticket_id)->first();

        return is_null($read) ? Message::query()->where('ticket_id', $ticket_id)->count()
            : Message::query()->where('ticket_id', $ticket_id)->where('id', '>', $read->message_id)->count();
    }

    public function add(Request $request)
    {

        $reason = Reason::query()->find($request->reason_id);

        if(is_null($reason)){
            return response([
                'error' => 'Проблема не найдена'
            ], 400);
        }

        $group = Group::query()->find($reason->group_id);

        if(is_null($group)){
            return response([
                'error' => 'Группа не найдена'
            ], 400);
        }

        if($group->users->count() == 0){
            return response([
                'error' => 'Для данной проблемы нет ответственных'
            ], 400);
        }

        if($request->data) {
            $manager = User::where('bitrix_id', $request->data['manager'])->first();
            return $this->create($manager, $request);
        }

        if(Ticket::query()->whereIn('manager_id', $group->users->pluck('id'))->where('active', 1)->count() == 0) {
            return $this->create($group->users->random(), $request);
        }

        if(!empty($request->token) && $request->token == '78a37c16edcc13f5c0179ce54f52d5f2'){
            return $this->create_using_token($group->users->each(function ($manager) {
                $manager->weight = $manager->tickets->map(function($ticket) {
                    $reason = $ticket->reason;
                    $coupon = $ticket->coupon;

                    $ticket->weight = $reason->weight + ($coupon ? $coupon->weight : 0);
                    return $ticket;
                })->sum('weight');
            })->sortBy('weight')->values()->first(), $request);
        }

        return $this->create($group->users->each(function ($manager) {
            $manager->weight = $manager->tickets->map(function($ticket) {
                $reason = $ticket->reason;
                $coupon = $ticket->coupon;

                $ticket->weight = $reason->weight + ($coupon ? $coupon->weight : 0);
                return $ticket;
            })->sum('weight');
            $manager->bitrix_id = 2332;
        })->sortBy('weight')->values()->first(), $request);
    }

    private function create($manager, $request): bool
    {

        if($manager->online === 1) {
            $ticket = Ticket::query()->create([
                'user_id' => Auth::id(),
                'manager_id' => $manager->id,
                'reason_id' => $request->reason_id,
                'active' => 1
            ]);

            Http::post(CRest::WEBHOOK.'/im.message.add', [
                'DIALOG_ID' => $manager->bitrix_id,
                'MESSAGE' => 'Новый тикет: [URL=/marketplace/view/120/?params[ticket_id]='.$ticket->id.']#'.$ticket->id.'[/URL]'
            ]);
        } else {
            $ticket = Ticket::query()->create([
                'user_id' => Auth::id(),
                'manager_id' => 4,
                'reason_id' => $request->reason_id,
                'active' => 1
            ]);
        }

        Participant::query()->create([
            'ticket_id' => $ticket->id,
            'user_id' => Auth::id(),
        ]);

        $message = Message::query()->create([
            'user_id' => Auth::id(),
            'ticket_id' => $ticket->id,
            'message' => $request->message
        ]);

        MessageRead::query()->create([
            'user_id' => Auth::id(),
            'ticket_id' => $ticket->id,
            'message_id' => $message->id
        ]);

        return true;
    }

    private function create_using_token($manager, $request): bool
    {
        $user_id = 701;
        $ticket = Ticket::query()->create([
            'user_id' => $user_id,
            'manager_id' => $manager->id,
            'reason_id' => $request->reason_id,
            'active' => 1
        ]);

        Participant::query()->create([
            'ticket_id' => $ticket->id,
            'user_id' => $user_id,
        ]);

        Participant::query()->create([
            'ticket_id' => $ticket->id,
            'user_id' => $manager->id,
        ]);

        $message = Message::query()->create([
            'user_id' => $user_id,
            'ticket_id' => $ticket->id,
            'message' => $request->message
        ]);

        MessageRead::query()->create([
            'user_id' => $user_id,
            'ticket_id' => $ticket->id,
            'message_id' => $message->id
        ]);

        Http::post(CRest::WEBHOOK.'/im.message.add', [
            'DIALOG_ID' => $manager->bitrix_id,
            'MESSAGE' => 'Новый тикет: [URL=/marketplace/view/120/?params[ticket_id]='.$ticket->id.']#'.$ticket->id.'[/URL]'
        ]);

        return true;
    }

}
