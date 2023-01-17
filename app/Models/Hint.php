<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Hint extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reason_id',
        'short',
        'full',
        'iframe',
    ];
}
