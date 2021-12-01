<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Book extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $primaryKey = 'bookId';

    protected $fillable = [
        'bookName',
        'bookAuthor',
        'bookCategory',
        'money',
        'numberOfBook',
        'linkImageBook',
        'publishingCompany',
        'numberOfPage',
        'mass',
        'sizeOfBook',
        'dateOfPublishing',
        'description',
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
