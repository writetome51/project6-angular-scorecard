import { Component, OnInit } from '@angular/core';
import {CourseService} from '../../services/course.service';

@Component({
  selector: 'descriptive-data',
  templateUrl: './descriptive-data.component.html',
})
export class DescriptiveDataComponent implements OnInit {

  constructor(public course: CourseService) { }

  ngOnInit() {
  }

}
