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
    playerNumbers: string[];
    playerNames: string[] = [];
    private _playersStillAvailable: string[];
    playersAddedLate = [];


    constructor(
        private _playersService: PlayersService,
        playerNumbers: PlayerNumbersService
    ) {
        this.playerNumbers = playerNumbers.self;
    }

    ngOnInit() {
        this._playersService.getPlayers((playerCollection) => {
            this.players = playerCollection;
            this._setPlayerNames();
        });

    }


    get playersStillAvailable() {
        let i = this.playerNames.length;
        return this.playerNumbers.slice(i);
    }

    savePlayerToGame(){
        this._playersService.addMorePlayers(this.playersAddedLate);
    }


    private _setPlayerNames(){
        console.log('players:', this.players);
        for (let prop in this.players){
            this.playerNames.push(this.players[prop].name);
            console.log(this.playerNames);
        }
    }

}
