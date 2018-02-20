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

    teeNames = [];
    selectedTee = '';
    tee_types;
    selectedCourseNameSubscription: Subscription;
    selectedCourseSubscription: Subscription;
    subscription: Subscription;
    selectedCourse: Course;

    constructor(public courseService: CourseService) {
    }

    ngOnInit() {
        this.set_teeTypes();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.selectedCourseSubscription.unsubscribe();
    }


    updateCells() {
        /***
         loadCurrentTee();
         loadDataOfCurrentTeeForEachHole();
         fillTeeRow();
         fillParRow();
         fillHandicapRow();
         ***/
    }


    set_teeTypes() {
        this.subscription = this._courseService.selectedCourseHref
            .subscribe((response) => {
                this.set_selectedCourse(response);
            });
    }


    set_selectedCourse(href) {
        this.selectedCourseSubscription = this._courseService.getCourse(href)
            .subscribe((response) => {
                this.selectedCourse = response.course;
                this.tee_types = this.selectedCourse.tee_types;
                this.set_teeNames();
            });
    }


    set_teeNames() {
        for (let i = 0; i < this.tee_types.length; ++i) {
            this.teeNames.push(this.tee_types[i].tee_type);
        }

    }


}
