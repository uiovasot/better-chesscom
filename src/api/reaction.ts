import {token} from '@/data/csrfToken';
import {Logger} from '@/utils/logger';

export async function reaction(reactionToken: string, reaction: string, isDelete: boolean) {
    try {
        const response = await fetch(`/service/reactions/contents/${reactionToken}/reactions/${reaction}`, {
            headers: {
                accept: 'application/json',
                'accept-language': 'ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4',
                'cache-control': 'no-cache',
                'content-type': 'application/json',
                pragma: 'no-cache',
                priority: 'u=1, i',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
            },
            referrerPolicy: 'strict-origin-when-cross-origin',
            body: JSON.stringify({_token: token}),
            method: isDelete ? 'DELETE' : 'POST',
            mode: 'cors',
            credentials: 'include',
        });

        if ((!isDelete && response.status !== 201) || (isDelete && response.status !== 200)) throw new Error(`HTTP error!`);
    } catch (error) {
        Logger.error(error as string);
    }
}
