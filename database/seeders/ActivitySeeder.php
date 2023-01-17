<?php

namespace Database\Seeders;

use App\Models\Activity;
use Illuminate\Database\Seeder;

class ActivitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        collect([
            'Использован купон',
            'Попытка использования несуществующего купона',
            'Попытка использования потраченного купона',
            'Попытка использования просроченного купона',
            'Создание новой группы',
            'Создание новой записи в списке проблем',
            'Создание нового купона',
            'Редактирование группы',
            'Передача купона',
            'Редактирование записи в списке проблем',
        ])->each(function($name) {
            Activity::create([
                'name' => $name
            ]);
        });
    }
}
