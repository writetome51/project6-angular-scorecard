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
        this.set_teeTypes();
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


    set_teeTypes() {
        this.subscription = this._courseService.selectedCourseHref
            .subscribe((response) => {
                this.tee_types = response;
            });
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
