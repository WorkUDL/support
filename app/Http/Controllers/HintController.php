<?php

namespace App\Http\Controllers;

use App\Models\Hint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class HintController extends Controller
{
    public function get()
    {
        return Hint::all();
    }

    public function add(Request $request)
    {
        return Hint::create([
            'user_id' => Auth::id(),
            'full' => $request->full,
            'short' => $request->short,
            'iframe' => $request->iframeHint,
            'reason_id' => $request->reason_id,
        ]);
    }

}
