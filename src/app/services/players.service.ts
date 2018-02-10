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

    getPlayersAndAssignTo(property){ // function takes one parameter.
        this._gameObservable  = this._game.get(this._gameId);
        this._gameObservable.subscribe((players) => {
            property = players;
        });
    }


    private _setPlayers(value: Player[]){
    }


}
