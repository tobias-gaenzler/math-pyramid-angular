import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Observable, Observer, Subject } from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket: WebSocket | undefined;

    constructor(private userService: UserService) {
        this.connect()
    }

    private subject: Subject<MessageEvent> | undefined;

    public connectt(): Subject<MessageEvent> {
        if (!this.subject) {
            this.subject = this.create();
            console.log("Successfully connected.");
        }
        return this.subject;
    }


    private create(): Subject<MessageEvent> {
        const ws = new WebSocket('ws://localhost:3000');

        const observable = new Observable((obs: Observer<MessageEvent>) => {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        const observer = {
            next: (data: Object) => {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return Subject.create(observer, observable);
    }

    connect(): void {
        this.socket = new WebSocket('ws://localhost:3000')
        this.socket.onopen = () => {
            console.log('WebSocket connection established.')
            this.sendUser()
        };

        this.socket.onmessage = (event) => {
            console.log('Received message:', event.data)
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event)
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error)
        };
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

    isReady(): boolean {
        return this.socket?.readyState == 1
    }

    close(): void {
        this.socket?.close();
    }
}