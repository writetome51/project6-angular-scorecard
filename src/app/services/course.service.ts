import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class CourseService {

    coursesUrl = 'https://golf-courses-api.herokuapp.com/courses';
    currentCourseHref: '';
    localObj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};


    constructor(private _http: HttpClient) {
    }

    getCourses(functionThatManipulatesResponse) {
        let observable = this._http.post(this.coursesUrl, this.localObj);
        observable.subscribe(functionThatManipulatesResponse);
    }

    getCourse(url): object {
        return {};
    }


}
