import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {WelcomeComponent} from './components/welcome/welcome.component';
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {AngularFireStorageModule} from 'angularfire2/storage';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AppComponent} from './app.component';
import {ChooseCourseComponent} from './components/choose-course/choose-course.component';
import {ScorecardComponent} from './components/scorecard/scorecard.component';
import {ChooseTeeComponent} from './components/choose-tee/choose-tee.component';
import {PlayerNamesComponent} from './components/player-names/player-names.component';
import {CourseService} from './services/course.service';
import {PlayersService} from './services/players.service';
import { LabelColumnComponent } from './components/label-column/label-column.component';
import { HoleColumnsComponent } from './components/hole-columns/hole-columns.component';
import {GameService} from './services/game.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {PlayerNumbersService} from './services/player-numbers.service';
import {GameModule} from './game/game.module';
import {ActiveGameService} from './services/active-game.service';
import { ChooseComponent } from './components/choose/choose.component';
import {ApiService} from './services/api.service';


@NgModule({
    declarations: [
        AppComponent,
        ChooseCourseComponent,
        ScorecardComponent,
        ChooseTeeComponent,
        PlayerNamesComponent,
        LabelColumnComponent,
        WelcomeComponent,
        HoleColumnsComponent,
        ChooseComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot([
            {path: 'welcome', component: WelcomeComponent},
            {path: '', redirectTo: 'welcome', pathMatch: 'full'},
            {path: '**', redirectTo: 'welcome', pathMatch: 'full'}
        ]),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule, // imports firebase/firestore, only needed for database features
        AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
        AngularFireStorageModule,
        GameModule
    ],
    providers: [ PlayersService, CourseService, ApiService,
                PlayerNumbersService, GameService, ActiveGameService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
