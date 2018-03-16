import {Injectable} from '@angular/core';
import {GameService} from './game.service';
import {Observable} from 'rxjs/Observable';
import {ActiveGameService} from './active-game.service';
import {Subscription} from 'rxjs/Subscription';
import {Player} from '../interfaces/Player.interface';
import {TotalsCalculatorService} from './totals-calculator.service';

@Injectable()

export class PlayersService {

    players: Player[] = [];
    playersRowTotals: Array<number[]> = [];
    private _gameObservable: Observable<any>;
    subscription: Subscription;


    constructor(private _game: GameService,
                private _activeGame: ActiveGameService,
                private _totalsCalc: TotalsCalculatorService) {

        this.getPlayers((response) => {
            this.players = Object.values(response); // Object.values() works.
            this._calculateAllPlayerTotals();
        });

    }


    getPlayers(observer) {
        this._gameObservable = this._game.get(this._activeGame.get());
        this.subscription = this._gameObservable.subscribe(observer);
    }


    addMorePlayers(playerNames, startingNumber) {
        this._game.addMorePlayers(playerNames, startingNumber);
    }


    updateRowTotals(playerIndex) {
        this._initialize_playerRowTotals(playerIndex);
        this._fill_Totals(playerIndex);
    }


    isLastPlayer(index) {
        let lastIndex = this.players.length - 1;
        return (lastIndex === index);
    }


    private _calculateAllPlayerTotals() {
        this._initialize_playersRowTotals();
        this._fill_playersRowTotals();
    }


    private _initialize_playersRowTotals() {
        for (let i = 0; i < this.players.length; ++i) {
            this._initialize_playerRowTotals(i);
        }
    }


    private _initialize_playerRowTotals(playerIndex) {
        this.playersRowTotals[playerIndex] = [];
    }


    private _fill_playersRowTotals() {
        this.playersRowTotals.forEach((playerRowTotals, index) => {
            this._fill_Totals(index);
        });
    }


    private _fill_Totals(playerIndex) {
        this.playersRowTotals[playerIndex] =
            this._totalsCalc.getRowTotals(this.players[playerIndex].strokes);
    }


}
