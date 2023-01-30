<?php

namespace App\Http\Controllers;

use App\Models\TemplateResponse;
use App\Models\Ticket;
use Illuminate\Http\Request;

class TemplateResponseController extends Controller
{
    public function add(Request $request)
    {
        TemplateResponse::query()->create([
            'reason_id' => $request->reason_id,
            'template_response' => $request->template_response
        ]);
    }

    public function get_inside_ticket_massage(Request $request)
    {
        $ticket = Ticket::find($request->ticket_id);
        return TemplateResponse::query()->where('reason_id', $ticket->reason_id)->get();
    }

    public function get(Request $request)
    {
        return TemplateResponse::where('reason_id', $request->reason_id)->pluck('template_response');
    }

    public function delete(Request $request)
    {
        TemplateResponse::where('template_response', $request->data)->delete();
    }
}
