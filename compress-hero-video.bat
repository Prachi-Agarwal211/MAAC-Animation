@echo off
echo ===================================
echo Hero Video Compression Script
echo ===================================
echo.
echo This will compress the hero background video from 427MB to under 10MB
echo Target: 720p, optimized for web playback
echo.

REM Check if ffmpeg is available
where ffmpeg >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: ffmpeg is not installed or not in PATH
    echo.
    echo Please install ffmpeg:
    echo 1. Download from: https://ffmpeg.org/download.html
    echo 2. Add to system PATH
    echo 3. Or use winget: winget install Gyan.FFmpeg
    echo.
    pause
    exit /b 1
)

echo Found ffmpeg! Compressing videos...
echo.

REM Compress hero video: 720p, CRF 28 for good quality/size balance
echo [1/3] Compressing hero video.mp4 (full length - optimized for web)...
ffmpeg -i "public\hero video.mp4" ^
    -vf "scale=1280:720:force_original_aspect_ratio=decrease" ^
    -c:v libx264 -crf 28 -preset medium -profile:v main -level 4.0 ^
    -c:a aac -b:a 96k -movflags +faststart ^
    "public\hero-video-compressed.mp4" -y

if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: Hero video compressed!
    for %%f in ("public\hero-video-compressed.mp4") do echo Size: %%~zf bytes
) else (
    echo ERROR: Failed to compress hero video
)

echo.

REM Compress intro video to ensure it's small
echo [2/3] Checking intro.webm size...
for %%f in ("public\intro.webm") do (
    set INTRO_SIZE=%%~zf
    if %%~zf GTR 5242880 (
        echo WARNING: intro.webm is larger than 5MB
        echo Compressing intro.webm...
        ffmpeg -i "public\intro.webm" ^
            -vf "scale=1280:720:force_original_aspect_ratio=decrease" ^
            -c:v libvpx-vp9 -crf 30 -b:v 0 -deadline good ^
            -c:a libopus -b:a 64k ^
            "public\intro-compressed.webm" -y
    ) else (
        echo OK: intro.webm is already a good size
    )
)

echo.

REM Create WebM version of hero video for better compression
echo [3/3] Creating WebM version of hero video (full length)...
ffmpeg -i "public\hero video.mp4" ^
    -vf "scale=1280:720:force_original_aspect_ratio=decrease" ^
    -c:v libvpx-vp9 -crf 30 -b:v 0 -deadline good ^
    -c:a libopus -b:a 96k -movflags +faststart ^
    "public\hero-video.webm" -y

if %ERRORLEVEL% EQU 0 (
    echo SUCCESS: WebM version created!
    for %%f in ("public\hero-video.webm") do echo Size: %%~zf bytes
) else (
    echo ERROR: Failed to create WebM version
)

echo.
echo ===================================
echo Compression Complete!
echo ===================================
echo.
echo Compressed files created:
echo   - public\hero-video-compressed.mp4
echo   - public\hero-video.webm
echo.
echo Next steps:
echo 1. Check compressed video quality
echo 2. Update MAACXHero.tsx to use compressed hero video
echo.
pause
