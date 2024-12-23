export function addCSS(css: string) {
    const style = document.createElement('style');
    style.innerHTML = css;

    document.head.append(style);
}
