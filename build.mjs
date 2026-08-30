import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');

fs.rmSync(dist, {
  recursive: true,
  force: true
});

fs.mkdirSync(dist, {
  recursive: true
});

function copyDir(src, dst) {
  fs.mkdirSync(dst, {
    recursive: true
  });

  for (const entry of fs.readdirSync(src, {
    withFileTypes: true
  })) {
    const source = path.join(src, entry.name);
    const target = path.join(dst, entry.name);

    if (entry.isDirectory()) {
      copyDir(source, target);
    } else {
      fs.copyFileSync(source, target);
    }
  }
}

/*
 * Copy the main website files
 */
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
  const target = path.join(dist, name);

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, target);
  }
}

/*
 * Copy website assets and content
 */
for (const name of [
  'assets',
  'content'
]) {
  const source = path.join(root, name);
  const target = path.join(dist, name);

  if (fs.existsSync(source)) {
    copyDir(source, target);
  }
}

/*
 * IMPORTANT:
 * Copy the entire admin folder so that:
 *
 * /admin/index.html
 * /admin/config.yml
 *
 * are included in the deployed site.
 */
const adminSource = path.join(root, 'admin');
const adminTarget = path.join(dist, 'admin');

if (fs.existsSync(adminSource)) {
  copyDir(adminSource, adminTarget);
}

/*
 * Generate the content data file
 */
const dataPath = path.join(
  root,
  'content',
  'home.json'
);

const outputDataPath = path.join(
  dist,
  'content-data.js'
);

const data = fs.readFileSync(
  dataPath,
  'utf8'
);

fs.writeFileSync(
  outputDataPath,
  `window.PRIME_DATA=${data};\n`,
  'utf8'
);

console.log('Built PRIME site to dist');
