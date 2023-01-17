<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Partner extends Model
{
    use HasFactory;

    protected $fillable = [
        'access_token',
        'application_token',
        'refresh_token',
        'domain',
        'client_endpoint',
    ];
}
