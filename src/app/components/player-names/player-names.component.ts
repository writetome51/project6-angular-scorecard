import {Component, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';
import {Player} from '../../interfaces/Player.interface';

@Component({
    selector: 'player-names',
    templateUrl: './player-names.component.html'
})

export class PlayerNamesComponent implements OnInit {

    players: object;
    playerNames: string[] = [];


    constructor(
        private _playersService: PlayersService,
        public playerNumbers: PlayerNumbersService
    ) {
    }

    ngOnInit() {
        this._playersService.getPlayersAndAssignTo(this.players);
        this._setPlayerNames();
    }


    private _setPlayerNames(){
        for (let prop in this.players){
            this.playerNames.push(this.players[prop].name);
        }
    }

}
