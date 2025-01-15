import {activatePlugin, disablePlugin, getDisabledPluginsList, savePluginSetting, getPluginSetting} from '@/utils/plugin';
import plugins from '../plugins';
import type {Plugin} from '../types/plugin';
import {Tooltip} from '@/components/tooltip';
import '@/css/setting.css';

export default {
    name: '[System] AddSetting',
    author: [],
    description: 'Add settings.',
    version: '1.0.0',
    system: true,
    paths: [
        {
            trigger(path) {
                return path.startsWith('/settings');
            },
            handler() {
                const board = document.querySelector('a[href="https://www.chess.com/settings/board"].settings-menu-link') as HTMLAnchorElement;

                const anchorElement = document.createElement('a');
                anchorElement.href = '#';
                anchorElement.className = 'settings-menu-link';

                const iconSpan = document.createElement('span');
                iconSpan.setAttribute('aria-hidden', 'true');
                iconSpan.className = 'icon-font-chess circle-gearwheel settings-icon';

                const textSpan = document.createElement('span');
                textSpan.className = 'settings-link-name';
                textSpan.textContent = 'Better Chess.com';

                anchorElement.appendChild(iconSpan);
                anchorElement.appendChild(textSpan);

                board.parentNode!.insertBefore(anchorElement, board);

                anchorElement.addEventListener('click', () => {
                    const activeElements = document.querySelectorAll('.settings-menu-link-active');

                    activeElements.forEach((element) => {
                        element.classList.remove('settings-menu-link-active');
                    });

                    anchorElement.classList.add('settings-menu-link-active');

                    const wrap = document.querySelector('.layout-column-two') as HTMLDivElement;

                    while (wrap.firstChild) {
                        wrap.firstChild.remove();
                    }

                    const sectionWrap = document.createElement('div');
                    sectionWrap.className = 'v5-section';

                    const section = document.createElement('div');
                    section.className = 'v5-section-content';

                    const title = document.createElement('h1');
                    title.className = 'settings-category-title';
                    title.textContent = 'Better Chess.com';

                    section.appendChild(title);

                    const activationForm = document.createElement('div');
                    activationForm.className = 'settings-short-form';

                    const disabledPluginsList = getDisabledPluginsList();

                    for (const plugin of plugins) {
                        const disabled = disabledPluginsList[plugin.name] === true || (disabledPluginsList[plugin.name] === undefined && plugin.defaultDisabled);

                        const formGroupDiv = document.createElement('div');
                        formGroupDiv.className = 'settings-form-group settings-form-switch-group';

                        const label = document.createElement('label');
                        label.setAttribute('for', 'setting_' + plugin.name);
                        label.className = 'settings-label-text flex-row';
                        label.textContent = plugin.name;

                        if (plugin.description) {
                            const tooltipTrigger = document.createElement('span');
                            tooltipTrigger.className = 'icon-font-chess circle-question settings-question-icon';

                            new Tooltip(tooltipTrigger, plugin.description);

                            label.appendChild(tooltipTrigger);
                        }

                        const toggleSwitchDiv = document.createElement('div');
                        toggleSwitchDiv.className = 'settings-toggle-switch';

                        const switchComponentDiv = document.createElement('div');
                        switchComponentDiv.className = 'cc-switch-component cc-switch-large';

                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.className = 'cc-switch-checkbox';
                        checkbox.id = 'setting_' + plugin.name;
                        checkbox.required = true;
                        checkbox.disabled = plugin.system || false;
                        checkbox.setAttribute('size', 'large');
                        checkbox.setAttribute('isswitch', 'isSwitch');
                        checkbox.checked = !disabled;

                        checkbox.addEventListener('change', () => {
                            if (disabled) {
                                activatePlugin(plugin.name);
                            } else {
                                disablePlugin(plugin.name);
                            }
                        });

                        const switchLabel = document.createElement('label');
                        switchLabel.className = 'cc-switch-label';
                        switchLabel.setAttribute('for', 'setting_' + plugin.name);

                        const switchButtonDiv = document.createElement('div');
                        switchButtonDiv.className = 'cc-switch-button';

                        switchLabel.appendChild(switchButtonDiv);
                        switchComponentDiv.appendChild(checkbox);
                        switchComponentDiv.appendChild(switchLabel);
                        toggleSwitchDiv.appendChild(switchComponentDiv);
                        formGroupDiv.appendChild(label);
                        formGroupDiv.appendChild(toggleSwitchDiv);

                        activationForm.appendChild(formGroupDiv);
                    }

                    section.appendChild(activationForm);

                    const divider = document.createElement('hr');
                    divider.className = 'settings-divider';
                    section.appendChild(divider);

                    for (const plugin of plugins) {
                        const disabled = disabledPluginsList[plugin.name] === true || (disabledPluginsList[plugin.name] === undefined && plugin.defaultDisabled);

                        if (plugin.settings && Object.keys(plugin.settings).length > 0 && !disabled) {
                            const pluginSettingsTitle = document.createElement('h2');
                            pluginSettingsTitle.className = 'settings-category-subtitle';
                            pluginSettingsTitle.textContent = plugin.name;
                            section.appendChild(pluginSettingsTitle);

                            const settingsForm = document.createElement('div');
                            settingsForm.className = 'settings-short-form';
                            Object.entries(plugin.settings).forEach(([key, setting]) => {
                                const settingGroupDiv = document.createElement('div');
                                settingGroupDiv.className = 'settings-form-group';

                                const settingLabel = document.createElement('label');
                                settingLabel.setAttribute('for', `setting_${plugin.name}_${key}`);
                                settingLabel.className = 'settings-label-text flex-row';
                                settingLabel.textContent = setting.label;

                                if (setting.description) {
                                    const tooltipTrigger = document.createElement('span');
                                    tooltipTrigger.className = 'icon-font-chess circle-question settings-question-icon';
                                    new Tooltip(tooltipTrigger, setting.description);
                                    settingLabel.appendChild(tooltipTrigger);
                                }

                                settingGroupDiv.appendChild(settingLabel);

                                switch (setting.type) {
                                    case 'switch': {
                                        const toggleDiv = document.createElement('div');
                                        toggleDiv.className = 'settings-toggle-switch';

                                        const switchDiv = document.createElement('div');
                                        switchDiv.className = 'cc-switch-component cc-switch-large';

                                        const switchInput = document.createElement('input');
                                        switchInput.type = 'checkbox';
                                        switchInput.className = 'cc-switch-checkbox';
                                        switchInput.id = `setting_${plugin.name}_${key}`;
                                        switchInput.checked = getPluginSetting(plugin.name, key, setting.defaultValue || false) as boolean;
                                        switchInput.setAttribute('size', 'large');
                                        switchInput.setAttribute('isswitch', 'isSwitch');

                                        switchInput.addEventListener('change', () => {
                                            savePluginSetting(plugin.name, key, switchInput.checked);
                                        });

                                        const switchLabel = document.createElement('label');
                                        switchLabel.className = 'cc-switch-label';
                                        switchLabel.setAttribute('for', `setting_${plugin.name}_${key}`);

                                        const switchButton = document.createElement('div');
                                        switchButton.className = 'cc-switch-button';

                                        switchLabel.appendChild(switchButton);
                                        switchDiv.appendChild(switchInput);
                                        switchDiv.appendChild(switchLabel);
                                        toggleDiv.appendChild(switchDiv);
                                        settingGroupDiv.appendChild(toggleDiv);

                                        break;
                                    }

                                    case 'text': {
                                        const input = document.createElement('input');
                                        input.type = 'text';
                                        input.className = 'ui_v5-input-component';
                                        input.id = `setting_${plugin.name}_${key}`;
                                        input.value = getPluginSetting(plugin.name, key, setting.defaultValue || '') as string;

                                        input.addEventListener('change', () => {
                                            savePluginSetting(plugin.name, key, input.value);
                                        });

                                        settingGroupDiv.appendChild(input);

                                        break;
                                    }

                                    case 'button': {
                                        const button = document.createElement('button');
                                        button.className = 'ui_v5-button-component ui_v5-button-basic ui_setting_bc_button';
                                        button.id = `setting_${plugin.name}_${key}`;

                                        button.textContent = setting.label;

                                        if (setting.onClick) {
                                            button.addEventListener('click', setting.onClick);
                                        }

                                        settingGroupDiv.appendChild(button);

                                        break;
                                    }
                                }

                                settingsForm.appendChild(settingGroupDiv);
                            });

                            section.appendChild(settingsForm);
                        }
                    }

                    sectionWrap.appendChild(section);
                    wrap.appendChild(sectionWrap);
                });
            },
        },
    ],
} as Plugin;
