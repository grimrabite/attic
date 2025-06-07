import os
import yaml

def fix_tags(path):
    for root, dirs, files in os.walk(path):
        for fname in files:
            if fname.endswith('.md'):
                fpath = os.path.join(root, fname)
                with open(fpath, encoding='utf-8') as f:
                    lines = f.readlines()
                if not lines or not lines[0].startswith('---'):
                    continue
                # Find end of frontmatter
                end_idx = 1
                while end_idx < len(lines) and not lines[end_idx].startswith('---'):
                    end_idx += 1
                if end_idx == len(lines):
                    continue
                fm = yaml.safe_load(''.join(lines[1:end_idx]))
                tags = fm.get('tags')
                changed = False
                if tags is None:
                    fm['tags'] = []
                    changed = True
                elif isinstance(tags, str):
                    fm['tags'] = [tags]
                    changed = True
                elif not isinstance(tags, list):
                    fm['tags'] = []
                    changed = True
                if changed:
                    with open(fpath, 'w', encoding='utf-8') as f:
                        f.write('---\n')
                        yaml.dump(fm, f, default_flow_style=False)
                        f.write('---\n')
                        f.writelines(lines[end_idx+1:])
                    print(f"Fixed tags in {fpath}")

# Example usage:
# fix_tags('/path/to/your/src')