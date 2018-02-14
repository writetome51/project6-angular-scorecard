import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Course} from '../../interfaces/Course.interface';
import {ActiveGameService} from '../../services/active-game.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit, OnDestroy {

    selectedCourseName = '';
    selectedCourseIndex = 0;
    selectedCourseHref = '';
    selectedCourse: Course;
    courses: Course[] = [];
    courseNames = [];
    subscription: Subscription;


    constructor(private _courseService: CourseService,
                private _activeGame: ActiveGameService) {
    }


    ngOnInit() {
        this.subscription = this._courseService.getCourses((courses) => {
            this.courses = courses.courses;
            this.set_courseNames();
            this.setDefaultValueFor_selectedCourseName();
            this.setSelectedCourse();
        });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();

    }


    set_courseNames(){
        this.courses.forEach((course) => {
            this.courseNames.push(course.name);
        });
    }


    setDefaultValueFor_selectedCourseName(){
        if (this.selectedCourseName === ''){
            this.selectedCourseName = this.courseNames[0];
        }
    }


    setSelectedCourse(){
        this.set_selectedCourseIndex();
        this.set_selectedCourseHref();
    }


    set_selectedCourseIndex(){
        this.selectedCourseIndex = this.courseNames.indexOf(this.selectedCourseName);
    }


    set_selectedCourseHref(){
        let currentCourse = this.courses[this.selectedCourseIndex];
        this._courseService.selectedCourseHref = currentCourse.href;
    }



    suspendGame(){
        this._activeGame.delete();
    }


    /***********

     this.loadTeeTypes();
     loadTeeNames();
     loadTeeNameOptions();
     updateCells();


     function fillTeeRow(){
        fillHoleCells('tee-row', yardagesOfCurrentTeeForEachHole);
        fillAllTeeTotals();
    }


     function fillParRow(){
        fillHoleCells('par-row', parOfCurrentTeeForEachHole);
        fillAllParTotals();
    }


     function fillHandicapRow(){
        fillHoleCells('handicap-row', hcpOfCurrentTeeForEachHole);
        fillAllHandicapTotals();
    }

     ***********/



}
