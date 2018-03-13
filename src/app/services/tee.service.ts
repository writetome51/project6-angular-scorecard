import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {TotalsCalculatorService} from './totals-calculator.service';


@Injectable()

export class TeeService {

    teeNames = [];
    selectedTeeName = '';
    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };
    descriptiveDataTotals = {};
    dash = ' - ';


    constructor(private _api: ApiService,
                private _totalsCalc: TotalsCalculatorService) {
        this._initialize_descriptiveDataTotals();
    }


    loadAllData(selectedCourse){
        this._clearAndSet_teeNames(selectedCourse);
        this._setDefaultValueFor_selectedTeeName();
        this.set_descriptiveData(selectedCourse);
    }


    set_descriptiveData(selectedCourse) {
        this._clearAllDescriptiveData();
        this._fillAllDescriptiveData(selectedCourse);
    }


    private _initialize_descriptiveDataTotals() {
        for (let p in this.descriptiveData) {
            this.descriptiveDataTotals[p] = [];
        }
    }


    private _clearAndSet_teeNames(selectedCourse) {
        this.teeNames = [];
        this._set_teeNames(selectedCourse);
    }


    private _set_teeNames(selectedCourse) {
        let tees = this._api.getTees(selectedCourse);
        this.teeNames = this._api.getTeenames(tees);
    }


    private _setDefaultValueFor_selectedTeeName() {
        this.selectedTeeName = this.teeNames[0];
    }


    private _clearAllDescriptiveData() {
        let descriptiveDataSets = [this.descriptiveData, this.descriptiveDataTotals];
        descriptiveDataSets.forEach((dataSet) => {
            this._setObjectPropertiesToEmptyArrays(dataSet);
        });
    }


    private _fillAllDescriptiveData(selectedCourse) {
        this._fill_descriptiveData(selectedCourse);
        this._fill_descriptiveDataTotals();
    }


    private _setObjectPropertiesToEmptyArrays(obj) {
        for (let p in obj) {
            obj[p] = [];
        }
    }


    private _fill_descriptiveData(selectedCourse) {
        this._api.fill_descriptiveData(
            this.descriptiveData, selectedCourse, this.selectedTeeName
        );
        this._makeSureEach_descriptiveDataRow_has18Items();
    }


    private _fill_descriptiveDataTotals() {
        for (let p in this.descriptiveData) {
            this.descriptiveDataTotals[p] =
                this._totalsCalc.getTotals(this.descriptiveData[p]);
        }
    }


    private _makeSureEach_descriptiveDataRow_has18Items() {
        this._ifAnyItemsAreEmpty_convertThemToDashes();
        this._appendDashesToRowsUntilEachHas18Items();
    }


    private _ifAnyItemsAreEmpty_convertThemToDashes() {
        for (let p in this.descriptiveData) {
            this.descriptiveData[p].forEach((item, index) => {
                if (!item) {
                    this.descriptiveData[p][index] = this.dash;
                }
            });
        }
    }


    private _appendDashesToRowsUntilEachHas18Items() {
        for (let p in this.descriptiveData) {
            while (this.descriptiveData[p].length < 18) {
                this.descriptiveData[p].push(this.dash);
            }
        }
    }


}
