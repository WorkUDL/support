<?php

namespace App\Http\Controllers;

use App\Models\MessageRead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageReadController extends Controller
{
    public function read(Request $request)
    {
        return MessageRead::updateOrCreate([
            'user_id' => Auth::id(),
            'ticket_id' => $request->ticket_id
        ],[
            'message_id' => $request->message_id
        ]);
    }
}
