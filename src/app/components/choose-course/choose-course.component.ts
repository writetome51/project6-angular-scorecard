import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Course} from '../../interfaces/Course.interface';
import {ActiveGameService} from '../../services/active-game.service';
import {Subscription} from 'rxjs/Subscription';
import {ChooseComponent} from '../choose/choose.component';
import {Observable} from 'rxjs/Observable';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit, OnDestroy {


    subscription: Subscription;


    constructor(public courseService: CourseService,
                private _activeGame: ActiveGameService) {
    }


    ngOnInit() {

    }

    ngOnDestroy() {
        this.courseService.coursesSubscription.unsubscribe();
    }


    suspendGame() {
        this._activeGame.delete();
    }



}
