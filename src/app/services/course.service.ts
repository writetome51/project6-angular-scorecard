import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Course} from '../interfaces/Course.interface';
import {ApiService} from './api.service';
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
                public teeService: TeeService) {

        this._loadAllData();
    }


    public loadAllDataForSelectedCourse() {
        this._setSelectedCourse();
        this.courseSubscription = this._api.getCourse(
            this.selectedCourseHref,
            (course) => {
                this.selectedCourse = course;
                this.teeService.loadAllData(this.selectedCourse);
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
        this.selectedCourseIndex = this.courseNames.indexOf(this.selectedCourseName);
        this.selectedCourse = this.courses[this.selectedCourseIndex];
        this.selectedCourseHref = this._api.getCourseHref(this.selectedCourse);
    }


}
