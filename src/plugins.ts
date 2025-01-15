import type {Plugin} from './types/plugin';

const exports: Plugin[] = [];
import Plugin0 from './plugins/addConsoleApi.ts';
exports.push(Plugin0 as Plugin);
import Plugin1 from './plugins/autoRemove.ts';
exports.push(Plugin1 as Plugin);
import Plugin2 from './plugins/accessAllEmotes.ts';
exports.push(Plugin2 as Plugin);
import Plugin3 from './plugins/messageLogger.ts';
exports.push(Plugin3 as Plugin);
import Plugin4 from './plugins/addSetting.ts';
exports.push(Plugin4 as Plugin);
import Plugin5 from './plugins/autoForumFollow.ts';
exports.push(Plugin5 as Plugin);

export default exports;