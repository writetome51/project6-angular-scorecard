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
        this.courses = this._courseService.getCourses();
    }

    ngOnInit() {
    }

}
