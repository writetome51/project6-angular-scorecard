import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit {

    selectedCourse = '';
    courses = [];
    courseNames = [];

    constructor(private _courseService: CourseService) {
    }

    ngOnInit() {
        this._courseService.getCourses((courses) => {
            this.courses = courses.courses;
            this.setCourseNames();
            console.log(this.courseNames);
        });
    }


    setCourseNames(){
        this.courses.forEach((course) => {
            this.courseNames.push(course.name);
        });
    }


    suspendGame(){}

}
