export function processHTML(html: string) {
    const dom = document.createElement('body');

    dom.innerHTML = html;

    dom.querySelectorAll('[data-src]').forEach((img) => {
        img.setAttribute('src', img.getAttribute('data-src')!);
        img.removeAttribute('data-src');
    });

    return dom.innerHTML;
}
