<?php

namespace App\Console\Commands;

use App\Http\Controllers\CRest;
use App\Http\Controllers\MemberController;
use App\Models\Dialog;
use App\Models\Participant;
use App\Models\Partner;
use Illuminate\Console\Command;
use Symfony\Component\Console\Command\Command as CommandAlias;

class member extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'member:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        ini_set('memory_limit', '-1');
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $participants = Participant::query()
            ->where('user_id', 3)
            ->with(['ticket'])
            ->get()
            ->each(function($item){
                if($item->ticket->manager_id === 867 and $item->ticket->active === 1){
                    $item->user_id = 867;
                    $item->save();
                }
            });

        print_r($participants->toArray());

        return CommandAlias::SUCCESS;
    }
}
