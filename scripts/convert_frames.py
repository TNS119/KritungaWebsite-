import os
import glob
from PIL import Image

def convert_frames():
    src_dir = os.path.join(os.getcwd(), 'ezgif-7bdb9ab101e0fc17-jpg')
    out_dir = os.path.join(os.getcwd(), 'public', 'images', 'kritunga')
    os.makedirs(out_dir, exist_ok=True)
    
    files = sorted(glob.glob(os.path.join(src_dir, 'ezgif-frame-*.jpg')))
    total = len(files)
    print(f"Found {total} frames to convert.")
    
    for i, file_path in enumerate(files):
        target_path = os.path.join(out_dir, f"{i + 1}.webp")
        with Image.open(file_path) as img:
            if img.mode != 'RGB':
                img = img.convert('RGB')
            img.save(target_path, 'WEBP', quality=82, method=4)
        if (i + 1) % 40 == 0 or (i + 1) == total:
            print(f"Converted {i + 1}/{total} frames -> {target_path}")

    print("Frame conversion completed successfully!")

if __name__ == '__main__':
    convert_frames()
