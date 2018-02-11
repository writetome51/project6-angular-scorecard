import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class CourseService {

    coursesUrl = 'https://golf-courses-api.herokuapp.com/courses';
    localObj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};
    selectedCourse: object;


    constructor(private _http: HttpClient) {
    }

    getCourses(functionThatManipulatesResponse) {
        let observable = this._http.post(this.coursesUrl, this.localObj);
        observable.subscribe(functionThatManipulatesResponse);
    }

    getCourse(url, functionThatManipulatesResponse) {
        let observable = this._http.get(url);
        observable.subscribe(functionThatManipulatesResponse);
    }



}
