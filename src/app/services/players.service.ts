import {Injectable, OnInit} from '@angular/core';
import {Player} from '../interfaces/Player.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {GameService} from './game.service';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class PlayersService {

    private _gameObservable: Observable<any>;
    private _gameId: string;


    constructor(private _game: GameService) {
    }

    setGameID(value: string){
        this._gameId = value;
    }

    get(functionThatManipulatesResponse){ // function takes one parameter.
        this._gameObservable  = this._game.get('180205_1259');
        this._gameObservable.subscribe(functionThatManipulatesResponse);
    }


    private _setPlayers(value: Player[]){
    }


}
