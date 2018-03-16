import {Injectable} from '@angular/core';

@Injectable()
export class ColumnHelperService {

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


    constructor() {
    }


    isTotalColumn(columnID) {
        return (columnID === this.outColumn ||
            columnID === this.inColumn ||
            columnID === this.totalColumn);
    }


    isNumberedColumn(columnID) {
        return (!isNaN(columnID));
    }


}
