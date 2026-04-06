"""
Convert PDF files to high-quality JPG images for the MAAC portfolio.
Uses PyMuPDF (fitz) - no poppler dependency needed.
Handles multi-page PDFs, creates proper directory structure.
"""
import os
import sys
import json
from pathlib import Path

try:
    import fitz  # PyMuPDF
except ImportError:
    print("ERROR: PyMuPDF not installed. Run: pip install PyMuPDF")
    sys.exit(1)

# Configuration
BASE_DIR = Path(r"C:\Users\15anu\OneDrive\文档\code\maac prachi")
PDF_SOURCE = BASE_DIR / "MAAC WEBSITE DATA-20260402T150538Z-1-001" / "MAAC WEBSITE DATA"
PORTFOLIO_DIR = BASE_DIR / "public" / "portfolio"
IMAGES_DIR = BASE_DIR / "public" / "images"

ZOOM = 3.0  # 3x = ~300 DPI equivalent for typical screen PDFs
FORMAT = "jpeg"
JPEG_QUALITY = 95

# Category mapping: source folder -> portfolio subfolder
CATEGORY_MAP = {
    "3D GAME ASSET": "3d-game-asset",
    "ARCHITECTURAL DESIGN VISUALIZATION": "architectural-design",
    "CHARACTER MODELING & TEXTURING": "character-modeling",
    "DIGITAL PAINTING": "digital-painting",
    "ENVIRONMENT MODELING & TEXTURING": "environment-modeling",
    "MATTE PAINTING": "matte-painting",
}

# Additional categories to discover
ADDITIONAL_CATEGORIES = [
    "CG LIGHTING",
    "CHARACTER ANIMATION",
    "UNIC Animated Short Film",
    "UNREAL CINEMATIC",
]

def sanitize_filename(name):
    """Make filename URL-safe and filesystem-friendly."""
    name = name.replace(" ", "-").replace("&", "and").replace("_", "-").lower()
    name = "".join(c for c in name if c.isalnum() or c == "-")
    while "--" in name:
        name = name.replace("--", "-")
    return name.strip("-")

def convert_pdf(pdf_path, output_dir, filename_base):
    """Convert a single PDF to JPG(s). Returns list of created filenames."""
    print(f"  Converting: {pdf_path.name}")
    
    try:
        doc = fitz.open(str(pdf_path))
    except Exception as e:
        print(f"  ERROR opening {pdf_path.name}: {e}")
        return []
    
    created_files = []
    mat = fitz.Matrix(ZOOM, ZOOM)  # High resolution
    
    for page_num in range(len(doc)):
        page = doc[page_num]
        pix = page.get_pixmap(matrix=mat)
        
        if len(doc) == 1:
            output_path = output_dir / f"{filename_base}.jpg"
        else:
            output_path = output_dir / f"{filename_base}-page{page_num + 1}.jpg"
        
        pix.save(str(output_path), "jpeg", jpg_quality=JPEG_QUALITY)
        created_files.append(output_path.name)
        print(f"    -> {output_path.name} ({pix.width}x{pix.height})")
    
    doc.close()
    return created_files

def process_category(category_name, source_dir, output_dir):
    """Process all PDFs in a category directory."""
    if not source_dir.exists():
        print(f"  Skipping (not found): {category_name}")
        return []
    
    print(f"\n--- {category_name} ---")
    output_dir.mkdir(parents=True, exist_ok=True)
    
    all_files = []
    pdf_files = sorted(source_dir.glob("*.pdf"))
    for pdf_path in pdf_files:
        base = sanitize_filename(Path(pdf_path).stem)
        files = convert_pdf(pdf_path, output_dir, base)
        all_files.extend(files)
    
    return all_files

def main():
    print("=" * 60)
    print("MAAC Portfolio PDF -> JPG Converter (PyMuPDF)")
    print("=" * 60)
    
    total_converted = 0
    manifest = {
        "total_images": 0,
        "generated_at": "2026-04-07",
        "zoom_factor": ZOOM,
        "categories": {}
    }
    
    # 1. Convert root-level featured PDFs
    print("\n--- Featured Artists ---")
    featured_dir = PORTFOLIO_DIR / "featured"
    featured_dir.mkdir(parents=True, exist_ok=True)
    for pdf_name in ["NANCY VERMA.pdf", "PRERIT MEHAN.pdf"]:
        pdf_path = PDF_SOURCE / pdf_name
        if pdf_path.exists():
            base = sanitize_filename(Path(pdf_name).stem)
            files = convert_pdf(pdf_path, featured_dir, base)
            total_converted += len(files)
            manifest["categories"]["featured"] = manifest["categories"].get("featured", []) + files
    
    # 2. Convert MAAC NEW LOGO to public/images/
    print("\n--- MAAC Logo ---")
    logo_pdf = PDF_SOURCE / "MAAC NEW LOGO_31 March.pdf"
    if logo_pdf.exists():
        IMAGES_DIR.mkdir(parents=True, exist_ok=True)
        files = convert_pdf(logo_pdf, IMAGES_DIR, "maac-logo")
        total_converted += len(files)
        manifest["categories"]["images"] = manifest["categories"].get("images", []) + files
    
    # 3. Convert mapped categories
    for category, folder_name in CATEGORY_MAP.items():
        source_dir = PDF_SOURCE / category
        output_dir = PORTFOLIO_DIR / folder_name
        files = process_category(category, source_dir, output_dir)
        total_converted += len(files)
        manifest["categories"][folder_name] = files
    
    # 4. Check for additional categories
    for item in sorted(PDF_SOURCE.iterdir()):
        if item.is_dir() and item.name not in CATEGORY_MAP:
            folder_name = sanitize_filename(item.name)
            output_dir = PORTFOLIO_DIR / folder_name
            files = process_category(item.name, item, output_dir)
            total_converted += len(files)
            manifest["categories"][folder_name] = files
    
    # Summary
    manifest["total_images"] = total_converted
    
    print("\n" + "=" * 60)
    print(f"CONVERSION COMPLETE: {total_converted} images created")
    print("=" * 60)
    
    # Write manifest
    manifest_path = PORTFOLIO_DIR / "manifest.json"
    PORTFOLIO_DIR.mkdir(parents=True, exist_ok=True)
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2)
    
    print(f"\nManifest: {manifest_path}")
    
    # Print summary by category
    print("\n--- Summary by Category ---")
    for cat, files in sorted(manifest["categories"].items()):
        print(f"  {cat}: {len(files)} image(s)")
        for fn in files:
            print(f"    - {fn}")
    
    print("\nDone!")

if __name__ == "__main__":
    main()
