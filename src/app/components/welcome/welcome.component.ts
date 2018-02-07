import {Component, OnInit} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {GameService} from '../../services/game.service';



@Component({
    selector: 'welcome',
    templateUrl: 'welcome.component.html'
})

export class WelcomeComponent implements OnInit{

    email = '';
    password = '';
    selectOptions: string[];


    constructor(private angularFireAuth: AngularFireAuth, private _game: GameService) {
    }


    ngOnInit(): OnInit {
    }

}
