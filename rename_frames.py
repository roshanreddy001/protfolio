import os
import re

# Correct path logic: relative to where script is run
base_dir = os.path.abspath(os.path.join(os.getcwd(), '../sequence_temp'))

def rename_frames(directory):
    if not os.path.exists(directory):
        print(f"Directory not found: {directory}")
        return

    files = [f for f in os.listdir(directory) if f.endswith('.png')]
    
    def extract_number(filename):
        match = re.search(r'frame_(\d+)', filename)
        if match:
            return int(match.group(1))
        return 0

    files.sort(key=extract_number)
    
    print(f"Found {len(files)} files in {directory}.")
    
    for i, filename in enumerate(files):
        # 1-based index: frame_0001.png
        new_name = f"frame_{i+1:04d}.png"
        old_path = os.path.join(directory, filename)
        new_path = os.path.join(directory, new_name)
        
        try:
            os.rename(old_path, new_path)
            # print(f"Renamed {filename} -> {new_name}")
        except Exception as e:
            print(f"Error renaming {filename}: {e}")

if __name__ == "__main__":
    rename_frames(base_dir)
