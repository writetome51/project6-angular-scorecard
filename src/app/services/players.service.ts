import {Injectable} from '@angular/core';
import {GameService} from './game.service';
import {Observable} from 'rxjs/Observable';
import {ActiveGameService} from './active-game.service';
import {Subscription} from 'rxjs/Subscription';
import {Player} from '../interfaces/Player.interface';
import {TotalsCalculatorService} from './totals-calculator.service';

@Injectable()

export class PlayersService {

    roster: Player[] = [];
    rowTotalsSets: Array<number[]> = [];
    private _gameObservable: Observable<any>;
    subscription: Subscription;


    constructor(private _game: GameService,
                private _activeGame: ActiveGameService,
                private _totalsCalc: TotalsCalculatorService) {

        this.getPlayers((response) => {
            this.roster = Object.values(response); // Object.values() works.
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
        this._fill_rowTotals(playerIndex);
    }


    isLastPlayer(index) {
        let lastIndex = this.roster.length - 1;
        return (lastIndex === index);
    }


    private _calculateAllPlayerTotals() {
        this._initialize_rowTotalsSets();
        this._fill_rowTotalsSets();
    }


    private _initialize_rowTotalsSets() {
        for (let i = 0; i < this.roster.length; ++i) {
            this._initialize_playerRowTotals(i);
        }
    }


    private _initialize_playerRowTotals(playerIndex) {
        this.rowTotalsSets[playerIndex] = [];
    }


    private _fill_rowTotalsSets() {
        this.rowTotalsSets.forEach((rowTotals, rowIndex) => {
            this._fill_rowTotals(rowIndex);
        });
    }


    private _fill_rowTotals(playerIndex) {
        this.rowTotalsSets[playerIndex] =
            this._totalsCalc.getRowTotals(this.roster[playerIndex].strokes);
    }


}
