export type Label =
    | '0'
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '+2'
    | '+4'
    | 'Reverse'
    | 'Skip';
export function labelToCode(label: Label): string {
    if (label == 'Reverse') {
        return 'r';
    }
    if (label == 'Skip') {
        return 's';
    }
    return label;
}
export function codeToLabel(unknownCaseCode: string): Label | undefined {
    const code = unknownCaseCode.toLowerCase();
    if (code == 'r') {
        return 'Reverse';
    }
    if (code == 's') {
        return 'Skip';
    }
    if (
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+2', '+4'].includes(
            code,
        )
    ) {
        return code as Label;
    }
}
