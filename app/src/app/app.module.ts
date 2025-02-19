import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { PlayModule } from './play/play.module';
import { PageNotFoundModule } from './page-not-found/page.not.found.module';
import { HelpPageModule } from './help-page/help.page.module';
import { ConfigModule } from './config/config.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CoreModule.forRoot(),
        AppRoutingModule,
        NoopAnimationsModule,
        PlayModule,
        PageNotFoundModule,
        HelpPageModule,
        ConfigModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ToolbarComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
