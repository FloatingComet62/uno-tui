import {
	Label,
	blackCards,
	codeToLabel,
	colorCards,
	labelToCode,
	labelToReadable,
} from './label.js';
import { Color, codeToColor, colorToCode, colorToReadable } from './color.js';
import { random } from './helper.js';

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
		console.warn(`Failed to parse card: ${unknownCaseCode}`);
		return undefined;
	}
	return { label, color };
}
export function cardToCode(card: Card): string {
	return colorToCode(card.color) + labelToCode(card.label);
}
export function cardToReadable(card: Card): string {
	return `${colorToReadable(card.color)} ${labelToReadable(card.label)}`;
}
export function randomCard(labelList: Label[], colorList: Color[]): Card {
	let color = random(colorList);
	let validLabels = color == 'black' ? blackCards() : colorCards();
	let labels = validLabels.filter((validLabel) =>
		labelList.includes(validLabel),
	);

	return {
		color,
		label: random(labels),
	};
}
