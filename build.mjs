import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const source = path.join(src, entry.name);
    const target = path.join(dst, entry.name);
    if (entry.isDirectory()) copyDir(source, target);
    else fs.copyFileSync(source, target);
  }
}

for (const name of [
  'index.html',
  'style.css',
  'script.js',
  'robots.txt',
  'sitemap.xml',
  '.pages.yml',
  'README_AR.txt',
  'CMS_SETUP_AR.txt'
]) {
  const source = path.join(root, name);
  if (fs.existsSync(source)) fs.copyFileSync(source, path.join(dist, name));
}

for (const name of ['assets', 'content', 'admin']) {
  const source = path.join(root, name);
  if (fs.existsSync(source)) copyDir(source, path.join(dist, name));
}

const data = fs.readFileSync(path.join(root, 'content', 'home.json'), 'utf8');
fs.writeFileSync(path.join(dist, 'content-data.js'), `window.PRIME_DATA=${data};\n`, 'utf8');

console.log('Built PRIME site to dist');
