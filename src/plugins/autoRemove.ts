import {fetchAndDeleteForms} from '../api/fetchAndDeleteForms';
import {Modal} from '../components/modal';
import type {Plugin} from '../types/plugin';
import {addToast} from '../utils/toast';
import '@css/removePageComponent.css';

export default {
    name: 'AutoRemoveComments',
    author: [],
    description: 'Automatically deletes comments on that page.',
    version: '1.0.0',
    paths: [
        {
            trigger(path) {
                const isMatch = /^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(path);

                return isMatch;
            },
            handler() {
                const wrap = document.createElement('div');
                wrap.className = 'remove-page-component';
                const button = document.createElement('button');
                button.className = 'ui_pagination-item-component';
                button.innerText = 'Delete page';

                button.onclick = () => {
                    const modal = new Modal('Are you sure you want to delete this page?', async () => {
                        await fetchAndDeleteForms(window.location.href);

                        addToast({
                            type: 'success',
                            message: 'Page deletion has been completed.',
                        });

                        history.go(0);
                    });

                    modal.open();
                };

                wrap.appendChild(button);

                const targetElement = document.querySelector('.forums-single-sharing.forums-single-sharing-transparent') as HTMLDivElement;
                targetElement.parentNode!.insertBefore(wrap, targetElement);
            },
        },
    ],
} as Plugin;
