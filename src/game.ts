import { Card, cardToCode, randomCard } from './card.js';
import { Color, colorList, nonBlackColor } from './color.js';
import { last } from './helper.js';
import { Label, labelList, noPowerup } from './label.js';
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
export function currentPlayer(game: Game): Player {
	return game.players[game.currentPlayer];
}
export function nextTurn(game: Game): void {
	game.currentPlayer += 1 * game.direction;
	if (game.currentPlayer == game.players.length) {
		game.currentPlayer = 0;
	}
	if (game.currentPlayer < 0) {
		game.currentPlayer += game.players.length;
	}
}
export function pickUpCard(game: Game, pickingPlayerIndex: number): void {
	game.players[pickingPlayerIndex].push(randomCard(labelList, colorList));
}
export function canPlaceCard(
	game: Game,
	placingCard: Card,
	lastCard: Card,
): boolean {
	return (
		game.acceptingColors.includes(placingCard.color) ||
		lastCard.label == placingCard.label
	);
}
export function placeCard(
	game: Game,
	placingPlayerIndex: number,
	placingCardIndex: number,
): boolean {
	const lastCard = last(game.table);
	const placingCard = game.players[placingPlayerIndex][placingCardIndex];
	if (!canPlaceCard(game, placingCard, lastCard)) {
		return false;
	}
	game.table.push(placingCard);
	game.players[placingPlayerIndex].splice(placingCardIndex, 1);
	return true;
}
export function gameToString(game: Game): string {
	return JSON.stringify({
		players: game.players.map(playerToString),
		table: game.table.map(cardToCode),
	});
}
