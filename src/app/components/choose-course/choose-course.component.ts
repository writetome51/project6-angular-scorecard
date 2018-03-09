import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {ActiveGameService} from '../../services/active-game.service';
import {Subscription} from 'rxjs/Subscription';

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
