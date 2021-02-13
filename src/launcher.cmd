@echo off
@title Nadeshiko Windows Launcher

setlocal enabledelayedexpansion
set Looping=False

cls

echo.
echo Nadeshiko launcher
echo.

if exist "sharder.js" (
if exist "index.js" (

    :start
    echo Please choose an Option
    echo.
    echo 1. Start normally
    echo 2. Start with auto-restart on file updates
    echo 3. Exit
    echo.

    set /p op="----> "

    if !op! == 1 (
        @title Starting normally...

        cls 
        echo Starting normally...
        echo Press CTRL+C to exit process
        echo.
        node sharder.js
        pause
    )
    if !op! == 2 (
        @title Starting with auto-restarts on...
        cls 
        echo Starting with auto-restarts turned on...
        echo.
        nodemon sharder.js
        pause
    )
    if !op! == 3 (
        @title Bye!

        cls

        echo Exiting the launcher
        echo Bye..
        timeout 3
    ) else (
        cls
        goto start
    )

) else (
    echo File "index.js" wasn't found
    echo Expected path: "./src/index.js"
    echo.
    timeout 10
)) else (
    echo File "sharder.js" wasn't found
    echo Expected path: "./src/sharder.js"
    echo.
    timeout 10
)

:eof
exit