<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{ config('app.name', 'Laravel') }}</title>
        <script src="https://api.bitrix24.com/api/v1/"></script>
        @if ($result['install'])
            <script>
                BX24.init(function(){
                    BX24.installFinish();
                });
            </script>
        @endif
    </head>
    <body>

    @if ($result['install'])
        installation has been finished
    @else
        installation error
    @endif

    </body>
</html>
