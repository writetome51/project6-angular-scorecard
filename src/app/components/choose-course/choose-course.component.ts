import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit {

    selectedCourse = '';
    courses = [];

    constructor(private _courseService: CourseService) {
    }

    ngOnInit() {
        this._courseService.getCourses((courses) => {
            this.courses = courses.courses;
        });
    }


    loadCourseNames(){
        for (let p in courses.courses){
          //  courseNames.push(courses.courses[p].name);
        }
    }


    suspendGame(){}

}
