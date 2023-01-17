<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reason extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'weight',
        'parent_id',
        'group_id',
        'visibility',
        'information_id',
    ];

    public function group(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Group::class, 'id', 'group_id');
    }
}
