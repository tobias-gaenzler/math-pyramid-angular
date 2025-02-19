import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HelpPageComponent } from './help-page/help-page.component';
import { PlayComponent } from './play/play.component';
import { ConfigComponent } from './config/config.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: '', redirectTo: '/play', pathMatch: 'full' },
    { path: 'help', component: HelpPageComponent },
    { path: 'play', component: PlayComponent },
    { path: 'config', component: ConfigComponent },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
