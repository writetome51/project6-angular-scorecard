import {Injectable} from '@angular/core';
import {TotalsCalculatorService} from './totals-calculator.service';
import {ApiService} from './api.service';

@Injectable()
export class DescriptiveDataService {

    descriptiveData;
    descriptiveDataTotals = {};
    private _dash = ' - ';


    constructor(private _totalsCalc: TotalsCalculatorService, private _api: ApiService) {
    }


    get_descriptiveData(selectedCourse, selectedTeename, descriptiveData) {
        this._initialize_descriptiveData_and_totals(descriptiveData);
        this._clearAllDescriptiveData();
        this._fillAllDescriptiveData(selectedCourse, selectedTeename);
        return [this.descriptiveData, this.descriptiveDataTotals];
    }


    private _initialize_descriptiveData_and_totals(descriptiveData) {
        this.descriptiveData = descriptiveData;
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


    private _fillAllDescriptiveData(selectedCourse, selectedTeename) {
        this._fill_descriptiveData(selectedCourse, selectedTeename);
        this._fill_descriptiveDataTotals();
    }


    private _setObjectPropertiesToEmptyArrays(obj) {
        for (let p in obj) {
            obj[p] = [];
        }
    }


    private _fill_descriptiveData(selectedCourse, selectedTeename) {
        this._api.fill_descriptiveData(
            this.descriptiveData, selectedCourse, selectedTeename);
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
