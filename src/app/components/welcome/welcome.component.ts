import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {GameService} from '../../services/game.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';



@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit{

    email = '';
    password = '';
    selectOptions: string[];
    playerNumbers: string[];


    constructor(private _angularFireAuth: AngularFireAuth,
                private _game: GameService,
                playerNumbersService: PlayerNumbersService) {
        this.playerNumbers = playerNumbersService.self;
    }


    ngOnInit() {
    }


    getPlayerPlaceholder(){
        // Find out how many players are already signed up to the game.
    }

}
