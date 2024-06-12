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
	| 'Skip'
	| 'Wild';
export const labelList: Label[] = [
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'+2',
	'Skip',
	'Reverse',
	// Black cards below
	'+4',
	'Wild',
];
export function colorCards(): Label[] {
	return labelList.slice(0, labelList.length - 2);
}
export function blackCards(): Label[] {
	return labelList.slice(13);
}
export function noPowerup(): Label[] {
	return labelList.slice(0, labelList.length - 5);
}
export function codeToLabel(unknownCaseCode: string): Label | undefined {
	const code = unknownCaseCode.toLowerCase();
	if (code == 'r') {
		return 'Reverse';
	}
	if (code == 's') {
		return 'Skip';
	}
	if (code == 'w') {
		return 'Wild';
	}
	if (
		['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '+2', '+4'].includes(
			code,
		)
	) {
		return code as Label;
	}
	console.warn(`Failed to parse color: ${unknownCaseCode}`);
}
export function labelToCode(label: Label): string {
	if (label == 'Reverse') {
		return 'r';
	}
	if (label == 'Skip') {
		return 's';
	}
	if (label == 'Wild') {
		return 'w';
	}
	return label;
}
export function labelToReadable(label: Label): string {
	return label;
}
