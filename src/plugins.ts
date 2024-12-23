import type {Plugin} from './types/plugin';

const exports: Plugin[] = [];
import Plugin0 from './plugins/autoRemove.ts';
exports.push(Plugin0 as Plugin);
import Plugin1 from './plugins/test.ts';
exports.push(Plugin1 as Plugin);

export default exports;