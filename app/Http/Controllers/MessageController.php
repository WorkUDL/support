<?php

namespace App\Http\Controllers;

use App\Models\FileMessage;
use App\Models\Message;
use App\Models\MessageRead;
use App\Models\Participant;
use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class MessageController extends Controller
{
    public function get(Request $request)
    {
        if(Ticket::query()->find($request->ticket_id)){
            $messages = Message::where('ticket_id', $request->ticket_id)->get();
            $users = User::query()->whereIn('id', $messages->pluck('user_id'))->get();

            return  $messages->map(function ($message) use ($users) {
                return $this->getReturnMessage($message, $users);
            });
        }

        return response([
            'error' => 'Тикет не найден'
        ], 403);

    }

    public function add(Request $request)
    {
        if ($request->file) {
            $file_body = $request->file('file');
            $file_path = Storage::disk('public')->put('/files', $file_body);

            $file = FileMessage::create([
                'user_id' => Auth::id(),
                'ticket_id' => $request->ticket_id,
                'path' => url('/storage/'. $file_path)
            ]);

            $message = Message::create([
                'user_id' => Auth::id(),
                'ticket_id' => $request->ticket_id,
                'file_id' => $file->id,
                'message' => url('/storage/'. $file_path)
            ]);
        } else {
            $message = Message::query()->create([
                'user_id' => Auth::id(),
                'ticket_id' => $request->ticket_id,
                'message' => $request->message
            ]);
        }

        Participant::query()->firstOrCreate([
            'ticket_id' => $request->ticket_id,
            'user_id' => Auth::id()
        ]);

        $participants = Participant::query()
            ->where('ticket_id', $request->ticket_id)
            ->where('user_id', '!=', Auth::id())
            ->get();

        foreach($participants as $item){
            Http::post(CRest::WEBHOOK.'/im.message.add', [
                'DIALOG_ID' => User::query()->find($item->user_id)->bitrix_id,
                'MESSAGE' => 'Новое сообщение в тикете: [URL=/marketplace/view/120/?params[ticket_id]='.$item->ticket_id.']#'.$item->ticket_id.'[/URL]'
            ]);
        }

        return Http::post('https://sms19.ru:1002/newMessage', [
            'message' => $this->getReturnMessage($message, User::query()->where('id', Auth::id())->get()),
            'ticket_id' => $request->ticket_id,
            'token' => '179adbcacd405c20d30e74563cfc4c27'
        ])->json();
    }
    private function getReturnMessage($message, $users): array
    {
        return [
            'id' => $message->id,
            'user_id' => $message->user_id,
            'bitrix_id' => $users->find($message->user_id)->bitrix_id,
            'last_name' => $users->find($message->user_id)->last_name,
            'name' => $users->find($message->user_id)->name,
            'second_name' => $users->find($message->user_id)->second_name,
            'photo' => $users->find($message->user_id)->photo,
            'message' => $message->message,
            'date' => $message->created_at->timestamp * 1000,
        ];
    }

}
