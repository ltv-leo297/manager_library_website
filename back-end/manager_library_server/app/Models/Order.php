<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Order extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'orderId';

    protected $fillable = [
        'nameUser',
        'addressUser',
        'countryUser',
        'nationalUser',
        'phoneNumberUser',
        'emailUser',
        'descriptinOrder',
        'moneyOfOrder',
        'dateOfOrder',
        'totalNumberOfBook'
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    }
