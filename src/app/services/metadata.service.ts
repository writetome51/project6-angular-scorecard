import {Injectable} from '@angular/core';
import {TotalsCalculatorService} from './totals-calculator.service';
import {ApiService} from './api.service';

@Injectable()
export class MetadataService {

    metadata;
    metadataTotals = {};
    private _dash = ' - ';


    constructor(private _totalsCalc: TotalsCalculatorService, private _api: ApiService) {
    }


    get(selectedCourse, selectedTeename, descriptiveData) {
        this._initialize_metadata_and_totals(descriptiveData);
        this._clearAllDescriptiveData();
        this._fillAllDescriptiveData(selectedCourse, selectedTeename);
        return [this.metadata, this.metadataTotals];
    }


    private _initialize_metadata_and_totals(descriptiveData) {
        this.metadata = descriptiveData;
        for (let row in this.metadata) {
            this.metadataTotals[row] = [];
        }
    }


    private _clearAllDescriptiveData() {
        let descriptiveDataSets = [this.metadata, this.metadataTotals];
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
        this._api.fill_metadata(
            this.metadata, selectedCourse, selectedTeename);
        this._makeSureEach_descriptiveDataRow_has18Items();
    }


    private _fill_descriptiveDataTotals() {
        for (let row in this.metadata) {
            this.metadataTotals[row] =
                this._totalsCalc.getRowTotals(this.metadata[row]);
        }
    }


    private _makeSureEach_descriptiveDataRow_has18Items() {
        this._ifAnyItemsAreEmpty_convertThemToDashes();
        this._appendDashesToRowsUntilEachHas18Items();
    }


    private _ifAnyItemsAreEmpty_convertThemToDashes() {
        for (let row in this.metadata) {
            this.metadata[row].forEach((item, index) => {
                if (!item) {
                    this.metadata[row][index] = this._dash;
                }
            });
        }
    }


    private _appendDashesToRowsUntilEachHas18Items() {
        for (let p in this.metadata) {
            while (this.metadata[p].length < 18) {
                this.metadata[p].push(this._dash);
            }
        }
    }

}
