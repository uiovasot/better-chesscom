export function getDisabledPluginsList() {
    const data = localStorage.getItem('DisabledPluginsV1');

    let list: {[key: string]: boolean} = {};

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
    const list = getDisabledPluginsList();

    list[name] = true;

    localStorage.setItem('DisabledPluginsV1', JSON.stringify(list));
}

export function activatePlugin(name: string) {
    const list = getDisabledPluginsList();

    list[name] = false;

    localStorage.setItem('DisabledPluginsV1', JSON.stringify(list));
}

export function getPluginSettings() {
    const data = localStorage.getItem('PluginSettingsV1');

    let settings: {[plugin: string]: {[setting: string]: string | boolean}} = {};

    if (data) {
        try {
            settings = JSON.parse(data);
        } catch (e) {
            console.error('Error parsing PluginSettings', e);
        }
    }

    return settings;
}

export function savePluginSetting(pluginName: string, settingKey: string, value: string | boolean) {
    const settings = getPluginSettings();
    
    if (!settings[pluginName]) {
        settings[pluginName] = {};
    }
    
    settings[pluginName][settingKey] = value;
    
    localStorage.setItem('PluginSettingsV1', JSON.stringify(settings));
}

export function getPluginSetting(pluginName: string, settingKey: string, defaultValue: string | boolean): string | boolean {
    const settings = getPluginSettings();
    return settings[pluginName]?.[settingKey] ?? defaultValue;
}
