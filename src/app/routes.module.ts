import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ScorecardComponent} from './components/scorecard/scorecard.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {path: 'game', component: ScorecardComponent},
        ])
    ],
    declarations: []
})

export class RoutesModule {
}
