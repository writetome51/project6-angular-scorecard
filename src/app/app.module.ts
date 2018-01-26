import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CourseService} from './course.service';
import {FormsModule} from '@angular/forms';
import { ChooseCourseComponent } from './choose-course/choose-course.component';
import { ScorecardComponent } from './scorecard/scorecard.component';


@NgModule({
    declarations: [
        AppComponent,
        ChooseCourseComponent,
        ScorecardComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [CourseService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
