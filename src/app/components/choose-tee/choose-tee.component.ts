import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'choose-tee',
    templateUrl: './choose-tee.component.html'
})
export class ChooseTeeComponent implements OnInit, OnDestroy {

    tees = [];
    selectedTee = '';
    tee_types;
    subscription: Subscription;

    constructor(private _courseService: CourseService) {
    }

    ngOnInit() {
        this.loadTeeTypes();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
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


    loadTeeTypes() {
       this._courseService.selectedCourseHref;


        //  console.log(this.tee_types);
    }


    /******


     loadTeeNames(){
        teeNames=[];
        for (var i=0; i < teeTypes.length;  ++i){
            teeNames.push(teeTypes[i].tee_type);
        }
    }

     loadCurrentTee(){
        loadCurrentTeeIndex();
        loadCurrentTeeName();
    }


     loadCurrentTeeIndex(){
        currentTeeIndex =  $('#tee-name-options').val();
    }


     loadCurrentTeeName(){
        currentTeeName = teeNames[currentTeeIndex];
    }


     *******/


}
