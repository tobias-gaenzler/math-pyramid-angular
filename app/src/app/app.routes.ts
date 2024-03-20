import { Routes } from '@angular/router';
import {HelpPageComponent} from "./help-page/help-page.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {PlayComponent} from "./play/play.component";
import {ConfigComponent} from "./config/config.component";

export const routes: Routes = [
    { path: 'help', component: HelpPageComponent },
    { path: 'play', component: PlayComponent },
    { path: 'config', component: ConfigComponent },
    { path: '',   redirectTo: '/play', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];


