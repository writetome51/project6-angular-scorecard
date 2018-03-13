import {Injectable} from '@angular/core';
import {TotalsCalculatorService} from './totals-calculator.service';
import {ApiService} from './api.service';

@Injectable()
export class DescriptiveDataService {

    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };
    descriptiveDataTotals = {};
    private _dash = ' - ';


    constructor(private _totalsCalc: TotalsCalculatorService, private _api: ApiService) {
        this._initialize_descriptiveDataTotals();
    }


    set_descriptiveData(selectedCourse, selectedTeename) {
        this._clearAllDescriptiveData();
        this._fillAllDescriptiveData();
    }


    private _initialize_descriptiveDataTotals() {
        for (let row in this.descriptiveData) {
            this.descriptiveDataTotals[row] = [];
        }
    }


    private _clearAllDescriptiveData() {
        let descriptiveDataSets = [this.descriptiveData, this.descriptiveDataTotals];
        descriptiveDataSets.forEach((dataSet) => {
            this._setObjectPropertiesToEmptyArrays(dataSet);
        });
    }


    private _fillAllDescriptiveData() {
        this._fill_descriptiveData();
        this._fill_descriptiveDataTotals();
    }


    private _setObjectPropertiesToEmptyArrays(obj) {
        for (let p in obj) {
            obj[p] = [];
        }
    }


    private _fill_descriptiveData() {
        this._api.fill_descriptiveData(
            this.descriptiveData, this.selectedCourse, this.selectedTeeName
        );
        this._makeSureEach_descriptiveDataRow_has18Items();
    }


    private _fill_descriptiveDataTotals() {
        for (let row in this.descriptiveData) {
            this.descriptiveDataTotals[row] =
                this._totalsCalc.getRowTotals(this.descriptiveData[row]);
        }
    }


    private _makeSureEach_descriptiveDataRow_has18Items() {
        this._ifAnyItemsAreEmpty_convertThemToDashes();
        this._appendDashesToRowsUntilEachHas18Items();
    }


    private _ifAnyItemsAreEmpty_convertThemToDashes() {
        for (let row in this.descriptiveData) {
            this.descriptiveData[row].forEach((item, index) => {
                if (!item) {
                    this.descriptiveData[row][index] = this._dash;
                }
            });
        }
    }


    private _appendDashesToRowsUntilEachHas18Items() {
        for (let p in this.descriptiveData) {
            while (this.descriptiveData[p].length < 18) {
                this.descriptiveData[p].push(this._dash);
            }
        }
    }

}
