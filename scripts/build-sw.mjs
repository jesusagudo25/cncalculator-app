import { readdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
async function files(dir) {
 const entries=await readdir(dir,{withFileTypes:true});
 return (await Promise.all(entries.map(entry=>entry.isDirectory()?files(path.join(dir,entry.name)):path.join(dir,entry.name)))).flat();
}
const paths=(await files('dist')).filter(file=>!file.endsWith('sw.js')).sort();
const hash=createHash('sha256');
for(const file of paths) hash.update(await readFile(file));
const urls=paths.map(file=>'/'+path.relative('dist',file).split(path.sep).join('/'));
const template=await readFile('scripts/sw-template.js','utf8');
await writeFile('dist/sw.js',template.replace('__VERSION__',hash.digest('hex').slice(0,16)).replace('__ASSETS__',JSON.stringify(urls)));
console.log(`Service worker generado: ${urls.length} recursos locales, incluidos los chunks de Excel y videos.`);
