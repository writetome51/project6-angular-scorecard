import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {GameService} from '../../services/game.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';


@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit {

    email = '';
    password = '';
    newPlayerName: string;
    signedUpPlayerNames: string[] = [];
    playerNumbers: string[];
    gameIDs: string[] = [];
    chosenGame = '';


    constructor(private _angularFireAuth: AngularFireAuth,
                private _game: GameService,
                playerNumbersService: PlayerNumbersService) {

        this.playerNumbers = playerNumbersService.self;

    }


    ngOnInit() {
        this._setGameIDs();
    }


    getPlayerPlaceholder(): string {
        // Find out how many players are already signed up to the game.
        let nextPlayer = this.signedUpPlayerNames.length;
        return this.playerNumbers[nextPlayer];
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



    private _setGameIDs() {
        this._game.getAll((games) => {
            games.forEach((game) => {
                this.gameIDs.push(game.payload.doc.id);
            });
        });
    }


}
