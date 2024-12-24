import {fetchAndDeleteForms} from '../api/fetchAndDeleteForms';
import {Modal} from '../components/modal';
import type {Plugin} from '../types/plugin';
import {addToast} from '../utils/toast';
import '@css/removePageComponent.css';

export default {
    name: 'AutoRemoveComments',
    author: [],
    description: '자동으로 댓글을 지워줍니다.',
    version: '1.0.0',
    paths: [
        {
            trigger(path) {
                return path.startsWith('/clubs/forum/view/');
            },
            handler() {
                const wrap = document.createElement('div');
                wrap.className = 'remove-page-component';
                const button = document.createElement('button');
                button.className = 'ui_pagination-item-component';
                button.innerText = '페이지 삭제하기';

                button.onclick = () => {
                    const modal = new Modal('이 페이지를 정말로 삭제할까요?', async () => {
                        await fetchAndDeleteForms(window.location.href);

                        addToast({
                            type: 'success',
                            message: '페이지 삭제가 완료되었습니다.',
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
