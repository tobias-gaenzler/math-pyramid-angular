import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, Observer, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket: WebSocket | undefined;
    private listeners: ((event: MessageEvent<any>) => void)[] = []

    constructor(private userService: UserService) {
    }

    addListener(onMessageCallback: (event: MessageEvent<any>) => void) {
        this.listeners.push(onMessageCallback)
    }

    connect(): void {
        this.socket = new WebSocket('ws://localhost:3000')
        this.socket.onopen = () => {
            console.log('WebSocket connection established.')
            this.sendUser()
        };

        this.socket.onmessage = (event) => {
            this.listeners.forEach(function (callback) {
                callback(event)
            })
        }

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event)
        }

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error)
        }
    }

    sendUserName() {
        this.sendUser()
    }

    private sendUser(): void {
        if (this.isReady()) {
            console.log(`Sending user name: ${this.userService.getUserName()}`)
            this.socket!.send(`{ "action": "username", "sender": "${this.userService.getUserName()}" }`)
        }
    }

    sendRestart(): void {
        if (this.isReady()) {
            this.socket!.send(`{ "action": "start",   "sender": "${this.userService.getUserName()}", "data": { "size": 3, "maxValue": 100 } }`)
        }
    }

    isReady(): boolean {
        return this.socket?.readyState == 1
    }

    close(): void {
        this.socket?.close();
    }
}