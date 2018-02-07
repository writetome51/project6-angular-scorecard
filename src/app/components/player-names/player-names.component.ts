import {Component, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';

@Component({
    selector: 'player-names',
    templateUrl: './player-names.component.html'
})

export class PlayerNamesComponent implements OnInit {


    constructor(
        public players: PlayersService,
        public playerNumbers: PlayerNumbersService
    ) {
    }

    ngOnInit() {
    }


}
