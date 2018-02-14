import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'choose-tee',
  templateUrl: './choose-tee.component.html'
})
export class ChooseTeeComponent implements OnInit {

    tees = [];
    selectedTee = '';
    tee_types;

  constructor( private _courseService: CourseService) { }

  ngOnInit() {
  }


    updateCells(){
      /***
        loadCurrentTee();
        loadDataOfCurrentTeeForEachHole();
        fillTeeRow();
        fillParRow();
        fillHandicapRow();
       ***/
    }


  /******

    loadTeeTypes(){
        teeTypes = this._courseService.selectedCourse.tee_types;
    }

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
