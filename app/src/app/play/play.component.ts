import { Component } from '@angular/core';
import { MathPyramidModel } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';
import { GameService } from '../service/game.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent {

    model: MathPyramidModel | undefined

    constructor(private websocketService: WebsocketService, private gameService: GameService) {
    }

    ngOnInit(): void {
        this.websocketService.addListener((event: MessageEvent<any>) => {
            if (event.data.includes("\"action\":\"message\"")) {
                console.log(`Received message: ${event.data}`)
                this.gameService.stopGame(JSON.parse(event.data).sender, JSON.parse(event.data).solveTime);
            } else {
                console.log(`[${new Date().toISOString()}]: Game started, received new model`)
                this.model = new MathPyramidModel(JSON.parse(event.data))
                this.gameService.startGame(this.model)
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
