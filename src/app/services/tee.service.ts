import {Injectable} from '@angular/core';
import {Course} from '../interfaces/Course.interface';
import {ApiService} from './api.service';
import {TotalsCalculatorService} from './totals-calculator.service';


@Injectable()

export class TeeService {

    teeNames = [];
    selectedTeeName = '';
    selectedTeeIndex = 0;
    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };
    descriptiveDataTotals = {};


    constructor(private _api: ApiService,
                private _totalsCalc: TotalsCalculatorService) {
        this._initialize_descriptiveDataTotals();
    }


    private _initialize_descriptiveDataTotals() {
        for (let p in this.descriptiveData) {
            this.descriptiveDataTotals[p] = [];
        }
    }


    loadAllData(selectedCourse){
        this._clearAndSet_teeNames(selectedCourse);
        this._setDefaultValueFor_selectedTeeName();
        this.loadAllDataForSelectedTee();
    }


    private _clearAndSet_teeNames(selectedCourse) {
        this.teeNames = [];
        this._set_teeNames(selectedCourse);
    }


    private _set_teeNames(selectedCourse) {
        let tees = this._api.getTees(selectedCourse);
        this.teeNames = this._api.getTeenames(tees);
    }


    loadAllDataForSelectedTee() {
        this._setCurrentTee();
        this._set_descriptiveData();
    }


    private _setDefaultValueFor_selectedTeeName() {
        this.selectedTeeName = this.teeNames[0];
    }


    private _setCurrentTee() {
        this.selectedTeeIndex = this.teeNames.indexOf(this.selectedTeeName);
    }


    private _set_descriptiveData() {
        this._clearAllDescriptiveData();
        this._fillAllDescriptiveData();
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


    private _makeSureEach_descriptiveDataRow_has18Items() {
        this._ifAnyItemsAreEmpty_convertThemToDashes();
        this._appendDashesToRowsUntilEachHas18Items();
    }


    private _ifAnyItemsAreEmpty_convertThemToDashes() {
        for (let p in this.descriptiveData) {
            this.descriptiveData[p].forEach((item, index) => {
                if (!item) {
                    this.descriptiveData[p][index] = ' - ';
                }
            });
        }
    }


    private _appendDashesToRowsUntilEachHas18Items() {
        for (let p in this.descriptiveData) {
            while (this.descriptiveData[p].length < 18) {
                this.descriptiveData[p].push(' - ');
            }
        }
    }


    private _fill_descriptiveDataTotals() {
        for (let p in this.descriptiveData) {
            this.descriptiveDataTotals[p] = this._totalsCalc.getTotals(
                this.descriptiveData[p]
            );
        }
    }


}
