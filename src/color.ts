export type Color = 'red' | 'yellow' | 'green' | 'blue' | 'black';
export function colorToCode(color: Color): string {
    if (color == 'black') {
        return 'k';
    }
    return color[0];
}
export function codeToColor(unknownCaseCode: string): Color | undefined {
    const code = unknownCaseCode.toLowerCase();
    if (code == 'r') {
        return 'red';
    }
    if (code == 'y') {
        return 'yellow';
    }
    if (code == 'g') {
        return 'green';
    }
    if (code == 'b') {
        return 'blue';
    }
    if (code == 'k') {
        return 'black';
    }
}
