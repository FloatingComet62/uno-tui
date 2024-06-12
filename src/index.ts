import inquirer from 'inquirer';
import { cardToReadable } from './card.js';
import {
	Game,
	canPlaceCard,
	currentPlayer,
	gameToString,
	initGame,
	nextTurn,
	pickUpCard,
	placeCard,
} from './game.js';
import { last } from './helper.js';
import { createRandomPlayers } from './player.js';
import { Color, nonBlackColor } from './color.js';

let game = initGame(createRandomPlayers(2, 3));
if (game == undefined) {
	process.exit(1);
}

console.log(gameToString(game));

async function playTurn(game: Game): Promise<boolean> {
	const cardOnTable = last(game.table);
	if (
		!currentPlayer(game).some((card) => canPlaceCard(game, card, cardOnTable))
	) {
		console.log('Cannot play any card, picking up card');
		pickUpCard(game, game.currentPlayer);
		console.log(`Picked up ${cardToReadable(last(currentPlayer(game)))}`);
		return false;
	}
	console.log(`Card on the table is: ${cardToReadable(cardOnTable)}`);
	const answer = (
		await inquirer.prompt([
			{
				name: 'res',
				message: `Choose card (Player: ${game.currentPlayer})`,
				type: 'list',
				choices: [
					...currentPlayer(game).map((card, index) => ({
						name: cardToReadable(card),
						value: index,
					})),
					{
						name: 'Pick up card',
						value: -1,
					},
				],
			},
		])
	).res as number;
	if (answer == -1) {
		pickUpCard(game, game.currentPlayer);
		console.log(`Picked up ${cardToReadable(last(currentPlayer(game)))}`);
		return false;
	}
	if (!placeCard(game, game.currentPlayer, answer)) {
		console.warn('Choose a valid card');
		return playTurn(game);
	}
	return true;
}

async function main(game: Game) {
	while (true) {
		if (await playTurn(game)) {
			const placedCard = last(game.table);
			if (placedCard.color == 'black') {
				const answer = (
					await inquirer.prompt([
						{
							name: 'res',
							message: `Choose color (Player: ${game.currentPlayer})`,
							type: 'list',
							choices: nonBlackColor(),
						},
					])
				).res as Color;
				game.acceptingColors[1] = answer;
			}
			if (placedCard.label == '+2') {
				nextTurn(game);
				pickUpCard(game, game.currentPlayer);
				pickUpCard(game, game.currentPlayer);
			} else if (placedCard.label == '+4') {
				nextTurn(game);
				for (let _ = 0; _ < 4; _++) {
					pickUpCard(game, game.currentPlayer);
				}
			} else if (placedCard.label == 'Skip') {
				nextTurn(game);
				nextTurn(game);
			} else if (placedCard.label == 'Reverse') {
				game.direction *= -1;
				nextTurn(game);
			}
		} else {
			nextTurn(game);
		}
	}
}

main(game).then(() => {
	console.log(gameToString(game));
});
