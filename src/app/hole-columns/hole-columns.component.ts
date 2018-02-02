import { Component, OnInit } from '@angular/core';
import {isNumber} from 'util';

@Component({
  selector: 'hole-columns',
  templateUrl: './hole-columns.component.html'
})
export class HoleColumnsComponent implements OnInit {

    columnIDs = [
        '1', '2', '3', '4',
        '5', '6', '7', '8',
        '9', 'out', '10', '11',
        '12', '13', '14', '15',
        '16', '17', '18', 'in', 'total'
    ];

    nonPlayerRows = [
        'yards', 'par', 'hcp'
    ];

  constructor() { }

  ngOnInit() {
  }

  getColumnIDForHTML(id){
      let prefix = 'hole-';
      let suffix = '-column';
      if (isNaN(id)){ return id + suffix; }
      else{
          return (prefix + id + suffix);
      }
  }



  isTotalColumn(id) {
      return (id === 'out' || id === 'in' || id === 'total');
  }

}
