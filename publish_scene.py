import os
from datetime import datetime
from slugify import slugify
import subprocess

# Adjust this to point to your `src/` folder
PROJECT_ROOT = "src"
FOLDERS = ["scenes", "attic", "sketches"]
DEFAULT_FOLDER = "scenes"

# Input collection
title = input("Title: ").strip()
slug = slugify(title)
date = datetime.now().strftime("%Y-%m-%d")
tags = input("Tags (comma-separated): ").strip()
summary = input("Summary: ").strip()
body = input("Body (multiline OK, paste now):\n")
folder_choice = input(f"Folder? ({', '.join(FOLDERS)}): ").strip().lower()
folder = folder_choice if folder_choice in FOLDERS else DEFAULT_FOLDER
image_path = input("Image filename (optional, in /assets/images/): ").strip()

# Build content
image_md = f"![image](/assets/images/{image_path})\n\n" if image_path else ""
tags_md = ", ".join(f'"{t.strip()}"' for t in tags.split(","))

markdown = f"""---
title: "{title}"
date: {date}
layout: layout.njk
tags: [{tags_md}]
summary: "{summary}"
slug: "{slug}"
---

{image_md}{body}
"""

# Save it
filename = f"{date}-{slug}.md"
target_path = os.path.join(PROJECT_ROOT, folder, filename)
os.makedirs(os.path.dirname(target_path), exist_ok=True)

with open(target_path, "w", encoding="utf-8") as f:
    f.write(markdown)

print(f"\n✅ Saved: {target_path}")

# Optional Git push
should_push = input("Push to GitHub? (y/n): ").lower()
if should_push == "y":
    subprocess.run(["git", "add", target_path])
    subprocess.run(["git", "commit", "-m", f"Add {title}"])
    subprocess.run(["git", "push"])
    print("🚀 Pushed to GitHub.")