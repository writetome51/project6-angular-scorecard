import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';


@Injectable()

export class CourseService {

    coursesUrl = 'https://golf-courses-api.herokuapp.com/courses';
    localObj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};
    selectedCourse: object;
    selectedCourseObservable: Observable<any>;
    selectedCourseHref;


    constructor(private _http: HttpClient) {
    }

    getCourses(functionThatManipulatesResponse): Subscription {
        let observable = this._http.post(this.coursesUrl, this.localObj);
        return observable.subscribe(functionThatManipulatesResponse);
    }

    getCourse(): Observable<any> {
        return this._http.get(this.selectedCourseHref);
    }


}
