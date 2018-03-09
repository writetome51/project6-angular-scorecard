import {Injectable, OnInit} from '@angular/core';
import {Player} from '../interfaces/Player.interface';
import {AngularFirestore} from 'angularfire2/firestore';
import {GameService} from './game.service';
import {Observable} from 'rxjs/Observable';
import {ActiveGameService} from './active-game.service';
import {Subscription} from 'rxjs/Subscription';

@Injectable()

export class PlayersService {

    private _gameObservable: Observable<any>;
    private _gameId: string;

    subscription: Subscription;


    constructor(
        private _game: GameService,
        private _activeGame: ActiveGameService) {
    }


    getPlayers(observer){
        this._gameObservable  = this._game.get(this._activeGame.get());
        this.subscription = this._gameObservable.subscribe(observer);
    }


    addMorePlayers(playerNames, startingNumber){
        this._game.addMorePlayers(playerNames, startingNumber);
    }


}
