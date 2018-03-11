import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';


@Component({
    selector: 'scorecard',
    templateUrl: './scorecard.component.html',
})

export class ScorecardComponent implements OnInit {

    gopher = environment.gopher;


    constructor() {
    }

    ngOnInit() {
    }

}
