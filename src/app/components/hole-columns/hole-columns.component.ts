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


    constructor(public course: CourseService,
                private playersService: PlayersService) {
    }


    ngOnInit() {
        this.metadataRowNames = Object.keys(this.course.tee.metadata);
    }


    ngOnDestroy() {
        this.course.courseSubscription.unsubscribe();
        this.playersService.subscription.unsubscribe();
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


    figureOutWhatDataToShow(columnID, rowName) {

        // This conditional necessary to prevent fatal errors if metadataTotals is not set:
        if (this.course.tee.metadataTotals){
            if (this.isNumberedColumn(columnID)) {
                return this.showMetadata(columnID, rowName);
            }
            else if (this.isTotalColumn(columnID)) {
                columnID = this.totalColumnIDs.indexOf(columnID);
                return this.course.tee.metadataTotals[rowName][columnID];
            }
        }
    }


    showMetadata(columnID, rowName) {
        let rowOfData = this.course.tee.metadata[rowName];
        return rowOfData[(columnID - 1)];
    }


    isLastPlayer(index) {
        let lastIndex = this.playersService.players.length - 1;
        return (lastIndex === index);
    }


}
