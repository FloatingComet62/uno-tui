import { Card, cardToCode } from './card';
import { Color, colorList } from './color';
import { Label, labelList } from './label';

function random<T>(options: T[]): T {
    return options[Math.floor(Math.random() * options.length)];
}
function last<T>(array: T[]): T {
    return array[array.length - 1];
}

type Player = Card[];
type Game = {
    players: Player[];
    /// Cards placed
    table: Card[];
};
export function initGame(players: Player[]): Game {
    return {
        players,
        table: [randomCard(labelList.slice(0, labelList.length - 4), colorList.slice(0, colorList.length - 1))],
    };
}
export function pickUpCard(game: Game, pickingPlayerIndex: number): void {
    game.players[pickingPlayerIndex].push(randomCard(labelList, colorList));
}
export function placeCard(
    game: Game,
    placingPlayerIndex: number,
    placingCardIndex: number,
): boolean {
    const lastCard = last(game.table);
    const placingCard = game.players[placingPlayerIndex][placingCardIndex];
    if (
        lastCard.color != placingCard.color &&
        lastCard.label != placingCard.label
    ) {
        return false;
    }
    game.table.push(placingCard);
    game.players[placingPlayerIndex].splice(placingCardIndex, 1);
    return true;
}
export function createRandomPlayers(
    numberOfPlayers: number,
    numberOfCardsPerPerson: number,
): Player[] {
    return Array(numberOfPlayers)
        .fill(0)
        .map(() =>
            Array(numberOfCardsPerPerson)
                .fill(0)
                .map(() => randomCard(labelList, colorList)),
        );
}
export function randomCard(labelList: Label[], colorList: Color[]): Card {
    return {
        label: random(labelList),
        color: random(colorList),
    };
}
export function gameToString(game: Game): string {
    return JSON.stringify({
        players: game.players.map((player) =>
            player.map((card) => cardToCode(card)).join(' '),
        ),
        table: game.table.map((card) => cardToCode(card)),
    });
}
