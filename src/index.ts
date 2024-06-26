import inquirer, { QuestionCollection } from 'inquirer';
import { Card, cardToReadable } from './card.js';
import {
	Game,
	canPlaceCard,
	currentPlayer,
	initGame,
	nextTurn,
	pickUpCard,
	placeCard,
} from './game.js';
import { last } from './helper.js';
import { Player, createRandomPlayers } from './player.js';
import { Color, nonBlackColor } from './color.js';

let game = initGame(createRandomPlayers(2, 3));
if (game == undefined) {
	process.exit(1);
}

async function playTurn(game: Game, alreadyPicked = false): Promise<boolean> {
	const cardOnTable = last(game.table);
	const canPlay = currentPlayer(game).some((card) =>
		canPlaceCard(game.acceptingColors, card, cardOnTable),
	);
	if (alreadyPicked && !canPlay) {
		return false;
	}
	if (!canPlay) {
		let card = cardToReadable(pickUpCard(game)[0]);
		console.log(`Player ${game.currentPlayer} picked up ${card}`);
		return await playTurn(game, true);
	}
	console.log(`Card on the table is: ${cardToReadable(cardOnTable)}`);
	const choices = [
		...currentPlayer(game).map((card, index) => ({
			name: cardToReadable(card),
			value: index,
		})),
		{
			name: 'Pick up card',
			value: -1,
		},
	];
	const prompt: QuestionCollection<any> = [{
		name: 'res',
		message: `Choose card (Player: ${game.currentPlayer})`,
		type: 'list',
		choices,
	}];
	const answer = (await inquirer.prompt(prompt)).res as number;
	if (answer == -1) {
		let card = cardToReadable(pickUpCard(game)[0]);
		console.log(`Player ${game.currentPlayer} picked up ${card}`);
		return await playTurn(game, true);
	}
	if (!placeCard(game, game.currentPlayer, answer)) {
		console.warn('Choose a valid card');
		return playTurn(game);
	}
	return true;
}

async function handleSpecialEvents(game: Game, placedCard: Card) {
	game.acceptingColors[1] = placedCard.color;
	if (placedCard.color == 'black') {
		const prompt: QuestionCollection<any> = [{
			name: 'res',
			message: `Choose color (Player: ${game.currentPlayer})`,
			type: 'list',
			choices: nonBlackColor(),
		}];
		const answer = (await inquirer.prompt(prompt)).res as Color;
		game.acceptingColors[1] = answer;
	}
	if (placedCard.label == 'Reverse') {
		game.direction *= -1;
		nextTurn(game);
	} else {
		nextTurn(game);
		if (placedCard.label == '+2') {
			pickUpCard(game, 2);
		} else if (placedCard.label == '+4') {
			pickUpCard(game, 4);
		} else if (placedCard.label == 'Skip') {
			nextTurn(game);
		}
	}
}

function checkForWinner(players: Player[]): boolean {
	for (let i = 0; i < players.length; i++) {
		const player = players[i];
		if (player.length == 0) {
			console.log(`Player ${i} won!`);
			return true;
		}
	}
	return false;
}

async function main(game: Game) {
	while (true) {
		if (await playTurn(game)) {
			await handleSpecialEvents(game, last(game.table));
		} else {
			nextTurn(game);
		}
		if (checkForWinner(game.players)) {
			return;
		}
	}
}

main(game);
