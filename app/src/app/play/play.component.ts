import { Component, OnDestroy, OnInit } from '@angular/core';
import { MathPyramidModel, MathPyramidModelData } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';
import { Subject, map } from 'rxjs';

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
            this.model = new MathPyramidModel(JSON.parse(event.data))
        })
    }

    sendMessage() {
        this.websocketService.sendRestart()
    }

    ngOnDestroy() {
        this.websocketService.close()
    }
}
