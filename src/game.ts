import { Card, cardToCode, randomCard } from './card.js';
import { Color, colorList, nonBlackColor } from './color.js';
import { last } from './helper.js';
import { labelList, noPowerup } from './label.js';
import { Player, playerToString } from './player.js';

export type Game = {
	players: Player[];
	/// Cards placed
	table: Card[];

	currentPlayer: number;
	direction: number;
	acceptingColors: Color[];
};
export function initGame(players: Player[]): Game | undefined {
	if (players.length < 2) {
		console.warn('A game needs atleast 2 players');
		return undefined;
	}
	let card = randomCard(noPowerup(), nonBlackColor());
	return {
		players,
		table: [card],
		currentPlayer: 0,
		direction: 1,
		acceptingColors: ['black', card.color],
	};
}
export function currentPlayer({ players, currentPlayer }: Game): Player {
	return players[currentPlayer];
}
export function nextTurn({ currentPlayer, direction, players }: Game): void {
	currentPlayer += direction;
	if (currentPlayer == players.length) {
		currentPlayer = 0;
	}
	if (currentPlayer < 0) {
		currentPlayer += players.length;
	}
}
export function pickUpCard(
	{ players, currentPlayer }: Game,
	times = 1,
): Card[] {
	return Array(times)
		.fill(0)
		.map(() => {
			let card = randomCard(labelList, colorList);
			players[currentPlayer].push(card);
			return card;
		});
}
export function canPlaceCard(
	acceptingColors: Color[],
	placingCard: Card,
	lastCard: Card,
): boolean {
	return (
		acceptingColors.includes(placingCard.color) ||
		lastCard.label == placingCard.label
	);
}
export function placeCard(
	{ table, players, acceptingColors }: Game,
	placingPlayerIndex: number,
	placingCardIndex: number,
): boolean {
	const lastCard = last(table);
	const placingCard = players[placingPlayerIndex][placingCardIndex];
	if (!canPlaceCard(acceptingColors, placingCard, lastCard)) {
		return false;
	}
	table.push(placingCard);
	players[placingPlayerIndex].splice(placingCardIndex, 1);
	return true;
}
export function gameToString({
	players,
	table,
	currentPlayer,
	acceptingColors,
}: Game): string {
	return JSON.stringify({
		players: players.map(playerToString),
		table: table.map(cardToCode),
		currentPlayer,
		acceptingColors,
	});
}
