import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';



@Injectable()

export class ApiService {

    coursesUrl = 'https://golf-courses-api.herokuapp.com/courses';
    localObj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};


    constructor(private _http: HttpClient) {
    }


    getCourses(functionThatManipulatesResponse): Subscription {
        let observable = this._http.post(this.coursesUrl, this.localObj);
        return observable.subscribe(functionThatManipulatesResponse);
    }

    getCourse(href, functionThatManipulatesResponse): Subscription{
        return this._http.get(href)
            .subscribe(functionThatManipulatesResponse);
    }


}
