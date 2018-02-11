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


    getPlayersAndAssignTo(property){ // function takes one parameter.
        console.log(this._game.activeGame);
        this._gameObservable  = this._game.get(this._game.activeGame);
        this._gameObservable.subscribe((playerCollection) => {
            property =  Object.values(playerCollection);
        });
    }


    addMorePlayers(playerNames: string[]){
        this._game.modify(playerNames);
    }


    private _setPlayers(value: Player[]){
    }


}
