<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupUser;
use App\Models\History;
use App\Models\Manager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function add(Request $request)
    {
        $group = Group::create([
            'name' => $request->name
        ]);

        History::create([
            'user_id' => Auth::id(),
            'activity_id' => 5,
            'comment' => $group->id
        ]);

        foreach($request->managers as $manager){
            Manager::create([
                'user_id' => PartnerController::checkUserExists((object)[
                    'ID' => $manager['ID'],
                    'LAST_NAME' => $manager['LAST_NAME'],
                    'NAME' => $manager['NAME'],
                    'SECOND_NAME' => $manager['SECOND_NAME'],
                    'PERSONAL_PHOTO' => $manager['PERSONAL_PHOTO'],
                ])->id,
                'group_id' => $group->id
            ]);
        }

        return $group;
    }

    public function update(Request $request)
    {
        Group::find($request->id)->update([
            'name' => $request->name
        ]);

        History::create([
            'user_id' => Auth::id(),
            'activity_id' => 8,
            'comment' => $request->id
        ]);

        $manager_ids = collect($request->managers)->map(function($item){
            return $item['ID'] ?? $item['id'];
        })->toArray();

        GroupUser::where('group_id', $request->id)->get()->each(function($manager) use ($manager_ids) {
            if(!in_array($manager->user->bitrix_id, $manager_ids)){
                $manager->delete();
            }
        });

        foreach($request->managers as $manager){
            GroupUser::firstOrCreate([
                'user_id' => PartnerController::checkUserExists((object)[
                    'ID' => $manager['ID'],
                    'LAST_NAME' => $manager['LAST_NAME'],
                    'NAME' => $manager['NAME'],
                    'SECOND_NAME' => $manager['SECOND_NAME'],
                    'PERSONAL_PHOTO' => $manager['PERSONAL_PHOTO'],
                ])->id,
                'group_id' => $request->id
            ]);
        };
    }

    public function list()
    {
        return Group::all();
    }

    public function managers(Request $request)
    {
        return Group::find($request->id)->users;
    }

    public function delete(Request $request)
    {
        return Group::find($request->id)->delete();
    }
}
