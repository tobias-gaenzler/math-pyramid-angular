import { Component, OnInit } from '@angular/core';
import { MathPyramidModel } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';
import { GameService } from '../service/game.service';
import { MatDialog } from '@angular/material/dialog';
import { GameSolvedDialog } from './game-solved-dialog';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

    model: MathPyramidModel | undefined;

    constructor(
        private websocketService: WebsocketService,
        private gameService: GameService,
        public dialog: MatDialog,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.websocketService.addListener((event: MessageEvent<any>) => {
            try {
                const data = JSON.parse(event.data);
                if (data.action === 'message') {
                    console.log(`Received message: ${event.data}`);
                    const { sender: solvedBy, solveTime } = data;
                    this.gameService.gameSolved(solvedBy, solveTime);
                    const title = this.getGameSolvedDialogTitle(solvedBy, solveTime);
                    this.openGameSolvedDialog(title, solvedBy);
                } else {
                    console.log(`[${new Date().toISOString()}]: Game started, received new model`);
                    this.model = new MathPyramidModel(data);
                    this.gameService.startGame(this.model);
                    this.dialog.closeAll();
                }
            } catch (error) {
                console.error('Error processing WebSocket message:', error);
            }
        });
    }

    sendRestart(): void {
        this.websocketService.sendRestart();
    }

    isReady(): boolean {
        return this.websocketService.isReady();
    }

    private openGameSolvedDialog(title: string, solvedBy: string): void {
        this.dialog.open(GameSolvedDialog, {
            data: { title, style: this.isSolvedByCurrentPlayer(solvedBy) ? 'winner' : 'looser' },
            panelClass: this.isSolvedByCurrentPlayer(solvedBy) ? 'winner' : 'looser'
        });
    }

    private getGameSolvedDialogTitle(solvedBy: string, solveTime: number): string {
        const formattedSolveTime = new Intl.NumberFormat(navigator.language || 'en-US', { minimumFractionDigits: 3 }).format(solveTime / 1000);
        return `${this.isSolvedByCurrentPlayer(solvedBy) ? 'YOU' : solvedBy} solved the pyramid in ${formattedSolveTime} sec!`;
    }

    private isSolvedByCurrentPlayer(solvedBy: string): boolean {
        return this.userService.getUserName() === solvedBy;
    }
}
