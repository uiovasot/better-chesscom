export function getDisabledPluginsList() {
    const data = localStorage.getItem('DisabledPlugins');

    let list: string[] = [];

    if (data) {
        try {
            list = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing DisabledPlugins', e);
        }
    }

    return list;
}

export function disablePlugin(name: string) {
    const data = localStorage.getItem('DisabledPlugins');

    const list = getDisabledPluginsList();

    list.push(name);

    localStorage.setItem('DisabledPlugins', JSON.stringify(list));
}

export function activatePlugin(name: string) {
    const data = localStorage.getItem('DisabledPlugins');

    const list = getDisabledPluginsList().filter((n) => n !== name);

    localStorage.setItem('DisabledPlugins', JSON.stringify(list));
}
