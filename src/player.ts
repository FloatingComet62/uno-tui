import { Card, cardToCode, randomCard } from './card.js';
import { colorList } from './color.js';
import { labelList } from './label.js';

export type Player = Card[];
export function playerToString(player: Player): string {
	return player.map((card) => cardToCode(card)).join(' ');
}
export function createRandomPlayers(
	numberOfPlayers: number,
	numberOfCardsPerPerson: number,
): Player[] {
	const genPlayer = () =>
		Array(numberOfCardsPerPerson)
			.fill(0)
			.map(() => randomCard(labelList, colorList));
	return Array(numberOfPlayers).fill(0).map(genPlayer);
}
