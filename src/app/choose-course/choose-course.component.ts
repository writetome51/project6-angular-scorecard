import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html',
    styleUrls: ['./choose-course.component.css']
})
export class ChooseCourseComponent implements OnInit {

    selectedCourse = '';
    courses = [];

    constructor() {
    }

    ngOnInit() {
    }

}
