import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {ActiveGameService} from '../../services/active-game.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit, OnDestroy {

    constructor(public course: CourseService,
                private _activeGame: ActiveGameService) {
    }


    ngOnInit() {
    }

    ngOnDestroy() {
        this.course.coursesSubscription.unsubscribe();
    }


    suspendGame() {
        this._activeGame.delete();
    }



}
