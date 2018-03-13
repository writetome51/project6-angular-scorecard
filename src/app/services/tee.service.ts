import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {DescriptiveDataService} from './descriptive-data.service';


@Injectable()

export class TeeService {

    course;
    teeNames = [];
    selectedTeeName = '';
    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };
    descriptiveDataTotals;


    constructor(private _api: ApiService, public ddHelper: DescriptiveDataService) {
    }


    loadAllData(selectedCourse){
        this.course = selectedCourse;
        this._clearAndSet_teeNames();
        this._setDefaultValueFor_selectedTeeName();
        this.set_descriptiveData_and_totals();
    }


    set_descriptiveData_and_totals(){
        let data_and_totals =
            this.ddHelper.get_descriptiveData(
                this.course, this.selectedTeeName, this.descriptiveData
            );
        this.descriptiveData = data_and_totals[0];
        this.descriptiveDataTotals = data_and_totals[1];
    }


    private _clearAndSet_teeNames() {
        this.teeNames = [];
        this._set_teeNames();
    }


    private _set_teeNames() {
        let tees = this._api.getTees(this.course);
        this.teeNames = this._api.getTeenames(tees);
    }


    private _setDefaultValueFor_selectedTeeName() {
        this.selectedTeeName = this.teeNames[0];
    }


}
