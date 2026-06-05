import os

files_to_delete = [
    "public/hero video.mp4",
    "public/student-work/KARMA.mp4",
    "public/student-work/ANANDI.mp4",
    "public/hero-video.mp4",
    "public/student-work/the-plastic-plague.mp4",
    "public/student-work/fast-life.mp4",
    "public/hero-video.webm.backup",
    "public/vfx-video.mp4",
    "public/event.mp4",
    "public/hero-video-compressed.mp4.backup",
    "public/images/maac-logo.jpg"
]

total_freed = 0

for file_path in files_to_delete:
    if os.path.exists(file_path):
        size = os.path.getsize(file_path)
        total_freed += size
        try:
            os.remove(file_path)
            print(f"Deleted: {file_path} ({size/1024/1024:.2f} MB)")
        except Exception as e:
            print(f"Error deleting {file_path}: {e}")
    else:
        print(f"File not found (already deleted?): {file_path}")

print(f"\nCleanup complete. Total space freed: {total_freed/1024/1024:.2f} MB")
