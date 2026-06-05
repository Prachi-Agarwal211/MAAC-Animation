import os
from PIL import Image

def optimize_image(file_path, max_width=None, quality=80):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    original_size = os.path.getsize(file_path)
    img = Image.open(file_path)
    
    # Check if resize is needed
    if max_width and img.width > max_width:
        ratio = max_width / float(img.width)
        new_height = int(float(img.height) * float(ratio))
        img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
        print(f"Resized {file_path} to {max_width}x{new_height}")
    
    # Save with compression
    # If PNG and very large, check if we can convert it to JPEG (RGB) or optimize it
    ext = os.path.splitext(file_path)[1].lower()
    
    if ext == '.png':
        # If the image is transparent (RGBA), keep as PNG but optimize
        if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
            img.save(file_path, 'PNG', optimize=True)
        else:
            # No transparency, we can convert to JPEG to save massive space
            jpeg_path = file_path.replace('.png', '.jpg')
            # Wait, let's see if we should overwrite the png file with JPEG data or just save as PNG with high compression
            # Since the code references .png, we should keep the extension as .png but write it as an optimized PNG
            # Or convert to RGB and save as PNG.
            # Let's save as PNG with palette reduction or high compression
            img = img.convert('P', palette=Image.Palette.ADAPTIVE, colors=256)
            img.save(file_path, 'PNG', optimize=True)
    elif ext in ('.jpg', '.jpeg'):
        # Save as JPEG with optimized quality
        if img.mode == 'RGBA':
            img = img.convert('RGB')
        img.save(file_path, 'JPEG', quality=quality, optimize=True)
        
    new_size = os.path.getsize(file_path)
    reduction = (original_size - new_size) / original_size * 100
    print(f"Optimized {file_path}: {original_size/1024:.1f}KB -> {new_size/1024:.1f}KB ({reduction:.1f}% reduction)")

# Files to optimize
targets = [
    # (file_path, max_width, quality)
    ("public/og-image.jpg", 1200, 75),
    ("public/campus-image.jpg", 1200, 80),
    ("public/courses_images/ed_animation.png", 800, 80),
    ("public/courses_images/viz_pro.png", 800, 80),
    ("public/courses_images/d3d.png", 800, 80),
    ("public/courses_images/dgdi.jpeg", 800, 80),
    ("public/courses_images/ad3d.jpeg", 800, 80),
    ("public/courses_images/apdmd.jpeg", 800, 80)
]

for path, max_width, q in targets:
    optimize_image(path, max_width, q)
