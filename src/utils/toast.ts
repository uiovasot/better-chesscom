export function addToast(data: {type: 'success' | 'error' | 'info'; message: string}) {
    localStorage.setItem('toast', JSON.stringify(data));
}
