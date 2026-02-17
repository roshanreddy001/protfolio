import os
import re
import sys

def normalize_frames(directory):
    print(f"Processing {directory}...")
    if not os.path.exists(directory):
        print(f"Directory {directory} not found.")
        return

    files = [f for f in os.listdir(directory) if f.startswith('frame_') and (f.endswith('.png') or f.endswith('.webp'))]
    
    # Sort files naturally or by extracting the number
    # Assumes format frame_NUMBER_...
    def extract_number(filename):
        match = re.search(r'frame_(\d+)', filename)
        if match:
            return int(match.group(1))
        return 0

    files.sort(key=extract_number)

    if not files:
        print("No frame files found.")
        return

    print(f"Found {len(files)} files.")

    for i, filename in enumerate(files):
        # Target: frame_0001.png (or keep original extension)
        ext = os.path.splitext(filename)[1]
        
        # We want 1-based indexing: 1 to N
        # User had 0-based in the upload examples (frame_000)
        new_name = f"frame_{str(i+1).zfill(4)}{ext}"
        
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, new_name)

        if old_path != new_path:
            try:
                os.rename(old_path, new_path)
                # print(f"Renamed {filename} -> {new_name}")
            except OSError as e:
                print(f"Error renaming {filename}: {e}")
        
    print(f"Finished verifying/renaming {len(files)} files in {directory}.")

if __name__ == "__main__":
    dirs = ["public/frames_mobile", "public/frames_tablet"]
    for d in dirs:
        normalize_frames(d)
