import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../interfaces/Player.interface';
import {PlayersService} from '../../services/players.service';
import {CourseService} from '../../services/course.service';
import {TotalsCalculatorService} from '../../services/totals-calculator.service';

@Component({
    selector: 'hole-columns',
    templateUrl: './hole-columns.component.html'
})
export class HoleColumnsComponent implements OnInit, OnDestroy {

    players: Player[] = [];
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

    metadataRowNames: string[];
    playersRowTotals: Array<number[]> = [];


    constructor(public course: CourseService,
                private playersService: PlayersService,
                private _totalsCalc: TotalsCalculatorService) {
    }


    ngOnInit() {
        this.metadataRowNames = Object.keys(this.course.tee.metadata);

        this.playersService.getPlayers((response) => {
            this.players = Object.values(response); // Object.values() works.
            this._calculateAllPlayerTotals();
        });
    }


    ngOnDestroy() {
        this.course.courseSubscription.unsubscribe();
        this.playersService.subscription.unsubscribe();
    }


    private _calculateAllPlayerTotals() {
        this._initialize_playersRowTotals();
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


    isTotalColumn(columnID) {
        return (columnID === this.outColumn ||
            columnID === this.inColumn ||
            columnID === this.totalColumn);
    }


    isNumberedColumn(columnID) {
        return (!isNaN(columnID));
    }


    figureOutWhatDataToShow(columnID, descriptiveRow) {

        // This conditional necessary to prevent fatal errors if metadataTotals is not set:
        if (this.course.tee.metadataTotals){
            if (this.isNumberedColumn(columnID)) {
                return this.showDescriptiveData(columnID, descriptiveRow);
            }
            else if (this.isTotalColumn(columnID)) {
                columnID = this.totalColumnIDs.indexOf(columnID);
                return this.course.tee.metadataTotals[descriptiveRow][columnID];
            }
        }
    }


    showDescriptiveData(columnID, descriptiveRow) {
        let rowOfData = this.course.tee.metadata[descriptiveRow];
        return rowOfData[(columnID - 1)];
    }


    private _fill_playersRowTotals() {
        this.playersRowTotals.forEach((playerRowTotals, index) => {
            this._fill_Totals(index);
        });
    }


    private _fill_Totals(playerIndex) {
        this.playersRowTotals[playerIndex] =
            this._totalsCalc.getRowTotals(this.players[playerIndex].strokes);
    }


    isLastPlayer(index) {
        let lastIndex = this.players.length - 1;
        return (lastIndex === index);
    }


}
