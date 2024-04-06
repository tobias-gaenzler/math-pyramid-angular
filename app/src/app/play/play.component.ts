import { Component } from '@angular/core';
import { MathPyramidModel } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent {

    model: MathPyramidModel | undefined

    constructor(private websocketService: WebsocketService) {
    }

    ngOnInit(): void {
        this.websocketService.addListener((event: MessageEvent<any>) => {
            if (event.data.includes("\"action\":\"message\"")) {
                console.log(`Received message: ${event.data}`)
                // setSolvedBy(JSON.parse(message).sender)
                // setStartTime(0)
                // setSolveTime(JSON.parse(message).solveTime)
            } else {
                console.log(`[${new Date().toISOString()}]: Game started, received new model`)
                this.model = new MathPyramidModel(JSON.parse(event.data))
                // setSolvedBy("")
                // setStartTime(new Date().getTime())
                // setSolveTime(0)
            }
        })
    }

    sendRestart(): void {
        this.websocketService.sendRestart()
    }

    isReady(): boolean {
        return this.websocketService.isReady()
    }

}
