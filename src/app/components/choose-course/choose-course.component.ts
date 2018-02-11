import {Component, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
    selector: 'choose-course',
    templateUrl: './choose-course.component.html'
})

export class ChooseCourseComponent implements OnInit {

    selectedCourse = '';
    selectedCourseIndex = 0;
    selectedCourseHref = '';
    courses: object[] = [];
    courseNames = [];
    course: object;
    selectedTee = '';


    constructor(private _courseService: CourseService) {
    }

    ngOnInit() {
        this._courseService.getCourses((courses) => {
            this.courses = courses.courses;
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
               this.course = course;
           }
       );

            this.loadTeeTypes();
            loadTeeNames();
            loadTeeNameOptions();
            updateCells();

    }


    loadTeeTypes(){
        teeTypes = course.tee_types;
    }

    loadTeeNames(){
        teeNames=[];
        for (var i=0; i < teeTypes.length;  ++i){
            teeNames.push(teeTypes[i].tee_type);
        }
    }

    updateCells(){
        loadCurrentTee();
        loadDataOfCurrentTeeForEachHole();
        fillTeeRow();
        fillParRow();
        fillHandicapRow();
    }

    function loadCurrentTee(){
        loadCurrentTeeIndex();
        loadCurrentTeeName();
    }


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


    function loadCurrentTeeIndex(){
        currentTeeIndex =  $('#tee-name-options').val();
    }


    function loadCurrentTeeName(){
        currentTeeName = teeNames[currentTeeIndex];
    }



    suspendGame(){}



}
