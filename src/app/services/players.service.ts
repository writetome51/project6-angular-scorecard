import {Injectable} from '@angular/core';
import {GameService} from './game.service';
import {Observable} from 'rxjs/Observable';
import {ActiveGameService} from './active-game.service';
import {Subscription} from 'rxjs/Subscription';
import {Player} from '../interfaces/Player.interface';
import {TotalsCalculatorService} from './totals-calculator.service';

@Injectable()

export class PlayersService {

    numbers = [
        'player1', 'player2', 'player3', 'player4'
    ];
    roster: Player[] = [];
    names: string[];
    rowTotalsSets: Array<number[]> = [];
    // magic variable  playersStillAvailable: string[];
    subscription: Subscription;
    private _gameObservable: Observable<any>;


    constructor(private _game: GameService,
                private _activeGame: ActiveGameService,
                private _totalsCalc: TotalsCalculatorService) {

    }


    set(){
        this._getPlayers((response) => {
            this.roster = Object.values(response); // Object.values() works.
            this._calculateAllPlayerTotals();
            this._setPlayerNames();
        });
    }


    unset(){
        this.roster = [];
        this.names = [];
        this.rowTotalsSets = [];
        this.subscription.unsubscribe();
    }


    addAnother(player) {
        this._game.addMorePlayers([player],  this.names.length + 1);
      //  this.set();
    }


    updateRowTotals(playerIndex) {
        this._initialize_playerRowTotals(playerIndex);
        this._fill_rowTotals(playerIndex);
    }


    isLastPlayer(index) {
        let lastIndex = this.roster.length - 1;
        return (lastIndex === index);
    }


    get playersStillAvailable(): string[] {
        if (this.names){
            let i = this.names.length;
            return this.numbers.slice(i);
        }
    }


    private _getPlayers(observer) {
        this._gameObservable = this._game.get(this._activeGame.get());
        this.subscription = this._gameObservable.subscribe(observer);
    }


    private _setPlayerNames(){
        this.names = [];
        this.roster.forEach((player) => {
            this.names.push(player.name);
        });
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
