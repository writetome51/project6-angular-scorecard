import { Component } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'welcome',
  templateUrl: 'welcome.component.html'
})

export class WelcomeComponent {

    email = '';
    password = '';


  constructor(private angularFireAuth: AngularFireAuth) {
    this.angularFireAuth.auth.signOut();

    this.angularFireAuth.authState.subscribe(state => {
    //  console.log(state + '  blah blah!!!');
    });
  }


  logIn() {
    this.angularFireAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .then(data => {
        console.log(data + ' this was data!!!!!!!!!!!!!!!!!!');
      });
  }

  subscribe() {

  }



}
