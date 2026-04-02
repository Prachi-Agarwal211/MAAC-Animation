@echo off
echo ===================================
echo Video Compression Script
echo ===================================
echo.
echo This will compress all hero section videos to web-friendly sizes
echo Target: Under 5MB per video (720p for mobile compatibility)
echo.
echo Installing ffmpeg dependency...
npm install --save-dev @ffmpeg-installer/ffmpeg

echo.
echo Compressing hero section videos...
echo.

REM Create compressed output folder
mkdir "public\hero-section-compressed" 2>nul

REM Compress each video using ffmpeg
echo Compressing AAKANKSHA.mp4...
ffmpeg -i "public\hero-section\AAKANKSHA.mp4" -vf "scale=1280:720" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k "public\hero-section-compressed\AAKANKSHA.mp4" -y

echo Compressing ABHILASH S.mp4...
ffmpeg -i "public\hero-section\ABHILASH S.mp4" -vf "scale=1280:720" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k "public\hero-section-compressed\ABHILASH S.mp4" -y

echo Compressing EMON MANDAL.mp4...
ffmpeg -i "public\hero-section\EMON MANDAL.mp4" -vf "scale=1280:720" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k "public\hero-section-compressed\EMON MANDAL.mp4" -y

echo Compressing NAYAN SATYAWAN MESTRY.mp4...
ffmpeg -i "public\hero-section\NAYAN SATYAWAN MESTRY.mp4" -vf "scale=1280:720" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 96k "public\hero-section-compressed\NAYAN SATYAWAN MESTRY.mp4" -y

echo.
echo ===================================
echo Compression Complete!
echo ===================================
echo.
echo Compressed videos are in: public\hero-section-compressed\
echo.
echo Next steps:
echo 1. Check the compressed video quality
echo 2. Update MAACXHero.tsx to use the new paths:
echo    - /hero-section-compressed/AAKANKSHA.mp4
echo    - /hero-section-compressed/ABHILASH S.mp4
echo    - /hero-section-compressed/EMON MANDAL.mp4
echo    - /hero-section-compressed/NAYAN SATYAWAN MESTRY.mp4
echo.
pause
