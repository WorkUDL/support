<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/',
        '/api/*',
        '/de882a5907b86bcb151b4f726b19a3c0/',
        '/de882a5907b86bcb151b4f726b19a3c0/*'
    ];
}
