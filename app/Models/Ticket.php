<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'manager_id',
        'coupon_id',
        'reason_id',
        'active',

    ];

    public function reason(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Reason::class, 'id', 'reason_id');
    }

    public function coupon(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(Coupon::class, 'id', 'coupon_id');
    }

    public function user(): \Illuminate\Database\Eloquent\Relations\HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

}
