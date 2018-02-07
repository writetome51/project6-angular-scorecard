import { Component, OnInit } from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {Player} from '../../interfaces/Player.interface';
import {GameIdService} from '../../services/game-id.service';

@Component({
  selector: 'hole-columns',
  templateUrl: './hole-columns.component.html'
})
export class HoleColumnsComponent implements OnInit {

    players: Player[] = [];

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

  constructor(private playersService: PlayersService, private _gameID: GameIdService) {
  }

  ngOnInit() {
      // this._gameID = something...
      // this.playersService.setGameID(this._gameID);
      this.playersService.get((playerCollection) => {
          this.players = Object.values(playerCollection);
        //  console.log(this.players);
      });
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

  isNumberedColumn(id){
      return ( ! isNaN(id));
  }


  isLastPlayer(){}

}
