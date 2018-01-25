import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {CourseService} from './course.service';


@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule
    ],
    providers: [CourseService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
