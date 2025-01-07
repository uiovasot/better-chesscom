import {addComment, getCommentToken} from '@api/addComment';
import type {Plugin} from '../types/plugin';
import {fetchAndDeleteForms} from '@api/fetchAndDeleteForms';

export default {
    name: 'AddConsoleApi',
    author: [],
    description: 'Adds useful functions to the console.',
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
                        if (!this.token) throw new Error('You need to init first.');

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
