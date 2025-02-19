import { Injectable } from '@angular/core';
import { WebsocketService } from './web-socket.service';
import { MathPyramidModel } from '../models/math-pyramid';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    model: MathPyramidModel | undefined;
    startTime: number;
    solveTime: number;
    solvedBy: string;

    constructor(private webSocketService: WebsocketService) {
        this.startTime = 0;
        this.solveTime = 0;
        this.solvedBy = "";
    }

    startGame(model: MathPyramidModel): void {
        this.model = model;
        this.solvedBy = "";
        this.startTime = new Date().getTime();
        this.solveTime = 0;
    }

    gameSolved(sender: string, solveTime: number): void {
        this.solvedBy = sender;
        this.startTime = 0;
        this.solveTime = solveTime;
    }

    userInput(index: number, input: number): void {
        if (this.model === undefined) {
            return;
        }
        this.model.userInput[index] = input;
        if (this.model.solved()) {
            console.log('Game solved');
            try {
                this.webSocketService.sendGameSolved(new Date().getTime() - this.startTime);
            } catch (error) {
                console.error('Failed to send game solved message:', error);
            }
        }
    }
}