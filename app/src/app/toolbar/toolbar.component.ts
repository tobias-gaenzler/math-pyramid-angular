import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrl: './toolbar.component.scss',
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        AppRoutingModule,
        BrowserModule
    ]
})
export class ToolbarComponent {
    title = 'Math Pyramid';

    constructor(private userService: UserService) {
    }

    getUserName() {
        return this.userService.getUserName()
    }
}
