import { Label, codeToLabel, labelToCode } from './label';
import { Color, codeToColor, colorToCode } from './color';

export type Card = {
	label: Label;
	color: Color;
};
export function initCard(label: Label, color: Color): Card {
	return { label, color };
}
export function codeToCard(unknownCaseCode: string): Card | undefined {
	const code = unknownCaseCode.toLowerCase();
	let color = codeToColor(code[0]);
	let label = codeToLabel(code.slice(1));
	if (color == undefined || label == undefined) {
		return undefined;
	}
	return { label, color };
}
export function cardToCode(card: Card): string {
	return colorToCode(card.color) + labelToCode(card.label);
}
