import {Forum} from '@/parse/forum';
import type {Plugin} from '../types/plugin';
import {htmlEncode} from '@/utils/htmlEncode';
import {clearIndexedDB} from '@/utils/indexedDB';
import {Toast} from '@/components/toast';
import {getPluginSetting} from '@/utils/plugin';

export default {
    name: 'MessageLogger',
    author: [],
    description: 'Message logger.',
    version: '1.0.0',
    settings: {
        removeHistory: {
            type: 'button',
            label: 'Clear',
            onClick: async () => {
                await clearIndexedDB('ForumCommentsDB', 'comments');

                const toast = new Toast('All message history has been deleted!', 'success');

                toast.show();
            },
        },
        showRevisionHistory: {
            type: 'switch',
            label: 'Show revision history',
            default: false,
            description: 'Show revision history of messages. This feature has many bugs so we do not recommend using it.',
        },
    },
    paths: [
        {
            trigger(path) {
                const isMatch = /^(\/[a-z]{2})?\/clubs\/forum\/view\//.test(path);

                return isMatch;
            },
            async handler(path) {
                const pathParts = path.split('/');
                const id = pathParts[pathParts.length - 1].split(/[?#]/)[0];

                const rootElement = document.querySelector('.forums-single-list') as HTMLElement;
                const forum = new Forum(id);

                await forum.parseAndUpdateComments(rootElement);

                const showRevisionHistory = getPluginSetting('MessageLogger', 'showRevisionHistory', false) as boolean;

                // @ts-ignore
                window.forum = forum;

                const nonDeletedComments: HTMLElement[] = [];

                forum.allComments.forEach((comment) => {
                    const commentElement = rootElement.querySelector(`#comment-${comment.id}`) as HTMLElement;

                    if (comment.deleted) {
                        const deletedCommentElement = document.createElement('div');
                        deletedCommentElement.id = `comment-${comment.id}`;
                        deletedCommentElement.className = 'comment-post-component vote-parent';
                        deletedCommentElement.style.opacity = '1';
                        deletedCommentElement.style.fontStyle = 'italic';

                        const user = document.createElement('a');
                        user.className = 'post-view-meta-avatar comment-post-avatar';
                        user.style.width = '5rem';
                        user.style.height = '5rem';
                        user.href = `https://www.chess.com/member/${encodeURIComponent(comment.username)}`;
                        user.title = comment.username;
                        user.setAttribute('data-has-user-popover', 'true');
                        user.setAttribute('v-user-popover', `"{&quot;username&quot;:&quot;${htmlEncode(comment.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`);

                        const avatar = document.createElement('img');
                        avatar.className = 'post-view-meta-image';
                        avatar.alt = comment.username;
                        avatar.src = comment.avatarUrl;

                        user.appendChild(avatar);

                        deletedCommentElement.appendChild(user);

                        const meta = document.createElement('div');
                        meta.className = 'comment-post-meta';

                        const userTagline = document.createElement('div');
                        userTagline.className = 'user-tagline-component';
                        userTagline.setAttribute('data-username', comment.username);
                        userTagline.setAttribute('data-visibility-policy', '0');

                        const username = document.createElement('a');
                        username.className = 'user-username-component user-username-link user-tagline-username user-username-blue-with-dark-mode';
                        username.href = `https://www.chess.com/member/${encodeURIComponent(comment.username)}`;
                        username.innerText = comment.username;
                        user.setAttribute('data-has-user-popover', 'true');
                        user.setAttribute('v-user-popover', `"{&quot;username&quot;:&quot;${htmlEncode(comment.username)}&quot;,&quot;location&quot;:&quot;forums&quot;}"`);

                        userTagline.appendChild(username);

                        meta.appendChild(userTagline);

                        const actions = document.createElement('div');
                        actions.className = 'comment-post-actions-component';
                        actions.id = comment.id;

                        const time = document.createElement('span');
                        time.className = 'comment-post-actions-time';

                        const timespan = document.createElement('span');
                        timespan.title = comment.timestamp;
                        timespan.innerText = comment.timestamp;

                        time.appendChild(timespan);

                        actions.appendChild(time);

                        const number = document.createElement('span');
                        number.className = 'comment-post-actions-number';
                        number.innerText = 'deleted';

                        actions.appendChild(number);

                        meta.appendChild(actions);

                        deletedCommentElement.appendChild(meta);

                        const body = document.createElement('div');
                        body.className = 'comment-post-body-component comment-post-body';
                        body.innerHTML = comment.content;
                        deletedCommentElement.appendChild(body);

                        const lastNonDeletedComment = nonDeletedComments[nonDeletedComments.length - 1];
                        if (lastNonDeletedComment) {
                            lastNonDeletedComment.parentNode?.insertBefore(deletedCommentElement, lastNonDeletedComment.nextSibling);
                        }

                        nonDeletedComments.push(deletedCommentElement);
                    } else {
                        if (commentElement) {
                            nonDeletedComments.push(commentElement);
                        }
                    }

                    if (comment.versions.length > 0 && !comment.deleted && showRevisionHistory) {
                        const body = commentElement.querySelector('.comment-post-body') as HTMLElement;
                        if (body) {
                            comment.versions.forEach((version) => {
                                const br = document.createElement('br');
                                body.appendChild(br);

                                const editedText = document.createElement('span');
                                editedText.style.color = '#666';
                                editedText.style.marginLeft = '5px';
                                editedText.textContent = '(edited)';
                                body.appendChild(editedText);

                                const revision = document.createElement('div');
                                revision.style.fontSize = '12px';
                                revision.style.color = '#666';
                                revision.style.marginTop = '5px';
                                revision.innerHTML = version;

                                body.appendChild(revision);
                            });
                        }
                    }
                });

                forum.log();
            },
        },
    ],
} as Plugin;
