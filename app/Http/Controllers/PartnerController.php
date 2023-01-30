<?php

namespace App\Http\Controllers;

use App\Models\Manager;
use App\Models\Partner;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class PartnerController extends Controller
{
    public function install(Request $request)
    {
        CRest::setDataExt([
            'access_token' 		=> $request->AUTH_ID,
            'application_token' => $request->APP_SID,
            'refresh_token' 	=> $request->REFRESH_ID,
            'domain'			=> $request->DOMAIN,
            'client_endpoint' 	=> 'https://'.$request->DOMAIN.'/rest/'
        ]);

        $result = Crest::installApp($request);

        if($result['install']){
            Partner::updateOrCreate([
                'domain'   => $request->DOMAIN,
            ],[
                'access_token' => $request->AUTH_ID,
                'application_token' => $request->APP_SID,
                'refresh_token' => $request->REFRESH_ID,
                'domain' => $request->DOMAIN,
                'client_endpoint' => 'https://'.$request->DOMAIN.'/rest/'
            ]);

            CRest::call('placement.unbind', [
                'PLACEMENT' => 'REST_APP_URI',
                'HANDLER' => 'http://127.0.0.1:8000/de882a5907b86bcb151b4f726b19a3c0/',
            ]);

            CRest::call('placement.bind', [
                'PLACEMENT' => 'REST_APP_URI',
                'HANDLER' => 'https://support.sms19.ru/de882a5907b86bcb151b4f726b19a3c0/tickets',
            ]);
        }

        return view('install', ['result' => $result]);
    }

    public static function bxConnect($partner_id)
    {
        $partner = Partner::find($partner_id);

        CRest::setDataExt([
            'access_token' 		=> $partner->access_token,
            'application_token' => $partner->application_token,
            'refresh_token' 	=> $partner->refresh_token,
            'domain'			=> $partner->domain,
            'client_endpoint' 	=> 'https://'.$partner->domain.'/rest/'
        ]);
    }

    public function login(Request $request)
    {
        self::bxConnect(1);

        self::checkUserExists($request);

        if(Auth::attempt([
            'email' => $request->ID.'@udl.ru',
            'password' => 'vRZVgh6c'
        ])){
            Auth::user()->tokens()->where('last_used_at', '<', date('Y-m-d H:i:s', time() - 3600 * 24))->delete();

            return [
                'user' => Auth::user(),
                'is_manager' => Auth::user()->is_manager,
                'token' => Auth::user()->createToken('Open app')->plainTextToken,
                'is_head' => 1
            ];
        }

        return response([
            'error' => 'Не удалось авторизоваться'
        ], 401);
    }

    public static function checkUserExists($request)
    {
        //$user = User::where('bitrix_id', $request->ID);
        //if($user->exists()) return $user->first();

        return User::updateOrCreate([
            'bitrix_id' => $request->ID
        ],[
            'photo' => $request->PERSONAL_PHOTO == null
                ? 'https://б24.юдл.рф/upload/resize_cache/main/87d/m9qfdx85bfa85fwci8e9bfilnwhjdrby/212_212_1/png-transparent-technical-support-customer-service-organization-email-email-miscellaneous-service-business.png'
                : $request->PERSONAL_PHOTO,
            'last_name' => $request->LAST_NAME,
            'name' => $request->NAME,
            'second_name' => $request->SECOND_NAME,
            'email' => $request->ID.'@udl.ru',
            'password' => Hash::make('vRZVgh6c')
        ]);
    }
}
