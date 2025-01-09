export let token: string = '';

// @ts-ignore
token = window.context?.csrf?.token;
