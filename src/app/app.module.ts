import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';


import {AppComponent} from './app.component';
import { ChooseCourseComponent } from './choose-course/choose-course.component';
import { ScorecardComponent } from './scorecard/scorecard.component';
import { ChooseTeeComponent } from './choose-tee/choose-tee.component';
import { PlayerNamesComponent } from './player-names/player-names.component';

import {CourseService} from './course.service';
import {PlayersService} from './players.service';


@NgModule({
    declarations: [
        AppComponent,
        ChooseCourseComponent,
        ScorecardComponent,
        ChooseTeeComponent,
        PlayerNamesComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule
    ],
    providers: [CourseService, PlayersService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
