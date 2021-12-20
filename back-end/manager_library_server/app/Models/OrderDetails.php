<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class OrderDetails extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'orderDetailId';

    protected $fillable = [
        'orderId',
        'moneyOfOrderDetail',
        'bookId',
        'numberOfBook',
        'dateOfOrder'
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
