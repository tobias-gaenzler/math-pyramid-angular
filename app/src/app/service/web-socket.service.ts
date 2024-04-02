import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, Observer, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket: WebSocket | undefined;

    constructor(private userService: UserService) {
    }

    connect(onMessageCallback: (event: MessageEvent<any>) => void): void {
        this.socket = new WebSocket('ws://localhost:3000')
        this.socket.onopen = () => {
            console.log('WebSocket connection established.')
            this.sendUser()
        };

        this.socket.onmessage = (event) => {
            onMessageCallback(event)
        }

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event)
        }

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error)
        }
    }

    sendUser(): void {
        if (this.isReady()) {
            this.socket!.send(`{ "action": "username", "sender": "${this.userService.getUserName()}" }`)
        }
    }

    sendRestart(): void {
        if (this.isReady()) {
            this.socket!.send('{ "action": "start",   "sender": "${this.userService.getUserName()}", "data": { "size": 3, "maxValue": 100 } }')
        }
    }

    private isReady(): boolean {
        return this.socket?.readyState == 1
    }

    close(): void {
        this.socket?.close();
    }
}