import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {Course} from '../interfaces/Course.interface';


@Injectable()

export class CourseService {

    coursesUrl = 'https://golf-courses-api.herokuapp.com/courses';
    localObj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};
    courses: Course[] = [];
    courseNames = [];
    selectedCourseNameObservable: Observable<string>;
    selectedCourse: Course = {href: '', name: '', id: 0};
    selectedCourseObservable: Observable<any>;
    selectedCourseHref: Observable<string>;
    subscription: Subscription;
    selectedCourseName = '';
    selectedCourseIndex = 0;


    constructor(private _http: HttpClient) {
        this.selectedCourseNameObservable = new Observable((observer) => {
            observer.next(this.selectedCourseName);
            observer.complete();
        });

        this.selectedCourseHref = new Observable((observer) => {
            observer.next(this.selectedCourse.href);
            observer.complete();
        });
    }


    setSelectedCourse() {
        this.set_selectedCourseIndex();
        this.set_selectedCourse();
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





    set_selectedCourseIndex() {
        this.selectedCourseIndex = this.courseNames.indexOf(this.selectedCourseName);
    }


    set_selectedCourse() {
        this.selectedCourse = this.courses[this.selectedCourseIndex];
    }






    getCourses(functionThatManipulatesResponse): Subscription {
        let observable = this._http.post(this.coursesUrl, this.localObj);
        return observable.subscribe(functionThatManipulatesResponse);
    }

    getCourse(href): Observable<any> {
        return this._http.get(href);
    }





}
