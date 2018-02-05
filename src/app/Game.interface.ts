import {Player} from './Player.interface';

export interface Game {
    player1: Player;
    player2 ?: Player;
    player3 ?: Player;
    player4 ?: Player;
}
