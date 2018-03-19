import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {GameService} from '../../services/game.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';
import {ActiveGameService} from '../../services/active-game.service';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit {

    billMurray = environment.billMurray;
    ted1 = environment.tedKnight1;
    ted2 = environment.tedKnight2;
    newPlayerName: string;
    signedUpPlayerNames: string[] = [];
    playerNumbers: string[];
    gameIDs: string[] = [];
    chosenGame = '';


    constructor(private _angularFireAuth: AngularFireAuth,
                private _gameService: GameService,
                private _activeGame: ActiveGameService,
                playerNumbersService: PlayerNumbersService) {

        this.playerNumbers = playerNumbersService.self;
    }


    ngOnInit() {
        this._gameService.getAll((games) => {
            this._setGameIDs(games);
            this._setDefaultFor_chosenGame();
        });

    }


    _setDefaultFor_chosenGame(){
        if (this.chosenGame  === ''){
            this.chosenGame = this.gameIDs[0];
        }
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


    resumeGame(){
        this._activeGame.set(this.chosenGame);
    }


    private _setGameIDs(games) {
        games.forEach((game) => {
            let gameID = this._gameService.getGameID(game);
            this.gameIDs.push(gameID);
        });
    }


}
