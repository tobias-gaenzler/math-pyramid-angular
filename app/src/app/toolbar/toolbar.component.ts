import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { UserService } from '../service/user.service';
import { AppRoutingModule } from '../app-routing.module';
import { UserNameDialog } from './user-name-dialog';
import { WebsocketService } from '../service/web-socket.service';

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    standalone: true,
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        AppRoutingModule,
        BrowserModule,
        MatDialogModule
    ]
})
export class ToolbarComponent {
    title: string = 'Math Pyramid';
    name: string;

    constructor(private userService: UserService, public dialog: MatDialog, private websocketService: WebsocketService) {
        this.name = userService.getUserName();
    }

    openDialog(): void {
        const dialogRef = this.dialog
            .open(UserNameDialog, {
                data: { name: this.name }
            })
            .afterClosed().subscribe({
                next: (value) => {
                    if (value) {
                        this.userService.setUserName(value);
                        this.websocketService.sendUserName();
                        this.name = value;
                    }
                },
                error: (error) => console.error('Dialog closed with error:', error)
            });
    }
}
