import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'choose-tee',
  templateUrl: './choose-tee.component.html',
  styleUrls: ['./choose-tee.component.css']
})
export class ChooseTeeComponent implements OnInit {

    tees = [];
    selectedTee = '';

  constructor() { }

  ngOnInit() {
  }

}
