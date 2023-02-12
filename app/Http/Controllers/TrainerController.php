<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TrainerController extends Controller
{
    public function get_call_managers()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://caller-app.w.sms19.ru/api/trainer_monitor/get_c53dad16c1f338ea73c3caba44adeeb5',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response);
    }

    public function get_bitrix_managers()
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => 'https://caller-app.w.sms19.ru/api/manager_monitor/get_c53dad16c1f338ea73c3caba44adeeb5',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => '',
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 0,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
        ));

        $response = curl_exec($curl);
        curl_close($curl);
        return json_decode($response);
    }
}
