<?php

namespace App\Http\Controllers;

use App\Models\TableFilter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TableFilterController extends Controller
{
    public function add_filters (Request $request)
    {
        TableFilter::create([
            'user_id' => Auth::user()->id,
            'filters' => $request->filters
        ]);
    }

    public function get_filters (Request $request)
    {
        return TableFilter::where('user_id', $request->userId)->latest()->value('filters');
    }
}
