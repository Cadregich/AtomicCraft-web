<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Privilege extends Model
{
    use HasFactory;

    protected $fillable = [
        'server_id',
        'title',
        'price',
        'capabilities'
    ];

    public function users()
    {
        return $this->hasMany(User::class, 'privilage_id');
    }
}
