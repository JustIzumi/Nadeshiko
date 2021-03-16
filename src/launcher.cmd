@echo off
@title Nadeshiko Windows Launcher

setlocal enabledelayedexpansion
set Looping=False

cls

echo.
echo Required NodeJS version: v12.8.1 (or higher)
echo Your current NodeJS version:
call node -v
echo.

:start
@title Nadeshiko Windows Launcher
echo Please choose an Option
echo.
echo 1. Start normally
echo 2. Start with auto-restart on file updates
echo 3. Install all dependencies
echo 4. Exit
echo.

set /p op="Option --> "

if !op! == 1 (
    @title Starting normally...

    cls 
    echo Starting normally...
    echo Press CTRL+C to exit process
    echo.
    echo Compiling TypeScript...
    call tsc && echo Done
    echo.
    echo Starting...
    call node %~dp0\sharder.js
    pause
)
if !op! == 2 (
    @title Starting with auto-restarts on...

    cls 
    echo Starting with auto-restarts turned on...
    echo.
    echo Compiling TypeScript
    call tsc && echo Done
    echo.
    call nodemon %~dp0\sharder.js
    pause
    )
if !op! == 3 (
    if exist ..\package.json (
        cls
        @title Installing dependencies...

        call npm i -save && cls && goto start

        ) else (
            @title Error

            cls
            echo package.json file wasn't found
            timeout 10
        )
    )
if !op! == 4 (
    @title Bye!

    cls

    echo Exiting the launcher
    echo Bye..
    timeout 3
    ) else (
        cls
        goto start
    )

if not %errorlevel%=="0" (
    @title Error
    pause
    exit /b %errorlevel%
)

:eof
exit