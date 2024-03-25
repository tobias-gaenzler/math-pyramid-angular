import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from "./app-routing.module";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { PlayModule } from "./play/play.module";
import { PageNotFoundModule } from "./page-not-found/page.not.found.module";
import { HelpPageModule } from "./help-page/help.page.module";
import { ConfigModule } from "./config/config.module";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        BrowserModule,
        CoreModule,
        CoreModule.forRoot(),
        AppRoutingModule,
        NoopAnimationsModule,
        PlayModule,
        PageNotFoundModule,
        HelpPageModule,
        ConfigModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {
}
