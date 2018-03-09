import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../interfaces/Player.interface';
import {PlayersService} from '../../services/players.service';
import {ActiveGameService} from '../../services/active-game.service';
import {CourseService} from '../../services/course.service';
import {PlayerNumbersService} from '../../services/player-numbers.service';

@Component({
    selector: 'hole-columns',
    templateUrl: './hole-columns.component.html'
})
export class HoleColumnsComponent implements OnInit, OnDestroy {

    players: Player[] = [];
    totalHoleCount: number;
    outColumn = 'out';
    inColumn = 'in';
    totalColumn = 'total';
    totalColumnIDs = [this.outColumn, this.inColumn, this.totalColumn];
    columnIDs = [
        '1', '2', '3', '4',
        '5', '6', '7', '8',
        '9', this.outColumn, '10', '11',
        '12', '13', '14', '15',
        '16', '17', '18', this.inColumn, this.totalColumn
    ];

    descriptiveRows: string[];
    playersRowTotals: Array<number[]> = [];


    constructor(public courseService: CourseService,
                private playersService: PlayersService) {
    }


    ngOnInit() {
        this.descriptiveRows = Object.keys(this.courseService.descriptiveData);
        this.set_totalHoleCount();

        this.playersService.getPlayers((response) => {
            this.players = Object.values(response);
            this._calculateAllPlayerTotals();
        });
    }


    ngOnDestroy() {
        this.courseService.courseSubscription.unsubscribe();
        this.playersService.subscription.unsubscribe();
    }


    private _calculateAllPlayerTotals() {
        this._initialize_playersRowTotals();
      //  console.log(this.playersRowTotals);
        this._fill_playersRowTotals();
    }


    private _initialize_playersRowTotals() {
        for (let i = 0; i < this.players.length; ++i) {
            this._initialize_playerRowTotals(i);
        }
    }


    private _initialize_playerRowTotals(playerIndex) {
        this.playersRowTotals[playerIndex] = [];
    }


    ifTotalColumn_showTotal(columnID) {
        if (this.isTotalColumn(columnID)) {
            // return this.playersRowTotals[index][columnID]
        }
    }


    validateAndUpdatePlayerTotals(playerIndex, columnIndex) {
        this.validateEntry(this.players[playerIndex], columnIndex);
        this.updateRowTotals(playerIndex);
    }


    validateEntry(player, column) {
        if (player.strokes[column] !== '') {
            if (isNaN(Number(player.strokes[column]))) {
                player.strokes[column] = 0;
            }
        }
    }


    updateRowTotals(playerIndex) {
        this._initialize_playerRowTotals(playerIndex);
        this._fill_Totals(playerIndex);
    }


    getColumnIDForHTML(id) {
        let prefix = 'hole-';
        let suffix = '-column';
        if (isNaN(id)) {
            return id + suffix;
        }
        else {
            return (prefix + id + suffix);
        }
    }


    getPlayerCellID(playerNumber, columnID) {
        let midSection: string;
        if (this.isTotalColumn(columnID)) {
            midSection = '-cell-';
        }
        else {
            midSection = '-strokes-';
        }
        return playerNumber + midSection + columnID;
    }


    set_totalHoleCount() {
        this.totalHoleCount = this.courseService.descriptiveData[this.descriptiveRows[0]].length;
    }


    isTotalColumn(columnID) {
        return (columnID === this.outColumn ||
            columnID === this.inColumn ||
            columnID === this.totalColumn);
    }


    isNumberedColumn(columnID) {
        return (!isNaN(columnID));
    }


    figureOutWhatDataToShow(columnID, descriptiveRow) {
        if (this.isNumberedColumn(columnID)) {
            return this.showDescriptiveData(columnID, descriptiveRow);
        }
        else if (this.isTotalColumn(columnID)) {
            columnID = this.totalColumnIDs.indexOf(columnID);
            return this.courseService.descriptiveDataTotals[descriptiveRow][columnID];
        }
    }


    showDescriptiveData(columnID, descriptiveRow) {
        let rowOfData = this.courseService.descriptiveData[descriptiveRow];
        return rowOfData[(columnID - 1)];
    }


    private  _fill_playersRowTotals(){
        this.playersRowTotals.forEach((playerRowTotals, index) => {
            this._fill_Totals(index);
        });
    }


    private _fill_Totals(playerIndex) {
        let ranges = this._calculateRangesBasedOn_totalHoleCount();

        ranges.forEach((range) => {
            let tally = this._calculateTotalsInRange(range, this.players[playerIndex].strokes);
            this.playersRowTotals[playerIndex].push(tally);
        });

    }


    private _calculateRangesBasedOn_totalHoleCount() {
        let ranges = [];
        let outRanges = [0, Math.round((this.totalHoleCount / 2) - 1)];
        ranges.push(outRanges);
        let inRanges = [Math.round(this.totalHoleCount / 2), this.totalHoleCount - 1];
        ranges.push(inRanges);
        let totalRanges = [0, this.totalHoleCount - 1];
        ranges.push(totalRanges);

        return ranges;
    }


    private _calculateTotalsInRange(range: number[], array: number[]) {
        return this._getTally(array.slice(range[0], (range[1] + 1)));
    }


    private _getTally(arrayToTally) {
        let sum = 0;

        for (let i = 0; i < arrayToTally.length; ++i) {
            if (isNaN(arrayToTally[i])) {
                arrayToTally[i] = 0;
            }
            sum += arrayToTally[i];
        }
        return sum;
    }


    isLastPlayer(index) {
        let lastIndex = this.players.length - 1;
        return (lastIndex === index);
    }


}
