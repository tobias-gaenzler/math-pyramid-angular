import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from './service/web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy, OnInit {
    constructor(private websocketService: WebsocketService) {
    }

    ngOnInit(): void {
        this.websocketService.connect()
    }

    ngOnDestroy(): void {
        this.websocketService.close()
    }
}
