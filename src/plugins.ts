import type {Plugin} from './types/plugin';

const exports: Plugin[] = [];
import Plugin0 from './plugins/addConsoleApi.ts';
exports.push(Plugin0 as Plugin);
import Plugin1 from './plugins/autoRemove.ts';
exports.push(Plugin1 as Plugin);
import Plugin2 from './plugins/addSetting.ts';
exports.push(Plugin2 as Plugin);

export default exports;