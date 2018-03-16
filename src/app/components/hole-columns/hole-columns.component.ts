import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../interfaces/Player.interface';
import {PlayersService} from '../../services/players.service';
import {CourseService} from '../../services/course.service';
import {TotalsCalculatorService} from '../../services/totals-calculator.service';
import {ColumnHelperService} from '../../services/column-helper.service';

@Component({
    selector: 'hole-columns',
    templateUrl: './hole-columns.component.html'
})
export class HoleColumnsComponent implements OnInit, OnDestroy {

    metadataRowNames: string[];


    constructor(public course: CourseService,
                private playersService: PlayersService,
                public columnHelper: ColumnHelperService) {
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


    figureOutWhatDataToShow(columnID, rowName) {

        // This conditional necessary to prevent fatal errors if metadataTotals is not set:
        if (this.course.tee.metadataTotals){
            if (this.columnHelper.isNumberedColumn(columnID)) {
                return this.showMetadata(columnID, rowName);
            }
            else if (this.columnHelper.isTotalColumn(columnID)) {
                columnID = this.columnHelper.totalColumnIDs.indexOf(columnID);
                return this.course.tee.metadataTotals[rowName][columnID];
            }
        }
    }


    showMetadata(columnID, rowName) {
        let rowOfData = this.course.tee.metadata[rowName];
        return rowOfData[(columnID - 1)];
    }



}
