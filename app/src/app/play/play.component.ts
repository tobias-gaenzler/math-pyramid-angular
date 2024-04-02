import { Component, OnDestroy, OnInit } from '@angular/core';
import { MathPyramidModel } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent implements OnDestroy, OnInit {

    model: MathPyramidModel | undefined

    constructor(private websocketService: WebsocketService) {
    }

    ngOnInit(): void {
        this.websocketService.connect((event: MessageEvent<any>) => {
            console.log(event.data)
            this.model = new MathPyramidModel(JSON.parse(event.data))
        })
    }

    sendRestart(): void {
        this.websocketService.sendRestart()
    }

    isReady(): boolean {
        return this.websocketService.isReady()
    }

    ngOnDestroy(): void {
        this.websocketService.close()
    }
}
