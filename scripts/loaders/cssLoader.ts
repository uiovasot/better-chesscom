import type {BunPlugin} from 'bun';
import fs from 'fs/promises';
import {addCSS} from '../../src/utils/addCSS';

export default {
    name: 'css-loader',
    setup(build) {
        build.onLoad({filter: /\.css$/}, async (args) => {
            const cssContent = await fs.readFile(args.path, 'utf-8');

            return {
                contents: `var addCSS = ${addCSS.toString()};addCSS(${JSON.stringify(cssContent)});`,
                loader: 'js',
            };
        });
    },
} as BunPlugin;

