import {addComment, getCommentToken} from '@api/addComment';
import type {Plugin} from '../types/plugin';
import {fetchAndDeleteForms} from '@api/fetchAndDeleteForms';

export default {
    name: 'AddConsoleApi',
    author: [],
    description: '콘솔에 유용한 함수를 추가합니다.',
    version: '1.0.0',
    paths: [
        {
            trigger(path) {
                return true;
            },
            handler() {
                class Api {
                    private url: string;
                    private token?: string;

                    constructor(url: string = window.location.href) {
                        this.url = url;
                    }

                    public async init() {
                        this.token = await getCommentToken(this.url);
                    }

                    public async addComment({message, following = true}: {message: string; following?: boolean}) {
                        if (!this.token) throw new Error('먼저 init를 해야 합니다.');

                        return await addComment(this.url, this.token, message, following);
                    }

                    public async removePage(url: string = window.location.href) {
                        await fetchAndDeleteForms(url);
                    }
                }

                // @ts-ignore
                window.CHESSCOM_API = Api;
            },
        },
    ],
} as Plugin;
