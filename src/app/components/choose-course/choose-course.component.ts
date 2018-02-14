import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Course} from '../../interfaces/Course.interface';
import {ActiveGameService} from '../../services/active-game.service';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit {

    selectedCourseName = '';
    selectedCourseIndex = 0;
    selectedCourseHref = '';
    courses: Course[] = [];
    courseNames = [];
  //  course: object;


    constructor(private _courseService: CourseService,
                private _activeGame: ActiveGameService) {
    }

    ngOnInit() {
        this._courseService.getCourses((courses) => {
            this.courses = courses.courses;
            this.setCourseNames();
            if (this.selectedCourseName === ''){
                this.selectedCourseName = this.courseNames[0];
            }
            console.log(this.courseNames);
            this.setSelectedCourse();
        });
    }


    setCourseNames(){
        this.courses.forEach((course) => {
            this.courseNames.push(course.name);
        });
    }


    setSelectedCourse(){

        console.log(this.selectedCourseName);
        this.setSelectedCourseIndex();
        console.log(this.selectedCourseIndex);
        this.setSelectedCourseHref();
        this.setCourse();
    }


    setSelectedCourseIndex(){
        this.selectedCourseIndex = this.courseNames.indexOf(this.selectedCourseName);
    }


    setSelectedCourseHref(){
        let currentCourse = this.courses[this.selectedCourseIndex];
        console.log(currentCourse);
        this.selectedCourseHref = currentCourse.href;
    }


    setCourse(){
       this._courseService.getCourse(
           this.selectedCourseHref,
           (course) => {
               this._courseService.selectedCourse = course;
           }
       );
    }


    suspendGame(){
        this._activeGame.delete();
    }


    /***********
     this.loadTeeTypes();
     loadTeeNames();
     loadTeeNameOptions();
     updateCells();
     ********/



    /*********

     *********/

    /*********

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
