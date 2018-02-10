import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {GameService} from '../../services/game.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';


@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit {

    newPlayerName: string;
    signedUpPlayerNames: string[] = [];
    playerNumbers: string[];
    gameIDs: string[] = [];
    chosenGame = '';


    constructor(private _angularFireAuth: AngularFireAuth,
                private _gameService: GameService,
                playerNumbersService: PlayerNumbersService) {

        this.playerNumbers = playerNumbersService.self;
    }


    ngOnInit() {
        this._setGameIDs();
    }


    getPlayerPlaceholder(): string {
        let nextPlayer = this.signedUpPlayerNames.length;
        return this.playerNumbers[nextPlayer] + ' name';
    }


    addPlayerName(){
        if (this.newPlayerName.length > 0){
            this.signedUpPlayerNames.push(this.newPlayerName);
            this.newPlayerName = '';
        }
    }


    lessThanFourPlayersSignedUp(){
        return (this.signedUpPlayerNames.length < 4);
    }

    atLeastOnePlayerSignedUp(){
        return (this.signedUpPlayerNames.length > 0);
    }


    createNewGame(){
        this._gameService.add(this.signedUpPlayerNames);
    }


    resumeGame(){}


    private _setGameIDs() {
        this._gameService.getAll((games) => {
            games.forEach((game) => {
                let gameID = this._gameService.getGameID(game);
                this.gameIDs.push(gameID);
            });
        });
    }


}
