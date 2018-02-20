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
    selectedTeename = '';
    selectedTee = '';
    selectedTeeIndex = 0;
    tee_types: any[];
    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };


    constructor(private _api: ApiService) {
        this.loadAllData();
    }


    loadAllData(){
        this.coursesSubscription = this._api.getCourses((response: Course[]) => {
            this.courses = response;
            this.clearAndSet_courseNames();
            this.setDefaultValueFor_selectedCourseName();
            this.getCourseData();
        });
    }


    clearAndSet_courseNames(){
        this.clear_courseNames();
        this.set_courseNames();
    }


    clear_courseNames(){
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


    getCourseData(){
        this.setSelectedCourse();
        this.courseSubscription = this._api.getCourse(
            this.selectedCourseHref,
            (courseObject) => {
                this.selectedCourse = courseObject.course;
                this.tee_types = this._api.getTees(this.selectedCourse);
                this.clearAndSet_teeNames();
                this.setDefaultValueFor_selectedTeename();
                this.getTeeData();
            }
        );
    }


    clearAndSet_teeNames(){
        this.clear_teeNames();
        this.set_teeNames();
    }


    clear_teeNames(){
        this.teeNames = [];
    }


    set_teeNames() {
        for (let i = 0; i < this.tee_types.length; ++i) {
            this.teeNames.push(this._api.getTeename(this.tee_types[i]));
        }
    }


    getTeeData(){
        this.setCurrentTee();
        this.set_descriptiveData();
    }


    setDefaultValueFor_selectedTeename() {
        this.selectedTeename = this.teeNames[0];
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
        this.selectedCourseHref = this.selectedCourse.href;
    }


    setCurrentTee() {
        this.selectedTeeIndex = this.teeNames.indexOf(this.selectedTeename);
        this.selectedTeename = this.teeNames[this.selectedTeeIndex];
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
        for (let hole = 0, thisHole; hole < this.selectedCourse.holes.length; ++hole) {
            thisHole = this.selectedCourse.holes[hole];

            this.findCorrectTeeBoxAndGetDataFor(thisHole);
        }

        this.makeSureEach_descriptiveDataRow_has18Items();
    }


    findCorrectTeeBoxAndGetDataFor(thisHole) {
        for (let tee_box = 0, currentTee; tee_box < thisHole.tee_boxes.length; ++tee_box) {
            currentTee = thisHole.tee_boxes[tee_box];
            if (currentTee.tee_type === this.selectedTeename) {
                for (let p in this.descriptiveData) {
                    this.descriptiveData[p].push(currentTee[p]);
                }

                break;
            }
        }
    }





    makeSureEach_descriptiveDataRow_has18Items() {
        for (let p in this.descriptiveData){
            this.descriptiveData[p].forEach((item, index) => {
                if ( ! item){
                    this.descriptiveData[p][index] = ' - ';
                }
            });
        }

        for (let p in this.descriptiveData) {
            while (this.descriptiveData[p].length < 18) {
                this.descriptiveData[p].push(' - ');
            }
        }
        console.log(this.descriptiveData);
    }


}
