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
    selectedTeename: string;
    selectedTee = '';
    selectedTeeIndex = 0;
    tee_types: any[];
    descriptiveData = {
        yards: [],
        par: [],
        hcp: []
    };


    constructor(private _api: ApiService) {
        this.coursesSubscription = this._api.getCourses((response) => {
            this.courses = response.courses;
            this.set_courseNames();
            this.setDefaultValueFor_selectedCourseName();
            this.setSelectedCourse();
            this._api.getCourse(
                this.selectedCourseHref,
                (courseObject) => {
                    this.selectedCourse = courseObject.course;
                    this.tee_types = this.selectedCourse.tee_types;
                    this.set_teeNames();
                }
            );
        });


    }


    set_teeNames() {
        for (let i = 0; i < this.tee_types.length; ++i) {
            this.teeNames.push(this.tee_types[i].tee_type);
        }
    }


    set_courseNames() {
        this.courses.forEach((course) => {
            this.courseNames.push(course.name);
        });
    }


    setDefaultValueFor_selectedCourseName() {
        if (this.selectedCourseName === '') {
            this.selectedCourseName = this.courseNames[0];
        }
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


    updateCells() {
        this.setCurrentTee();
        this.loaddescriptiveData();
    }


    setCurrentTee() {
        this.selectedTeeIndex = this.teeNames.indexOf(this.selectedTeename);
        this.selectedTeename = this.teeNames[this.selectedTeeIndex];
    }


    loaddescriptiveData() {
        this.cleardescriptiveData();
        this.filldescriptiveData();
    }


    cleardescriptiveData() {
        for (let p in this.descriptiveData) {
            this.descriptiveData[p] = [];
        }
    }


    filldescriptiveData() {
        for (let hole = 0, thisHole; hole < this.selectedCourse.holes.length; ++hole) {
            thisHole = this.selectedCourse.holes[hole];

            this.findCorrectTeeBoxAndGetDataFor(thisHole);
        }

        this.appendDashesTodescriptiveDataUntilAllHave18Items();
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


    appendDashesTodescriptiveDataUntilAllHave18Items() {
        for (let p in this.descriptiveData) {
            while (this.descriptiveData[p].length < 18) {
                this.descriptiveData[p].push(' - ');
            }
        }
    }


}
