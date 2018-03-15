import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
    selector: 'descriptive-data',
    templateUrl: './descriptive-data.component.html',
})
export class DescriptiveDataComponent implements OnInit, OnDestroy {

    labels = [];

    constructor(public course: CourseService) {
    }

    ngOnInit() {
        this.labels = Object.keys(this.course.tee.metadata);
    }

    ngOnDestroy() {
        this.course.courseSubscription.unsubscribe();
    }


}
