import {Injectable, OnInit} from '@angular/core';
import {Player} from '../Player.interface';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from 'angularfire2/firestore';
import {GameService} from './game.service';

@Injectable()

export class PlayersService {

    private _players: Player[] = [];
    private _player: Player;


    constructor(private _game: GameService) {

    }


    get players(): Player[] {
        if (!this._players || this._players.length === 0){

        }
    }

    private _setPlayers(value: Player[]){

    }


}
