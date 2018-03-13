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


    constructor(private _api: ApiService,
                private _teeService: TeeService) {

        this._loadAllData();
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


    private _loadAllData() {
        this.coursesSubscription = this._api.getCourses((response: Course[]) => {
            this.courses = response;
            this._clearAndSet_courseNames();
            this._setDefaultValueFor_selectedCourseName();
            this.loadAllDataForSelectedCourse();
        });
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


}
