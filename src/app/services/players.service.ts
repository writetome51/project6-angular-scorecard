import {Injectable, OnInit} from '@angular/core';
import {Player} from '../Player.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {GameService} from './game.service';

@Injectable()

export class PlayersService {

  //  private _players: Player[] = [];
   // private _player: Player;
    private _gameObservable;


    constructor(private _game: GameService) {
        this._gameObservable  = this._game.get('180205_1259');
    }

    get(functionThatGetsPlayers){ // function takes one parameter.
        this._gameObservable.subscribe(functionThatGetsPlayers);
    }


    private _setPlayers(value: Player[]){

    }


}
