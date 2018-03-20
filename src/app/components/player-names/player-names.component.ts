import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';

@Component({
    selector: 'player-names',
    templateUrl: './player-names.component.html'
})

export class PlayerNamesComponent implements OnInit, OnDestroy {

    playersAddedLate = [];


    constructor(public players: PlayersService) {
    }

    ngOnInit() {
        this.players.set();
    }

    ngOnDestroy(){
        this.players.unset();
    }


    savePlayerToGame(){
        this._removeEmptyNames();
        this.players.addMore(this.playersAddedLate);
        this.playersAddedLate = [];
    }

    private _removeEmptyNames(){
        this.playersAddedLate.forEach((player, index) => {
            player.trim();
            if (player === ''){
                this.playersAddedLate.remove;
            }
        });
    }


}
