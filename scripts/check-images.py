import os

base = r'C:\Users\15anu\OneDrive\文档\code\maac prachi\public\portfolio'
total_size = 0
total_images = 0

print('📊 FINAL IMAGE REPORT')
print('=' * 50)

for root, dirs, files in os.walk(base):
    for f in files:
        if f.lower().endswith('.jpg'):
            fp = os.path.join(root, f)
            sz = os.path.getsize(fp)
            total_size += sz
            total_images += 1

print(f'Total Images: {total_images}')
print(f'Total Size: {total_size // 1024 // 1024}MB')
print(f'Average Size: {total_size // total_images // 1024}KB')
print('=' * 50)
