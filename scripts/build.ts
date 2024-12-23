import fs from 'fs/promises';
import path from 'path';
import {createWriteStream} from 'fs';
import archiver from 'archiver';
import {version} from '../package.json';

const folderPath = path.join('./src/plugins');

const files = await fs.readdir(folderPath);
const exports: string[] = [];

for (const file of files.filter((file) => file.endsWith('.ts'))) {
    exports.push(file);
}

await fs.writeFile(
    './src/plugins.ts',
    `import type {Plugin} from './types/plugin';

const exports: Plugin[] = [];
${exports.map((file, i) => `import Plugin${i} from './plugins/${file}';\nexports.push(Plugin${i} as Plugin);`).join('\n')}

export default exports;`,
);

await Bun.build({
    entrypoints: ['./index.ts'],
    outdir: './build',
    minify: true,
    banner: `/*
██████╗ ███████╗████████╗████████╗███████╗██████╗      ██████╗██╗  ██╗███████╗███████╗███████╗    ██████╗ ██████╗ ███╗   ███╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗    ██╔════╝██║  ██║██╔════╝██╔════╝██╔════╝   ██╔════╝██╔═══██╗████╗ ████║
██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝    ██║     ███████║█████╗  ███████╗███████╗   ██║     ██║   ██║██╔████╔██║
██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗    ██║     ██╔══██║██╔══╝  ╚════██║╚════██║   ██║     ██║   ██║██║╚██╔╝██║
██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║    ╚██████╗██║  ██║███████╗███████║███████║██╗╚██████╗╚██████╔╝██║ ╚═╝ ██║
╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝╚═╝ ╚═════╝ ╚═════╝ ╚═╝     ╚═╝                                                                                                               
Better Chess.com
*/`,
});

const build = await fs.readFile('./build/index.js', 'utf8');

await fs.writeFile(
    './build/userscript.js',
    `// ==UserScript==
// @name         Better Chess.com
// @namespace    http://tampermonkey.net/
// @version      ${version}
// @description  Make chess.com better
// @author       You
// @match        https://*.chess.com/*
// @match        http://*.chess.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=chess.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    ${build}
})();`,
);

const manifest = {
    manifest_version: 3,
    name: 'Better Chess.com',
    version,
    description: 'Make chess.com better',
    content_scripts: [
        {
            matches: ['https://*.chess.com/*', 'http://*.chess.com/*'],
            js: ['index.js'],
        },
    ],
};

await fs.mkdir('./build/chrome-extension', {recursive: true});
await fs.copyFile('./build/index.js', './build/chrome-extension/index.js');
await fs.writeFile('./build/chrome-extension/manifest.json', JSON.stringify(manifest, null, 2));

const output = createWriteStream('./build/chrome-extension.zip');
const archive = archiver('zip', {
    zlib: {level: 9},
});

output.on('close', () => {
    console.log(`Chrome extension has been zipped, total size: ${archive.pointer()} bytes`);
});

archive.on('error', (err) => {
    throw err;
});

archive.pipe(output);
archive.directory('./build/chrome-extension', false);
await archive.finalize();
