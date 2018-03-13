import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {TotalsCalculatorService} from './totals-calculator.service';
import {Course} from '../interfaces/Course.interface';
import {DescriptiveDataService} from './descriptive-data.service';


@Injectable()

export class TeeService {

    teeNames = [];
    selectedTeeName = '';


    constructor(private _api: ApiService, public descriptiveData: DescriptiveDataService) {
    }


    loadAllData(selectedCourse){
        this._clearAndSet_teeNames(selectedCourse);
        this._setDefaultValueFor_selectedTeeName();
        this.descriptiveData.set_descriptiveData(selectedCourse, this.selectedTeeName);
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


}
