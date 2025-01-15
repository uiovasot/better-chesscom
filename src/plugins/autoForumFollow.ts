import {trackForum} from '@/api/trackForum';
import type {Plugin} from '../types/plugin';

export default {
    name: 'AutoForumFollow',
    author: [],
    description: 'Automatically follows forums you view.',
    version: '1.0.0',
    defaultDisabled: true,
    paths: [
        {
            trigger(path) {
                const isMatch = /^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(path);

                return isMatch;
            },
            async handler() {
                const forumIdEl = document.getElementById('follow-thread') as HTMLInputElement;

                if (!forumIdEl) return;

                if (forumIdEl.checked) return;

                const forumId = forumIdEl.getAttribute('data-forum-topic-id');

                await trackForum(forumId || '', true);

                forumIdEl.checked = true;
            },
        },
    ],
} as Plugin;
