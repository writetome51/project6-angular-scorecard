import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs/Subscription';
import {Course} from '../interfaces/Course.interface';
import {SpecificCourseResult} from '../interfaces/Course.interface copy';



@Injectable()

export class ApiService {

    coursesUrl = 'https://golf-courses-api.herokuapp.com/courses';
    localObj = {latitude: 40.4426135, longitude: -111.8631116, radius: 100};


    constructor(private _http: HttpClient) {
    }


    getCourses(observer): Subscription {
        let observable = this._http.post(this.coursesUrl, this.localObj);
        return observable.subscribe((response: any) => {
            let courses = response.courses;
            observer(courses);
        });
    }

    getCourse(href, observer): Subscription{
        return this._http.get(href).subscribe((response: SpecificCourseResult) => {
            observer(response.course);
        });
    }


    getCoursename(course: Course){
        return course.name;
    }

    getCourseHref(course: Course){
        return course.href;
    }

    getTeename(tee){
        return tee.tee_type;
    }

    getTees(course: Course): object[]{
        return course.tee_types;
    }


    fill_descriptiveData(descriptiveData, selectedCourse, selectedTeeName) {
        for (let hole = 0, thisHole; hole < selectedCourse.holes.length; ++hole) {
            thisHole = selectedCourse.holes[hole];

            this.findCorrectTeeBoxAndGetDataFor(descriptiveData, thisHole, selectedTeeName);
        }
    }


    findCorrectTeeBoxAndGetDataFor(descriptiveData, thisHole, selectedTeeName) {
        for (let tee_box = 0, currentTee; tee_box < thisHole.tee_boxes.length; ++tee_box) {
            currentTee = thisHole.tee_boxes[tee_box];
            if (currentTee.tee_type === selectedTeeName) {
                for (let p in descriptiveData) {
                    descriptiveData[p].push(currentTee[p]);
                }
                break;
            }
        }
    }



}
