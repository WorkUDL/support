<?php

namespace App\Http\Middleware;

use App\Http\Controllers\CRest;
use App\Models\Partner;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CheckBitrixAuth
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $domain = '';
        $auth = $request->toArray();

        if(array_key_exists('AUTH_ID', $auth)){
            CRest::setDataExt([
                'access_token' 		=> $auth['AUTH_ID'],
                'application_token' => $auth['APP_SID'],
                'refresh_token' 	=> $auth['REFRESH_ID'],
                'domain'			=> $auth['DOMAIN'],
                'client_endpoint' 	=> 'https://'.$auth['DOMAIN'].'/rest/'
            ]);

            $domain = $auth['DOMAIN'];
        }elseif(array_key_exists('auth', $auth)){
            CRest::setDataExt([
                'access_token' 		=> $auth['auth']['access_token'],
                'application_token' => array_key_exists('application_token', $auth['auth'])
                    ? $auth['auth']['application_token']
                    : $auth['auth']['access_token'],
                'refresh_token' 	=> array_key_exists('refresh_token', $auth['auth'])
                    ? $auth['auth']['refresh_token']
                    : $auth['auth']['access_token'],
                'domain'			=> $auth['auth']['domain'],
                'client_endpoint' 	=> 'https://'.$auth['auth']['domain'].'/rest/'
            ]);

            $domain = $auth['auth']['domain'];
        }

        $current = CRest::call('user.current');
        if(is_array($current) and array_key_exists('result', $current)){
            $request->request->add([
                'current' => $current['result'],
                'partner' => Partner::where('domain', $domain)->first()
            ]);

            return $next($request);
        }

        return response([
            'error' => 'Ошибка авторизации пользователя в Битрикс24',
            'request' => $request->toArray(),
            'current' => $current
        ], 401);
    }
}
