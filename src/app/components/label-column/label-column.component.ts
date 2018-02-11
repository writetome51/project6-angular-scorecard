import { Component, OnInit } from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';

@Component({
  selector: 'label-column',
  templateUrl: './label-column.component.html'
})
export class LabelColumnComponent implements OnInit {

  constructor(private _playersService: PlayersService,
              private _playerNumbersService: PlayerNumbersService) { }

  ngOnInit() {
  }

}
