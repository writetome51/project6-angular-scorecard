import {Component, OnDestroy, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Subscription} from 'rxjs/Subscription';
import {ChooseComponent} from '../choose/choose.component';
import {setTimeout, setInterval} from 'timers';

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
      //  this._waitFor_selectedCourseHref_toBeSet();
        this.loadTeeTypes();
    }

    ngOnDestroy() {
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
