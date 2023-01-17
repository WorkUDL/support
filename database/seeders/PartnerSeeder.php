<?php

namespace Database\Seeders;

use App\Models\Partner;
use Illuminate\Database\Seeder;

class PartnerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $partners = [
            [
                'activities' => 1,
                'webhook' => 'https://xn--d1ao9c.xn--p1ai/rest/3054/0u2ke29934x2a6j7/'
            ]
        ];

        foreach ($partners as $value)   Partner::create($value);
    }
}
