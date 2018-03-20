import {Component, OnDestroy, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {ArrayHelperService} from '../../services/array-helper.service';

@Component({
    selector: 'player-names',
    templateUrl: './player-names.component.html'
})

export class PlayerNamesComponent implements OnInit, OnDestroy {

    playersAddedLate = [];


    constructor(public players: PlayersService, private _array: ArrayHelperService) {
    }

    ngOnInit() {
        this.players.set();
    }

    ngOnDestroy() {
        this.players.unset();
    }


    savePlayerToGame(index) {
        this.playersAddedLate[index] = this.playersAddedLate[index].trim();
        if (this.playersAddedLate[index] !== ''){
            this.players.addAnother(this.playersAddedLate[index]);
            this.playersAddedLate[index] = '';
        }
    }


}
