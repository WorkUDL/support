<?php

namespace App\Http\Controllers;

use App\Models\ImageHint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ImageHintController extends Controller
{
    public function add_image(Request $request)
    {

        foreach ($request['images'] as $image) {

            $path = Storage::disk('public')->put('/images_in_hint', $image);

            ImageHint::create([
                'image_path' => url('/storage/'. $path),
                'hint_id' => $request->hint_id
            ]);
        }
        return 'success';
    }

    public function get_image(Request $request)
    {
       return ImageHint::where('hint_id', $request->hint_id)->get();
    }

    public function delete_image(Request $request)
    {
        ImageHint::where('image_path', $request->image_path)->delete();
    }
}
