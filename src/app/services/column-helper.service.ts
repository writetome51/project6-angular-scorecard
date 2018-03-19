import {Injectable} from '@angular/core';

@Injectable()
export class ColumnHelperService {

    out = 'out';
    inColumn = 'in';
    total = 'total';
    totalIDs = [this.out, this.inColumn, this.total];
    columnIDs = [
        '1', '2', '3', '4',
        '5', '6', '7', '8',
        '9', this.out, '10', '11',
        '12', '13', '14', '15',
        '16', '17', '18', this.inColumn, this.total
    ];


    constructor() {
    }


    isTotalColumn(columnID) {
        return (this.totalIDs.indexOf(columnID) > -1);
    }


    isNumberedColumn(columnID) {
        return (!isNaN(columnID));
    }


}
