import type {BunPlugin} from 'bun';
import fs from 'fs/promises';
import {addCSS} from '../../src/utils/addCSS';
import CleanCSS from 'clean-css';

const cleanCSS = new CleanCSS({});

export default {
    name: 'css-loader',
    setup(build) {
        build.onLoad({filter: /\.css$/}, async (args) => {
            const cssContent = await fs.readFile(args.path, 'utf-8');

            const css = cleanCSS.minify(cssContent);

            return {
                contents: `var addCSS = ${addCSS.toString()};addCSS(${JSON.stringify(css.styles)});`,
                loader: 'js',
            };
        });
    },
} as BunPlugin;
