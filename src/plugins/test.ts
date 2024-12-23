import type {Plugin} from '../types/plugin';

export default {
    name: 'Test',
    author: [],
    description: 'Test',
    version: '1.0.0',
    paths: [
        {
            trigger(path) {
                return path.startsWith('/test');
            },
            handler() {},
        },
    ],
} as Plugin;
