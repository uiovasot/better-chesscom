import type {Plugin} from '@/types/plugin';
import '@/css/emote.css';
import {reaction} from '@/api/reaction';

export default {
    name: 'AccessAllEmotes',
    author: [],
    description: 'Allows you to use emotes that are only available with a membership in the forums!',
    version: '1.0.0',
    paths: [
        {
            trigger(path) {
                const isMatch = /^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(path);

                return isMatch;
            },
            async handler(path) {
                const res = await fetch(window.location.href);

                const html = await res.text();

                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                const rootElement = doc.querySelector('.forums-single-list')!;

                const commentElements = rootElement.querySelectorAll('.comment-post-component');
                const comments = new Map<String, string>();

                commentElements.forEach((element) => {
                    const id = element.id;
                    const reactionToken = element.querySelector<HTMLElement>('.reactions-multiple-contents')?.getAttribute('data-content-id') || '';

                    comments.set(id, reactionToken);
                });

                const observer = new MutationObserver((mutationsList, observer) => {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'childList') {
                            mutation.addedNodes.forEach((node) => {
                                if (node.nodeType === 1 && (node as HTMLElement).classList.contains('emotes-body')) {
                                    const emotes = node as HTMLElement;
                                    const comment = emotes.parentElement!.parentElement!.parentElement!.parentElement!.parentElement!.id;

                                    emotes.querySelectorAll<HTMLElement>('.emotes-disabledIcons').forEach((section) => {
                                        section.querySelector<HTMLElement>('.emotes-disabledOverlay')?.remove();

                                        section.querySelectorAll<HTMLElement>('span').forEach((child) => {
                                            child.classList.add('emotes-button');

                                            let name: string = '';
                                            child.classList.forEach((className) => {
                                                if (className.startsWith('emotes-emoticon-select-')) {
                                                    name = className.replace('emotes-emoticon-select-', '');
                                                }
                                            });

                                            child.addEventListener('click', async () => {
                                                const token = comments.get(comment)!;

                                                await reaction(token, name, false);
                                            });
                                        });
                                    });
                                }
                            });
                        }
                    }
                });

                const config = {childList: true, subtree: true};

                observer.observe(document.body, config);
            },
        },
    ],
} as Plugin;
