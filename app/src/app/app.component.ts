import { Component } from '@angular/core';
import { UserService } from './service/user.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    constructor(private userService: UserService) {
    }

    title = 'Math Pyramid';
    getUserName() {
        return this.userService.getUserName()
    }
}
