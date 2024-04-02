import { Component, OnDestroy, OnInit } from '@angular/core';
import { MathPyramidModel, MathPyramidModelData } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit, OnDestroy {

    model: MathPyramidModel | undefined

    constructor(private websocketService: WebsocketService) {
    }

    ngOnInit(): void {
        this.websocketService.connect()
    }
    
    sendMessage() {
        this.websocketService.send('{ "action": "username", "sender": "John" }')
        this.websocketService.send('{ "action": "start",   "sender": "John", "data": { "size": 3, "maxValue": 100 } }')
    }

    ngOnDestroy() {
        this.websocketService.close()
    }
}
