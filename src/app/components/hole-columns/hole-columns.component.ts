import {Component, OnDestroy, OnInit} from '@angular/core';
import {Player} from '../../interfaces/Player.interface';
import {PlayersService} from '../../services/players.service';
import {ActiveGameService} from '../../services/active-game.service';
import {CourseService} from '../../services/course.service';

@Component({
    selector: 'hole-columns',
    templateUrl: './hole-columns.component.html'
})
export class HoleColumnsComponent implements OnInit, OnDestroy {

    players: Player[] = [];
    outColumn = 'out';
    inColumn = 'in';

    columnIDs = [
        '1', '2', '3', '4',
        '5', '6', '7', '8',
        '9', this.outColumn, '10', '11',
        '12', '13', '14', '15',
        '16', '17', '18', this.inColumn, 'total'
    ];

    descriptiveRows: string[];


    constructor(private playersService: PlayersService,
                private _activeGame: ActiveGameService,
                public courseService: CourseService) {

        this.descriptiveRows = Object.keys(this.courseService.descriptiveData);
    }

    ngOnInit() {
        this.playersService.getPlayers((response) => {
            this.players = Object.values(response);
        });
    }

    ngOnDestroy(){
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


    isTotalColumn(columnID) {
        return (columnID === 'out' || columnID === 'in' || columnID === 'total');
    }

    isNumberedColumn(columnID) {
        return (!isNaN(columnID));
    }


    ifNumberedColumn_ShowDescriptiveData(columnID, descriptiveRow){
        if (this.isNumberedColumn(columnID)){
            let rowOfData = this.courseService.descriptiveData[descriptiveRow];
            return rowOfData[(columnID - 1)];
        }
    }


    ifTotalColumn_ShowTotal(columnID, descriptiveRow){
        if (this.isTotalColumn(columnID)){
            if (columnID === this.outColumn){
                return this.tallySelection(descriptiveRow, [0, 9]);
            }
            else if (columnID === this.inColumn){
                return this.tallySelection(descriptiveRow, [9, 18]);
            }
            else{
                return this.tallySelection(descriptiveRow, [0, 18]);
            }
        }
    }

    tallySelection(descriptiveRow, range: [number, number]){
        let rowOfNumbers = this.courseService.descriptiveData[descriptiveRow];
        let numbersToTally = rowOfNumbers.splice(0, 9);
        return this.getTally(numbersToTally);
    }


    getTally(arrayToTally){
        let sum = 0;
        for (let i = 0; i < arrayToTally.length; ++i){
            if (isNaN(arrayToTally[i])){
                arrayToTally[i] = 0;
            }
            sum += arrayToTally[i];
        }
        return sum;
    }


    isLastPlayer() {
    }

}
