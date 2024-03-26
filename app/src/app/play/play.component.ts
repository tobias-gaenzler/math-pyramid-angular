import { Component, OnDestroy, OnInit } from '@angular/core';
import { MathPyramidModel, MathPyramidModelData } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent implements OnInit, OnDestroy {

    private modelData: MathPyramidModelData = {
        size: 3,
        startValues: [null, 18, null, 25, 26, null],
        solutionValues: [7, 18, 8, 25, 26, 51]
    }
    model: MathPyramidModel

    constructor(private websocketService: WebsocketService) {
        this.model = new MathPyramidModel(this.modelData)
    }

    ngOnInit(): void {
        this.websocketService.connect()
    }
    
    sendMessage() {
        this.websocketService.send('{ "action": "username", "sender": "John" }')
    }

    ngOnDestroy() {
        this.websocketService.close()
    }
}
