import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'descriptive-data',
  templateUrl: './descriptive-data.component.html',
})
export class DescriptiveDataComponent implements OnInit {

    labels = [];

  constructor(public course: CourseService) { }

  ngOnInit() {
      this.labels = Object.keys(this.course.teeService.descriptiveData);
  }


  chooseIDBasedOn(label){
      if (label === 'yards'){
          return 'tee-name-options-cell';
      }
      else{ return label + '-column-1'; }
  }

}
