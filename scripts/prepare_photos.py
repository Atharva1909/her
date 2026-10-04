import os
from PIL import Image, ImageOps

try:
    import pillow_heif
    pillow_heif.register_heif_opener()
except ImportError:
    pass

PHOTOS_DIR = os.path.join(os.path.dirname(__file__), '..', 'public', 'photos')

def process_photos():
    if not os.path.exists(PHOTOS_DIR):
        print(f"Directory not found: {PHOTOS_DIR}")
        return

    # Map of known files or loose files
    files = sorted([f for f in os.listdir(PHOTOS_DIR) if f != 'README.txt'])
    
    # Check for direct files or pattern matches
    for i in range(1, 8):
        target_name = f"photo{i}.jpg"
        target_path = os.path.join(PHOTOS_DIR, target_name)
        
        # Look for candidates
        candidates = [
            f"photo{i}.jpg.jpeg", f"photo{i}.jpeg", f"photo{i}.jpg.heic",
            f"photo{i}.heic", f"photo{i}.png", f"photo{i}.webp",
            f"{i}.jpg", f"{i}.jpeg", f"{i}.png", f"{i}.heic"
        ]
        
        for cand in candidates:
            cand_path = os.path.join(PHOTOS_DIR, cand)
            if os.path.exists(cand_path) and cand_path != target_path:
                try:
                    im = Image.open(cand_path)
                    im = ImageOps.exif_transpose(im)
                    if im.mode in ('RGBA', 'P'):
                        im = im.convert('RGB')
                    im.save(target_path, 'JPEG', quality=92)
                    print(f"[OK] Converted {cand} -> {target_name}")
                    break
                except Exception as e:
                    print(f"Error converting {cand}: {e}")

if __name__ == '__main__':
    process_photos()
