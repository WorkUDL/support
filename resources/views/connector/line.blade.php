<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <link href="{{ asset('css/app.css') }}" type="text/css" media="all" rel="stylesheet">
</head>
<body>
<form class="row g-3" method="POST" action="/client/set" style="width: 100%;">
    @csrf
    <input type="text" name="user_id" value="{{ $user_id }}" hidden>
    <input type="text" name="line_id" value="{{ $line_id }}" hidden>
    <div class="col-auto" style="flex: 1;">
        <select class="form-select" name="line_hash">
            @foreach ($clients as $client)
                @if ($line_status and $client->line_id == $line_id)
                    <option value="{{ $client->hash }}" selected>{{ $client->name }}</option>
                @else
                    <option value="{{ $client->hash }}">{{ $client->name }}</option>
                @endif
            @endforeach
        </select>
    </div>
    <div class="col-auto">
        <button type="submit" class="btn btn-primary mb-3">Сохранить</button>
    </div>
</form>
</body>
</html>
