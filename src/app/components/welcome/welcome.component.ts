import { Component } from "@angular/core";
import { animate, state, style, transition, trigger, keyframes } from "@angular/animations";
import { AngularFireAuth } from "angularfire2/auth";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  selector: 'welcome',
  template: `
    <h1>Welcome!</h1>
    <div>
        <!--
      <form>
          <input matInput placeholder="Email" type="email" name="email" >

          <input matInput placeholder="Password" type="password" name="password">
      </form>
       -->
      <button style="margin-left: 100px" 
              mat-raised-button 
              color="primary" 
             
              (click)="logIn()">Log in</button>
    </div>
  `
})

export class WelcomeComponent {

  email: string;
  password: string;
  state = "small";

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


  toggleState() {
    this.state = this.state === "small" ? "large" : "small";
  }

}
