import { Component, OnDestroy } from '@angular/core';
import { MathPyramidModel, MathPyramidModelData } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';
import { Subject, map } from 'rxjs';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent implements OnDestroy {

    model: MathPyramidModel | undefined
    public message: Subject<MathPyramidModelData> | undefined;

    constructor(private websocketService: WebsocketService) {
        this.message = <Subject<MathPyramidModelData>>websocketService
            .connectt()
            .pipe(map((response: MessageEvent): MathPyramidModelData => {
                let data = JSON.parse(response.data);
                this.model = new MathPyramidModel(data)
                return {
                    size: data.size,
                    solutionValues: data.solutionValues,
                    startValues: data.startValues
                }
            }))
        this.message.subscribe(msg => {
            console.log("Response from websocket: " + msg);
        })
    }

    sendMessage() {
        this.websocketService.sendRestart()
    }

    ngOnDestroy() {
        this.websocketService.close()
    }
}
