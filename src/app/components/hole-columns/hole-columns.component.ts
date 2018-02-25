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
    totalHoles: number;
    outColumn = 'out';
    inColumn = 'in';
    totalColumn = 'total';

    columnIDs = [
        '1', '2', '3', '4',
        '5', '6', '7', '8',
        '9', this.outColumn, '10', '11',
        '12', '13', '14', '15',
        '16', '17', '18', this.inColumn, this.totalColumn
    ];

    descriptiveRows: string[];
    rowTallies: object;


    constructor(public courseService: CourseService,
                private playersService: PlayersService,
                private playerNumbers: PlayerNumbersService,
                private _activeGame: ActiveGameService) {
    }


    ngOnInit() {
        this.descriptiveRows = Object.keys(this.courseService.descriptiveData);
        this.set_totalHoles();
        this.set_rowTallies();
        this.setTotals();

        this.playersService.getPlayers((response) => {
            this.players = Object.values(response);
        });
    }

    ngOnDestroy() {
        this.courseService.courseSubscription.unsubscribe();
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


    set_rowTallies() {
        let obj = {};
        this.descriptiveRows.forEach((row) => {
            obj[row] = [];
        });
        this.playerNumbers.self.forEach((playerNumber) => {
            obj[playerNumber] = [];
        });
        this.rowTallies = obj;
    }


    set_totalHoles() {
        this.totalHoles = this.courseService.descriptiveData[this.descriptiveRows[0]].length;
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
            return this.rowTallies[descriptiveRow][(columnID - 1)];
        }
    }


    showDescriptiveData(columnID, descriptiveRow) {
        let rowOfData = this.courseService.descriptiveData[descriptiveRow];
        return rowOfData[(columnID - 1)];
    }


    setTotals() {
        for (let p in this.rowTallies) {
            this.descriptiveRows.forEach((row) => {
                let totalRange = [0, this.totalHoles];
                let inRange = [(Math.round(this.totalHoles / 2)), this.totalHoles];
                let outRange = [0, (this.totalHoles / 2)];
                let ranges = [outRange, inRange, totalRange];

                ranges.forEach((range: [number, number]) => {
                    this.rowTallies[p].push(this.tallySelection(row, range));
                });
            });

        }
    }


    tallySelection(descriptiveRow, range: [number, number]) {
        let rowOfNumbers = this.courseService.descriptiveData[descriptiveRow];
        let numbersToTally = rowOfNumbers.slice(range[0], range[1]);
        return this.getTally(numbersToTally);
    }


    getTally(arrayToTally) {
        let sum = 0;
        for (let i = 0; i < arrayToTally.length; ++i) {
            if (isNaN(arrayToTally[i])) {
                arrayToTally[i] = 0;
            }
            sum += arrayToTally[i];
        }
        return sum;
    }


    isLastPlayer() {
    }

}
