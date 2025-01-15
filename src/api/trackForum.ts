import {token} from '@/data/csrfToken';

export async function trackForum(forumId: string, bool: boolean) {
    await fetch(`https://www.chess.com/callback/track-content/forum/${forumId}/${bool}`, {
        headers: {
            accept: 'application/json, text/plain, */*',
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
        body: `{"_token":"${token}"}`,
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    });
}
