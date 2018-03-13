import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {TeeService} from '../../services/tee.service';
import {DescriptiveDataService} from '../../services/descriptive-data.service';

@Component({
    selector: 'choose-tee',
    templateUrl: './choose-tee.component.html'
})
export class ChooseTeeComponent implements OnInit, OnDestroy {

    constructor(public courseService: CourseService,
                public teeService: TeeService,
                public descriptiveData: DescriptiveDataService) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.courseService.courseSubscription.unsubscribe();
    }


}
