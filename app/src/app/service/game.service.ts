import { Injectable } from '@angular/core';
import { WebsocketService } from './web-socket.service';
import { MathPyramidModel } from '../models/math-pyramid';


@Injectable({
    providedIn: 'root'
})
export class GameService {
    model: MathPyramidModel | undefined
    startTime: number = 0
    solveTime: number = 0
    solvedBy: string = ""

    constructor(private webSocketService: WebsocketService) { }

    startGame(model: MathPyramidModel) {
        this.model = model
        this.solvedBy = ""
        this.startTime = new Date().getTime()
        this.solveTime = 0
    }

    gameSolved(sender: string, solveTime: number) {
        this.solvedBy = sender
        this.startTime = 0
        this.solveTime = solveTime
    }

    userInput(index: number, input: number) {
        if (this.model) {
            this.model.userInput[index] = input
            if (this.model?.solved()) {
                console.log('Game solved')
                this.webSocketService.sendGameSolved(new Date().getTime() - this.startTime)
            }
        }
    }
}