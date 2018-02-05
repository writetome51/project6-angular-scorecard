import { Component, OnInit } from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {Player} from '../../Player.interface';

@Component({
  selector: 'hole-columns',
  templateUrl: './hole-columns.component.html'
})
export class HoleColumnsComponent implements OnInit {

    players: Player[];

    columnIDs = [
        '1', '2', '3', '4',
        '5', '6', '7', '8',
        '9', 'out', '10', '11',
        '12', '13', '14', '15',
        '16', '17', '18', 'in', 'total'
    ];

    fetchedDataRows = [
        'yards', 'par', 'hcp'
    ];

  constructor(private playersService: PlayersService) {
      this.players = this.playersService.getPlayers();
  }

  ngOnInit() {
  }

  getColumnIDForHTML(id){
      let prefix = 'hole-';
      let suffix = '-column';
      if (isNaN(id)){ return id + suffix; }
      else{
          return (prefix + id + suffix);
      }
  }

  getPlayerCellID(playerNumber, columnID){
      let midSection: string;
      if (this.isTotalColumn(columnID)){
          midSection = '-cell-';
      }
      else{
          midSection = '-strokes-';
      }
      return playerNumber + midSection + columnID;
  }


  isTotalColumn(id) {
      return (id === 'out' || id === 'in' || id === 'total');
  }

  notTotalColumn(id){
      return ( ! this.isTotalColumn(id));
  }


  isLastPlayer(){}

}
