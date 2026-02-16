import shutil
import os

def move_project_files():
    source_dir = 'portfolio-web'
    target_dir = '.'
    
    # Files/Dirs to move
    items = [
        'package.json', 'package-lock.json', 'next.config.mjs', 
        'jsconfig.json', 'eslint.config.mjs', '.gitignore', 
        'README.md', 'public', 'src', 'node_modules'
    ]
    
    print(f"Moving items from {source_dir} to {target_dir}")
    
    for item in items:
        src_path = os.path.join(source_dir, item)
        dst_path = os.path.join(target_dir, item)
        
        if os.path.exists(src_path):
            try:
                if os.path.isdir(src_path):
                    # For directories, valid move requires destination to not exist or be empty
                    # shutil.move handles this usually
                    shutil.move(src_path, dst_path)
                else:
                    shutil.move(src_path, dst_path)
                print(f"Moved {item}")
            except Exception as e:
                print(f"Error moving {item}: {e}")
        else:
            print(f"Skipping {item} (not found)")

    # Cleanup source dir if empty-ish
    # shutil.rmtree(source_dir, ignore_errors=True) # Optional

def move_frames():
    # Adjusted path for sequence_temp (it is in parent)
    source_dir = os.path.abspath(os.path.join(os.getcwd(), '..', 'sequence_temp'))
    target_dir = 'public/frames'
    
    if not os.path.exists(target_dir):
        os.makedirs(target_dir)
        print(f"Created {target_dir}")
        
    if os.path.exists(source_dir):
        files = os.listdir(source_dir)
        print(f"Moving {len(files)} frames from {source_dir} to {target_dir}")
        for f in files:
            if f.endswith('.png'):
                shutil.move(os.path.join(source_dir, f), os.path.join(target_dir, f))
        
        # Cleanup
        try:
            os.rmdir(source_dir)
            print("Removed sequence_temp")
        except:
            pass
    else:
        print(f"sequence_temp not found at {source_dir}")

if __name__ == "__main__":
    move_project_files()
    move_frames()
