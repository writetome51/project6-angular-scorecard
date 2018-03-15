import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {MetadataService} from './metadata.service';


@Injectable()

export class TeeService {

    course;
    names = [];
    selectedName = '';
    metadata = {
        yards: [],
        par: [],
        hcp: [],
    };
    metadataLabelsForDisplay = {
        yards: 'Tee',
        par: 'Par',
        hcp: 'Handicap',
    };
    metadataTotals;


    constructor(private _api: ApiService, public mdService: MetadataService) {
    }


    loadAllData(selectedCourse){
        this.course = selectedCourse;
        this._clearAndSet_names();
        this._setDefaultValueFor_selectedName();
        this.set_metadata_and_totals();
    }


    set_metadata_and_totals(){
        let data_and_totals =
            this.mdService.get(
                this.course, this.selectedName, this.metadata
            );
        this.metadata = data_and_totals[0];
        this.metadataTotals = data_and_totals[1];
    }


    private _clearAndSet_names() {
        this.names = [];
        this._set_names();
    }


    private _set_names() {
        let tees = this._api.getTees(this.course);
        this.names = this._api.getTeenames(tees);
    }


    private _setDefaultValueFor_selectedName() {
        this.selectedName = this.names[0];
    }


}
