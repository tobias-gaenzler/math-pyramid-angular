import { Injectable, OnInit } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService implements OnInit {
    private socket: WebSocket | undefined;

    ngOnInit(): void {
    }

    connect(): void {
        this.socket = new WebSocket('ws://localhost:3000')
        this.socket.onopen = () => {
            console.log('WebSocket connection established.')
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

    send(message: string): void {
        if (this.socket?.readyState == 1) {
            this.socket.send(message)
        }
    }

    close(): void {
        this.socket?.close();
    }
}