import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Course} from '../interfaces/Course.interface';
import {ApiService} from './api.service';


@Injectable()

export class CourseService {

    courses: Course[] = [];
    courseNames = [];
    selectedCourse: Course;
    selectedCourseHref: string;
    coursesSubscription: Subscription;
    courseSubscription: Subscription;
    selectedCourseName = '';
    selectedCourseIndex = 0;
    teeNames = [];
    selectedTeeName = '';
    selectedTeeIndex = 0;
    tee_types: any[];
    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };
    descriptiveDataTotals = {};
    totalHoleCount: number;
    totalTallyRanges: Array<number[]> = [];


    constructor(private _api: ApiService) {
        this._initialize_descriptiveDataTotals();
        this._loadAllData();
    }


    public loadAllDataForSelectedCourse() {
        this._setSelectedCourse();
        this.courseSubscription = this._api.getCourse(
            this.selectedCourseHref,
            (courseObject) => {
                this.selectedCourse = courseObject.course;
                this._clearAndSet_teeNames();
                this._setDefaultValueFor_selectedTeeName();
                this._loadAllDataForSelectedTee();
                this.set_totalHoleCount();
                console.log(this.totalHoleCount);
            }
        );
    }


    private _initialize_descriptiveDataTotals(){
        for (let p in this.descriptiveData){
            this.descriptiveDataTotals[p] = [];
        }
    }


    private _loadAllData() {
        this.coursesSubscription = this._api.getCourses((response: Course[]) => {
            this.courses = response;
            this._clearAndSet_courseNames();
            this._setDefaultValueFor_selectedCourseName();
            this.loadAllDataForSelectedCourse();
        });
    }


    private _clearAndSet_courseNames() {
        this._clear_courseNames();
        this._set_courseNames();
    }


    private _clear_courseNames() {
        this.courseNames = [];
    }

    private _set_courseNames() {
        this.courses.forEach((course) => {
            this.courseNames.push(this._api.getCoursename(course));
        });
    }


    private _setDefaultValueFor_selectedCourseName() {
        if (this.selectedCourseName === '') {
            this.selectedCourseName = this.courseNames[0];
        }
    }


    private _clearAndSet_teeNames() {
        this._clear_teeNames();
        this._set_teeNames();
    }


    private _clear_teeNames() {
        this.teeNames = [];
    }


    private _set_teeNames() {
        this.tee_types = this._api.getTees(this.selectedCourse);
        for (let i = 0; i < this.tee_types.length; ++i) {
            this.teeNames.push(this._api.getTeename(this.tee_types[i]));
        }
    }


    private _loadAllDataForSelectedTee() {
        this._setCurrentTee();
        this._set_descriptiveData();
    }


    private _setDefaultValueFor_selectedTeeName() {
        this.selectedTeeName = this.teeNames[0];
    }


    private _setSelectedCourse() {
        this._set_selectedCourseIndex();
        this._set_selectedCourse();
        this._set_selectedCourseHref();
    }


    private _set_selectedCourseIndex() {
        this.selectedCourseIndex = this.courseNames.indexOf(this.selectedCourseName);
    }


    private _set_selectedCourse() {
        this.selectedCourse = this.courses[this.selectedCourseIndex];
    }


    private _set_selectedCourseHref() {
        this.selectedCourseHref = this._api.getCourseHref(this.selectedCourse);
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


    private _fillAllDescriptiveData(){
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
        let ranges = [[0, 8], [9, 17], [0, 17]];
        for (let p in this.descriptiveData) {
            ranges.forEach((range) => {
                let tally = this._calculateTotalsInRange(range, this.descriptiveData[p]);
                this.descriptiveDataTotals[p].push(tally);
            });
        }
    }


    private _calculateTotalsInRange(range: number[], array: number[]) {
        return this._getTally(array.slice(range[0], (range[1] + 1)));
    }


    private _getTally(arrayToTally) {
        let sum = 0;

        for (let i = 0; i < arrayToTally.length; ++i) {
            if (isNaN(arrayToTally[i])) {
                arrayToTally[i] = 0;
            }
            sum += arrayToTally[i];
        }
        return sum;
    }


    set_totalHoleCount() {
        let keys = Object.keys(this.descriptiveData);
        this.totalHoleCount = this.descriptiveData[keys[0]].length;
    }


    private _calculateRangesBasedOn_totalHoleCount() {
        let ranges = [];
        let outRanges = [0, Math.round((this.courseService.totalHoleCount / 2) - 1)];
        ranges.push(outRanges);
        let inRanges = [Math.round(this.courseService.totalHoleCount / 2), this.courseService.totalHoleCount - 1];
        ranges.push(inRanges);
        let totalRanges = [0, this.courseService.totalHoleCount - 1];
        ranges.push(totalRanges);

        return ranges;
    }




}
