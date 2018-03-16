import {Component, Input, OnInit} from '@angular/core';
import {PlayersService} from '../../services/players.service';
import {ColumnHelperService} from '../../services/column-helper.service';

@Component({
    selector: 'player-strokes-for-hole',
    templateUrl: './player-strokes-for-hole.component.html'
})
export class PlayerStrokesForHoleComponent implements OnInit {

    @Input() columnID: string;


    constructor(public playersService: PlayersService,
                public columnHelper: ColumnHelperService) {
    }

    ngOnInit() {
    }


    validateAndUpdatePlayerTotals(playerIndex, columnIndex) {
        this._validateEntry(this.playersService.players[playerIndex], columnIndex);
        this.playersService.updateRowTotals(playerIndex);
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
        if (this.columnHelper.isTotalColumn(columnID)) {
            midSection = '-cell-';
        }
        else {
            midSection = '-strokes-';
        }
        return playerNumber + midSection + columnID;
    }


}
