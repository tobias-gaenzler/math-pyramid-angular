import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private socket: WebSocket | undefined;
    private listeners: ((event: MessageEvent<any>) => void)[] = [];

    constructor(private userService: UserService, private configService: ConfigService) {}

    addListener(onMessageCallback: (event: MessageEvent<any>) => void): void {
        this.listeners.push(onMessageCallback);
    }

    connect(): void {
        this.socket = new WebSocket('ws://localhost:3000');
        this.socket.onopen = () => {
            console.log('WebSocket connection established.');
            this.sendUser();
        };

        this.socket.onmessage = (event) => {
            this.listeners.forEach((callback) => {
                callback(event);
            });
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
        };

        this.socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    }

    sendUserName(): void {
        this.sendUser();
    }

    private sendUser(): void {
        if (this.isReady()) {
            const userName = this.userService.getUserName();
            console.log(`Sending user name: ${userName}`);
            this.socket!.send(JSON.stringify({ action: 'username', sender: userName }));
        }
    }

    sendGameSolved(solveTime: number): void {
        const userName = this.userService.getUserName();
        if (this.isReady()) {
            this.socket!.send(JSON.stringify({ action: 'message', sender: userName, solveTime, data: `Pyramid solved by: ${userName}` }));
        }
    }

    sendRestart(): void {
        if (this.isReady()) {
            const userName = this.userService.getUserName();
            const maxValue = this.configService.getMaxValue();
            this.socket!.send(JSON.stringify({ action: 'start', sender: userName, data: { size: this.configService.getSize(), maxValue: maxValue } }));
        }
    }

    isReady(): boolean {
        return this.socket?.readyState === WebSocket.OPEN;
    }

    close(): void {
        this.socket?.close();
    }
}