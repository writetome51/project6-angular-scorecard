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


    constructor(private _api: ApiService) {
        this.loadAllData();
    }


    loadAllData() {
        this.coursesSubscription = this._api.getCourses((response: Course[]) => {
            this.courses = response;
            this.clearAndSet_courseNames();
            this.setDefaultValueFor_selectedCourseName();
            this.loadAllDataForSelectedCourse();
        });
    }


    clearAndSet_courseNames() {
        this.clear_courseNames();
        this.set_courseNames();
    }


    clear_courseNames() {
        this.courseNames = [];
    }

    set_courseNames() {
        this.courses.forEach((course) => {
            this.courseNames.push(this._api.getCoursename(course));
        });
    }


    setDefaultValueFor_selectedCourseName() {
        if (this.selectedCourseName === '') {
            this.selectedCourseName = this.courseNames[0];
        }
    }


    loadAllDataForSelectedCourse() {
        this.setSelectedCourse();
        this.courseSubscription = this._api.getCourse(
            this.selectedCourseHref,
            (courseObject) => {
                this.selectedCourse = courseObject.course;
                this.clearAndSet_teeNames();
                this.setDefaultValueFor_selectedTeeName();
                this.loadAllDataForSelectedTee();
            }
        );
    }


    clearAndSet_teeNames() {
        this.clear_teeNames();
        this.set_teeNames();
    }


    clear_teeNames() {
        this.teeNames = [];
    }


    set_teeNames() {
        this.tee_types = this._api.getTees(this.selectedCourse);
        for (let i = 0; i < this.tee_types.length; ++i) {
            this.teeNames.push(this._api.getTeename(this.tee_types[i]));
        }
    }


    loadAllDataForSelectedTee() {
        this.setCurrentTee();
        this.set_descriptiveData();
    }


    setDefaultValueFor_selectedTeeName() {
        this.selectedTeeName = this.teeNames[0];
    }


    setSelectedCourse() {
        this.set_selectedCourseIndex();
        this.set_selectedCourse();
        this.set_selectedCourseHref();
    }


    set_selectedCourseIndex() {
        this.selectedCourseIndex = this.courseNames.indexOf(this.selectedCourseName);
    }


    set_selectedCourse() {
        this.selectedCourse = this.courses[this.selectedCourseIndex];
    }

    set_selectedCourseHref() {
        this.selectedCourseHref = this._api.getCourseHref(this.selectedCourse);
    }


    setCurrentTee() {
        this.selectedTeeIndex = this.teeNames.indexOf(this.selectedTeeName);
    }


    set_descriptiveData() {
        this.clear_descriptiveData();
        this.fill_descriptiveData();
    }


    clear_descriptiveData() {
        for (let p in this.descriptiveData) {
            this.descriptiveData[p] = [];
        }
    }


    fill_descriptiveData() {
        this._api.fill_descriptiveData(
            this.descriptiveData, this.selectedCourse, this.selectedTeeName
        );
        this.makeSureEach_descriptiveDataRow_has18Items();
    }


    makeSureEach_descriptiveDataRow_has18Items() {
        this.ifAnyItemsAreEmpty_convertThemToDashes();
        this.appendDashesToRowsUntilEachHas18Items();
    }


    ifAnyItemsAreEmpty_convertThemToDashes() {
        for (let p in this.descriptiveData) {
            this.descriptiveData[p].forEach((item, index) => {
                if (!item) {
                    this.descriptiveData[p][index] = ' - ';
                }
            });
        }
    }


    appendDashesToRowsUntilEachHas18Items() {
        for (let p in this.descriptiveData) {
            while (this.descriptiveData[p].length < 18) {
                this.descriptiveData[p].push(' - ');
            }
        }
    }


    fill_descriptiveDataTotals() {
        let ranges = [[0, 8],  [9, 17],  [0, 17]];
        for (let p in this.descriptiveData){
            this.descriptiveDataTotals[p] = [];
            ranges.forEach((range) => {
                let tally = this.calculateTotalsInRange(range, this.descriptiveData[p]);
                this.descriptiveDataTotals[p].push(tally);
            });
        }
        console.log(this.descriptiveDataTotals);
    }


    calculateTotalsInRange(range: number[], array: number[]) {
        return this.getTally(array.slice(range[0], (range[1] + 1)));
    }


    getTally(arrayToTally) {
        let sum = 0;

        for (let i = 0; i < arrayToTally.length; ++i) {
            if (isNaN(arrayToTally[i])) {
                arrayToTally[i] = 0;
            }
            sum += arrayToTally[i];
        }
        return sum;
    }


}
