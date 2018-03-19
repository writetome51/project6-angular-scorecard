import {Component, Input, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {ColumnHelperService} from '../../services/column-helper.service';

@Component({
    selector: 'player-strokes-for-hole',
    templateUrl: './player-strokes-for-hole.component.html'
})
export class PlayerStrokesForHoleComponent implements OnInit {

    @Input() columnID: string;


    constructor(public players: PlayersService,
                public column: ColumnHelperService) {

        this.columnID = '0';
    }

    ngOnInit() {
    }


    validateAndUpdatePlayerTotals(playerIndex, columnIndex) {
        this._validateEntry(this.players.roster[playerIndex], columnIndex);
        this.players.updateRowTotals(playerIndex);
    }


    public _validateEntry(player, column) {
        if (player.strokes[column] !== '') {
            if (isNaN(Number(player.strokes[column]))) {
                player.strokes[column] = 0;
            }
        }
    }


    getPlayerCellID(playerNumber, columnID) {
        let midSection: string;
        if (this.column.isTotalColumn(columnID)) {
            midSection = '-cell-';
        }
        else {
            midSection = '-strokes-';
        }
        return playerNumber + midSection + columnID;
    }


}
