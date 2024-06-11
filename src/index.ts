import {
	createRandomPlayers,
	gameToString,
	initGame,
	pickUpCard,
	placeCard,
} from './game';

let game = initGame(createRandomPlayers(2, 5));
pickUpCard(game, 0);
pickUpCard(game, 0);
pickUpCard(game, 1);
pickUpCard(game, 0);

console.log(gameToString(game));

console.log(placeCard(game, 0, 1));
console.log(placeCard(game, 0, 1));
console.log(placeCard(game, 0, 1));

console.log(gameToString(game));
