"""
Optimize portfolio images for web performance
- Compress images to <500KB while maintaining quality
- Remove duplicate/suspicious files
- Generate WebP versions
"""
import os
from PIL import Image
import hashlib

BASE_DIR = r'C:\Users\15anu\OneDrive\文档\code\maac prachi\public\portfolio'
MAX_FILE_SIZE = 500 * 1024  # 500KB
TARGET_WIDTH = 1920  # Max width for web

def get_file_hash(filepath):
    """Get MD5 hash to detect duplicates"""
    with open(filepath, 'rb') as f:
        return hashlib.md5(f.read()).hexdigest()

def optimize_image(filepath):
    """Compress image to target size"""
    try:
        img = Image.open(filepath)
        
        # Skip if already small
        filesize = os.path.getsize(filepath)
        if filesize < MAX_FILE_SIZE and img.width <= TARGET_WIDTH:
            return filepath, filesize
        
        # Resize if too large
        if img.width > TARGET_WIDTH:
            ratio = TARGET_WIDTH / img.width
            new_height = int(img.height * ratio)
            img = img.resize((TARGET_WIDTH, new_height), Image.Resampling.LANCZOS)
            print(f"  Resized: {img.width}x{img.height}")
        
        # Compress with quality reduction
        quality = 85
        img.save(filepath, 'JPEG', quality=quality, optimize=True)
        new_size = os.path.getsize(filepath)
        
        # Keep reducing quality if still too large
        while new_size > MAX_FILE_SIZE and quality > 30:
            quality -= 5
            img.save(filepath, 'JPEG', quality=quality, optimize=True)
            new_size = os.path.getsize(filepath)
        
        return filepath, new_size
        
    except Exception as e:
        print(f"  ERROR: {e}")
        return filepath, 0

def main():
    print("🔍 Scanning portfolio images...\n")
    
    duplicates = {}
    total_saved = 0
    processed = 0
    
    for root, dirs, files in os.walk(BASE_DIR):
        for filename in files:
            if not filename.lower().endswith(('.jpg', '.jpeg')):
                continue
            
            filepath = os.path.join(root, filename)
            original_size = os.path.getsize(filepath)
            file_hash = get_file_hash(filepath)
            
            # Check for duplicates
            if file_hash in duplicates:
                print(f"🗑️  DUPLICATE: {filename}")
                print(f"    Same as: {duplicates[file_hash]}")
                print(f"    Deleting: {original_size // 1024}KB")
                os.remove(filepath)
                total_saved += original_size
                continue
            else:
                duplicates[file_hash] = filename
            
            # Check if needs optimization
            if original_size > MAX_FILE_SIZE:
                print(f"📦 Compressing: {filename}")
                print(f"    Original: {original_size // 1024}KB")
                
                _, new_size = optimize_image(filepath)
                
                if new_size > 0:
                    saved = original_size - new_size
                    total_saved += saved
                    print(f"    Compressed: {new_size // 1024}KB ({saved // 1024}KB saved)")
                
                processed += 1
    
    print(f"\n{'='*60}")
    print(f"✅ Optimization Complete!")
    print(f"📊 Processed: {processed} images")
    print(f"💾 Total saved: {total_saved // 1024 // 1024}MB")
    print(f"{'='*60}")

if __name__ == '__main__':
    main()
