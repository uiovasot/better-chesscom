import {Logger} from '../utils/logger';

export async function getCommentToken(targetUrl: string) {
    try {
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const token = doc.querySelector('input[name="forum_topic_comment[_token]"]')?.getAttribute('value');

        if (!token) throw new Error(`토큰을 찾지 못했습니다.`);

        return token;
    } catch (error) {
        Logger.error(error as string);
    }
}

export async function addComment(targetUrl: string, token: string, msg: string, following: boolean = true) {
    try {
        const response = await fetch(targetUrl + '&newCommentCount=1', {
            headers: {
                accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
                'accept-language': 'ko,ko-KR;q=0.9,en-ER;q=0.8,en-US;q=0.7,en;q=0.6,la;q=0.5,de;q=0.4',
                'cache-control': 'max-age=0',
                'content-type': 'application/x-www-form-urlencoded',
                priority: 'u=0, i',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-user': '?1',
                'upgrade-insecure-requests': '1',
            },
            referrer: targetUrl + '&newCommentCount=1',
            referrerPolicy: 'strict-origin-when-cross-origin',
            body:
                'mce_0=%3Cp%3E' +
                encodeURIComponent(msg) +
                '%3C%2Fp%3E&forum_topic_comment%5Bbody%5D=%3Cp%3E' +
                encodeURIComponent(msg) +
                '%3C%2Fp%3E&forum_topic_comment%5B_token%5D=' +
                token +
                '&Post=&following=' +
                (following ? 'on' : 'off'),
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
        });
        Logger.success(`Add comment: ${msg}`);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
        Logger.error(error as string);
    }
}
