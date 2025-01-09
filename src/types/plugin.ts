export type PluginSettingType = 'switch' | 'text' | 'button';

export interface PluginSetting {
    type: PluginSettingType;
    label: string;
    description?: string;
    defaultValue?: string | boolean;
    onClick?: () => void;
}

export interface Plugin {
    name: string;
    author: {name: string; id: string}[];
    description: string;
    version: string;
    system?: boolean;
    defaultDisabled?: boolean;
    settings?: {[key: string]: PluginSetting};
    paths: {
        trigger: (path: string) => boolean;
        handler: (path: string) => void;
    }[];
}
