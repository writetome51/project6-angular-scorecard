import {Injectable, OnInit} from '@angular/core';
import {Player} from '../interfaces/Player.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {GameService} from './game.service';
import {Observable} from 'rxjs/Observable';
import {ActiveGameService} from './active-game.service';

@Injectable()

export class PlayersService {

    private _gameObservable: Observable<any>;
    private _gameId: string;


    constructor(
        private _game: GameService,
        private _activeGame: ActiveGameService) {
    }


    getPlayers(functionThatManipulatesResponse){ // function takes one parameter.
        console.log(this._activeGame.get());
        this._gameObservable  = this._game.get(this._activeGame.get());
        this._gameObservable.subscribe(functionThatManipulatesResponse);
    }


    addMorePlayers(playerNames: string[]){
        this._game.addMorePlayers(playerNames);
    }


    private _setPlayers(value: Player[]){
    }


}
