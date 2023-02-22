<?php

namespace App\Http\Controllers;

use App\Models\TicketFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TicketFilterController extends Controller
{
    public function add_ticket_filters (Request $request)
    {
        TicketFilter::create([
            'user_id' => Auth::user()->id,
            'filters' => $request->filter
        ]);
    }
    public function get_ticket_filters (Request $request)
    {
        return TicketFilter::where('user_id', $request->userId)->latest()->value('filters');
    }
}
