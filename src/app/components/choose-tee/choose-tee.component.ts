import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
    selector: 'choose-tee',
    templateUrl: './choose-tee.component.html'
})
export class ChooseTeeComponent implements OnInit, OnDestroy {

    constructor(public courseService: CourseService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.courseService.courseSubscription.unsubscribe();
    }


}
