export function htmlEncode(input: string): string {
    const map: {[key: string]: string} = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#47;',
    };

    return input.replace(/[&<>"'/]/g, (char) => map[char]);
}
