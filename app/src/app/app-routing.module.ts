import {NgModule} from '@angular/core';
import {RouterModule, RouterOutlet, Routes} from '@angular/router';
import {HelpPageComponent} from "./help-page/help-page.component";
import {PlayComponent} from "./play/play.component";
import {ConfigComponent} from "./config/config.component";
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";

export const routes: Routes = [
    { path: '',   redirectTo: '/play', pathMatch: 'full' },
    { path: 'help', component: HelpPageComponent },
    { path: 'play', component: PlayComponent },
    { path: 'config', component: ConfigComponent },
    { path: '**', component: PageNotFoundComponent },
    // {path: 'crisis', loadChildren: 'app/crisis/crisis.module#CrisisModule'},
    // {path: 'heroes', loadChildren: 'app/hero/hero.module#HeroModule'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes), RouterOutlet],
    exports: [RouterModule, RouterOutlet]
})
export class AppRoutingModule {
}
