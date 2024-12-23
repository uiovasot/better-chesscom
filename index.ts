import plugins from './src/plugins';
import {Logger} from './src/utils/logger';
import {Toast} from './src/components/toast';

function run() {
    if (!window.location.host.endsWith('chess.com')) return;

    const toastData = localStorage.getItem('toast');
    if (toastData) {
        try {
            const data: {type: 'success' | 'error' | 'info'; message: string} = JSON.parse(toastData);

            const toast = new Toast(data.message, data.type);

            toast.show();

            localStorage.setItem('toast', '');
        } catch (err) {
            Logger.error(err as string);
        }
    }

    for (const plugin of plugins) {
        for (const {trigger, handler} of plugin.paths) {
            if (trigger(window.location.pathname)) {
                handler(window.location.pathname);
            }
        }
    }
}

run();