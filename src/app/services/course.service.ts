import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Course} from '../interfaces/Course.interface';
import {ApiService} from './api.service';
import {TeeService} from './tee.service';


@Injectable()

export class CourseService {

    courses: Course[] = [];
    names = [];
    selected: Course;
    selectedHref: string;
    coursesSubscription: Subscription;
    courseSubscription: Subscription;
    selectedName = '';
    selectedIndex = 0;


    constructor(private _api: ApiService,
                public tee: TeeService) {

        this._loadAllData();
    }


    public loadAllDataForSelectedCourse() {
        this._setSelected();
        this.courseSubscription = this._api.getCourse(
            this.selectedHref,
            (course) => {
                this.selected = course;
                this.tee.loadAllData(this.selected);
            }
        );
    }


    private _loadAllData() {
        this.coursesSubscription = this._api.getCourses((response: Course[]) => {
            this.courses = response;
            this._clearAndSet_names();
            this._setDefaultValueFor_selectedName();
            this.loadAllDataForSelectedCourse();
        });
    }


    private _clearAndSet_names() {
        this.names = [];
        this._set_names();
    }


    private _setDefaultValueFor_selectedName() {
        if (this.selectedName === '') {
            this.selectedName = this.names[0];
        }
    }


    private _set_names() {
        this.courses.forEach((course) => {
            this.names.push(this._api.getCoursename(course));
        });
    }


    private _setSelected() {
        this.selectedIndex = this.names.indexOf(this.selectedName);
        this.selected = this.courses[this.selectedIndex];
        this.selectedHref = this._api.getCourseHref(this.selected);
    }


}
