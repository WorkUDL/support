<?php

namespace App\Http\Controllers;

use App\Models\History;
use App\Models\Reason;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReasonController extends Controller
{
    public function add(Request $request)
    {
        $reason = Reason::query()->create([
            'name' => $request->name,
            'weight' => $request->weight,
            'parent_id' => $request->parent_id,
            'group_id' => $request->group_id,
            'visibility' => $request->visibility,
            'information_id' => $request->information_id
        ]);

        History::query()->create([
            'user_id' => Auth::id(),
            'activity_id' => 6,
            'comment' => $reason->id
        ]);

        return $reason;
    }

    public function update(Request $request)
    {
        $reason = Reason::query()->find($request->id);

        $reason->update([
            'name' => $request->name,
            'weight' => $request->weight,
            'group_id' => $request->group_id,
            'visibility' => $request->visibility,
            'information_id' => $request->information_id
        ]);

        History::query()->create([
            'user_id' => Auth::id(),
            'activity_id' => 10,
            'comment' => $reason->id
        ]);

        return $reason;
    }

    public function get()
    {
        PartnerController::bxConnect(1);

        $user = CRest::call('user.get', [
            'ID' => Auth::user()->bitrix_id
        ]);

        $departments = CRest::call('department.get', [
            'UF_HEAD' => Auth::user()->bitrix_id
        ]);

        return Reason::all()->filter(function($reason) use ($user, $departments) {
            if(Auth::user()->bitrix_id == 3315 or Auth::user()->bitrix_id == 6384){
                return $reason->visibility == 3;
            }elseif(array_key_exists('result', $user) and in_array(334, $user['result'][0]['UF_DEPARTMENT'])){
                return $reason->visibility == 4;
            }else{
                return ($reason->visibility == 2 and count($departments['result']) >= 1) or
                    Auth::user()->is_manager or
                    !in_array($reason->visibility, [2,3,4]);
            }
        })->values();
    }

    public function information(Request $request)
    {
        $reason = Reason::query()->find($request->id)->first();
        PartnerController::bxConnect(1);

        if($reason->information_id == 1){    // Запрос информации по лидам
            $user = CRest::call('user.get', [
                'ID' => Auth::user()->bitrix_id
            ]);

            $users = collect(CRest::firstBatch('user.get', [
                'FILTER' => [
                    'UF_DEPARTMENT' => $user['result'][0]['UF_DEPARTMENT'],
                    'ACTIVE' => 'Y'
                ]
            ], true));

            return $users->map(function($item) {
                $leads = CRest::call('crm.lead.list', [
                    'FILTER' => [
                        'ASSIGNED_BY_ID' => $item['ID'],
                        'STATUS_SEMANTIC_ID' => 'P'
                    ]
                ]);

                return trim($item['LAST_NAME'].' '.$item['NAME'].' '.$item['SECOND_NAME']).': '.$leads['total'];
            });
        }

        return null;
    }
}
