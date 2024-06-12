import { Card, cardToCode } from "./card";

export type Player = Card[];
export function playerToString(player: Player): string {
    return player.map((card) => cardToCode(card)).join(' ');
}
