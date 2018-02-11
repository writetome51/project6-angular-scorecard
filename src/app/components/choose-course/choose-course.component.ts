import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Course} from '../../interfaces/Course.interface';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit {

    selectedCourse = '';
    selectedCourseIndex = 0;
    selectedCourseHref = '';
    courses: Course[] = [];
    courseNames = [];
  //  course: object;


    constructor(private _courseService: CourseService) {
    }

    ngOnInit() {
        this._courseService.getCourses((courses) => {
            this.courses = courses.courses;
            console.log(this.courses);
            this.setCourseNames();
            this.updateTeesAndCells();
        });
    }


    setCourseNames(){
        this.courses.forEach((course) => {
            this.courseNames.push(course.name);
        });
    }


    updateTeesAndCells(){
        this.setSelectedCourseIndex();
        this.setSelectedCourseHref();
        this.setCourse();
    }


    setSelectedCourseIndex(){
        this.selectedCourseIndex = this.courseNames.indexOf(this.selectedCourse);
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
/***********
            this.loadTeeTypes();
            loadTeeNames();
            loadTeeNameOptions();
            updateCells();
 ********/

    }

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

    suspendGame(){}



}
