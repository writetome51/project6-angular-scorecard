import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Course} from '../interfaces/Course.interface';
import {ApiService} from './api.service';
import {TotalsCalculatorService} from './totals-calculator.service';
import {TeeService} from './tee.service';


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
    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };
    descriptiveDataTotals = {};


    constructor(private _api: ApiService,
                private _teeService: TeeService,
                private _totalsCalc: TotalsCalculatorService) {

        this._loadAllData();
    }


    private _loadAllData() {
        this.coursesSubscription = this._api.getCourses((response: Course[]) => {
            this.courses = response;
            this._clearAndSet_courseNames();
            this._setDefaultValueFor_selectedCourseName();
            this.loadAllDataForSelectedCourse();
        });
    }


    public loadAllDataForSelectedCourse() {
        this._setSelectedCourse();
        this.courseSubscription = this._api.getCourse(
            this.selectedCourseHref,
            (course) => {
                this.selectedCourse = course;
                this._teeService.loadAllData(this.selectedCourse);
            }
        );
    }


    private _clearAndSet_courseNames() {
        this.courseNames = [];
        this._set_courseNames();
    }


    private _setDefaultValueFor_selectedCourseName() {
        if (this.selectedCourseName === '') {
            this.selectedCourseName = this.courseNames[0];
        }
    }


    private _set_courseNames() {
        this.courses.forEach((course) => {
            this.courseNames.push(this._api.getCoursename(course));
        });
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
