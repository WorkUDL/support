<?php

namespace App\Http\Controllers;

use App\Models\FileMessage;
use App\Models\Message;
use App\Models\Participant;
use App\Models\Ticket;
use App\Models\User;
use Faker\Core\File;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function get(Request $request)
    {
        if(Ticket::query()->find($request->ticket_id)){

            $files = FileMessage::where('ticket_id', $request->ticket_id)->get();
            $users = User::query()->whereIn('id', $files->pluck('user_id'))->get();

            return $files->map(function ($file) use ($users) {
                return $this->getReturnFile($file, $users);
            });
        }

        return response([
            'error' => 'Тикет не найден'
        ], 403);
    }
    private function getReturnFile($file, $users): array
    {
        return [
            'id' => $file->ticket_id,
            'user_id' => $file->user_id,
            'bitrix_id' => $users->find($file->user_id)->bitrix_id,
            'last_name' => $users->find($file->user_id)->last_name,
            'name' => $users->find($file->user_id)->name,
            'second_name' => $users->find($file->user_id)->second_name,
            'photo' => $users->find($file->user_id)->photo,
            'message' => $file->message,
            'path' => $file->path,
            'date' => $file->created_at->timestamp * 1000,
        ];
    }
}
