import { Component, OnDestroy, OnInit } from '@angular/core';
import { WebsocketService } from './service/web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    constructor(private websocketService: WebsocketService) {}

    ngOnInit(): void {
        this.connectWebSocket();
    }

    ngOnDestroy(): void {
        this.disconnectWebSocket();
    }

    private connectWebSocket(): void {
        try {
            this.websocketService.connect();
        } catch (error) {
            console.error('WebSocket connection failed:', error);
        }
    }

    private disconnectWebSocket(): void {
        try {
            this.websocketService.close();
        } catch (error) {
            console.error('WebSocket disconnection failed:', error);
        }
    }
}
