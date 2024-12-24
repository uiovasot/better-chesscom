import {activatePlugin, disablePlugin, getDisabledPluginsList} from '@utils/plugin';
import plugins from '../plugins';
import type {Plugin} from '../types/plugin';
import {Tooltip} from '@components/tooltip';
import '@css/setting.css';

export default {
    name: 'AddSetting',
    author: [],
    description: '설정을 추가합니다.',
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

                    const form = document.createElement('div');
                    form.className = 'settings-short-form';

                    const disabledPluginsList = getDisabledPluginsList();

                    for (const plugin of plugins) {
                        const disabled = disabledPluginsList.includes(plugin.name);

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

                        form.appendChild(formGroupDiv);
                    }

                    section.appendChild(form);

                    sectionWrap.appendChild(section);
                    wrap.appendChild(sectionWrap);
                });
            },
        },
    ],
} as Plugin;
