import { Component, OnInit } from '@angular/core';
import {PlayersService} from '../players.service';

@Component({
  selector: 'player-names',
  templateUrl: './player-names.component.html'
})

export class PlayerNamesComponent implements OnInit {

  constructor(private _players: PlayersService) { }

  ngOnInit() {
  }

}
