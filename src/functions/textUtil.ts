
export function truncateStringWithEllipsis(str: string, length: number, ellipsis: string = "..."): string {
    if (str.length <= length) return str;

    return str.substring(0, length-ellipsis.length).concat(ellipsis);
}
