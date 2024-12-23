import {Logger} from '../utils/logger';

export async function fetchAndDeleteForms(targetUrl: string) {
    try {
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        const forms = doc.querySelectorAll('form[action*="delete_comment"]');
        const deleteActions: {action: string; token: string}[] = [];

        forms.forEach((form) => {
            const action = form.getAttribute('action');
            if (!action || action.includes('delete_comment?all=1')) return;

            const tokenInput = form.querySelector('input[name="_token"]') as HTMLInputElement;
            const token = tokenInput ? tokenInput.value : null;

            if (action && token) {
                deleteActions.push({action, token});
            }
        });

        for (const {action, token} of deleteActions) {
            await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({_token: token}),
            });
            Logger.success(`Deleted: ${action}`);
        }

        return deleteActions;
    } catch (error) {
        Logger.error(error as string);
    }
}
