import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Subscription} from 'rxjs/Subscription';
import {ChooseComponent} from '../choose/choose.component';
import {setTimeout, setInterval} from 'timers';
import {Course} from '../../interfaces/Course.interface';

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
