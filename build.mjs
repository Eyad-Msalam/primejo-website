import fs from 'node:fs'; import path from 'node:path';
const root=process.cwd(),dist=path.join(root,'dist'); fs.rmSync(dist,{recursive:true,force:true}); fs.mkdirSync(dist,{recursive:true});
function copyDir(src,dst){fs.mkdirSync(dst,{recursive:true});for(const e of fs.readdirSync(src,{withFileTypes:true})){const s=path.join(src,e.name),d=path.join(dst,e.name);e.isDirectory()?copyDir(s,d):fs.copyFileSync(s,d)}}
for(const name of ['index.html','style.css','script.js','robots.txt','sitemap.xml','.pages.yml','README_AR.txt','CMS_SETUP_AR.txt']){const s=path.join(root,name);if(fs.existsSync(s))fs.copyFileSync(s,path.join(dist,name))}
for(const name of ['assets','content'])copyDir(path.join(root,name),path.join(dist,name));
const data=fs.readFileSync(path.join(root,'content','home.json'),'utf8');fs.writeFileSync(path.join(dist,'content-data.js'),`window.PRIME_DATA=${data};\n`);
console.log('Built PRIME site to dist');
