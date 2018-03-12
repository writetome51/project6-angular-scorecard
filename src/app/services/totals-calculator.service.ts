import {Injectable} from '@angular/core';


@Injectable()

export class TotalsCalculatorService {

    ranges = [[0, 8], [9, 17], [0, 17]];


    getTotals(arrayToTally){
        let totals = [];
        this.ranges.forEach((range) => {
            let tally = this._calculateTotalsInRange(range, arrayToTally);
            totals.push(tally);
        });
        return totals;
    }



    private _calculateTotalsInRange(range, array: number[]) {
        return this._getTally(array.slice(range[0], (range[1] + 1)));
    }


    private _getTally(arrayToTally) {
        let sum = 0;

        for (let i = 0; i < arrayToTally.length; ++i) {
            if (isNaN(arrayToTally[i])) {
                arrayToTally[i] = 0;
            }
            sum += Number(arrayToTally[i]);
        }
        return sum;
    }



}
