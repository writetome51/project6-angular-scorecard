import { Component, OnInit } from '@angular/core';
import {PlayersService} from '../../services/players.service';

@Component({
  selector: 'player-names',
  templateUrl: './player-names.component.html'
})

export class PlayerNamesComponent implements OnInit {

    playerNumbers = [
        'player1', 'player2', 'player3', 'player4'
    ];

    playerNames: string[] = [];


  constructor(private _players: PlayersService) { }

  ngOnInit() {
  }


}
