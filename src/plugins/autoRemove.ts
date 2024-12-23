import {fetchAndDeleteForms} from '../api/fetchAndDeleteForms';
import {Modal} from '../components/modal';
import type {Plugin} from '../types/plugin';
import {addCSS} from '../utils/addCSS';
import {addToast} from '../utils/toast';

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
                addCSS(`
                    .forums-single-sort-pagination-wrap {
                        flex-direction: row;
                    }

                    .remove-page-component {
                        color: var(--color-text-default);
                        cursor: pointer;
                    }
                        
                    .remove-page-component:hover {
                        color: var(--color-text-default-hovered)
                    }`);

                const wrap = document.querySelector('.forums-single-sort-pagination-wrap') as HTMLDivElement;
                const button = document.createElement('span');
                button.className = 'remove-page-component';
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
            },
        },
    ],
} as Plugin;
