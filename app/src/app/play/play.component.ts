import { Component } from '@angular/core';
import { MathPyramidModel } from "../models/math-pyramid";
import { WebsocketService } from '../service/web-socket.service';
import { GameService } from '../service/game.service';
import { MatDialog } from '@angular/material/dialog';
import { GameSolvedDialog } from './game-solved-dialog';
import { UserService } from '../service/user.service';

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent {

    model: MathPyramidModel | undefined

    constructor(private websocketService: WebsocketService,
        private gameService: GameService,
        public dialog: MatDialog,
        private userService: UserService) {
    }

    ngOnInit(): void {
        this.websocketService.addListener((event: MessageEvent<any>) => {
            if (event.data.includes("\"action\":\"message\"")) {
                console.log(`Received message: ${event.data}`)
                const solvedBy = JSON.parse(event.data).sender
                const solveTime = JSON.parse(event.data).solveTime
                this.gameService.gameSolved(solvedBy, solveTime);
                const title = this.getGameSolvedDialogTitle(solvedBy, solveTime);
                this.openGameSolvedDialog(title, solvedBy)
            } else {
                console.log(`[${new Date().toISOString()}]: Game started, received new model`)
                this.model = new MathPyramidModel(JSON.parse(event.data))
                this.gameService.startGame(this.model)
                this.dialog.closeAll()
            }
        })
    }

    sendRestart(): void {
        this.websocketService.sendRestart()
    }

    isReady(): boolean {
        return this.websocketService.isReady()
    }

    private openGameSolvedDialog(title: string, solvedBy: string): void {
        this.dialog.open(GameSolvedDialog, {
            data: { title: title, style: this.isSolvedByCurrentPlayer(solvedBy) ? "winner" : "looser" },
            panelClass: this.isSolvedByCurrentPlayer(solvedBy) ? "winner" : "looser"

        });
    }

    private getGameSolvedDialogTitle(solvedBy: string, solveTime: number): string {
        const formattedSolveTime = new Intl.NumberFormat(navigator.language ? navigator.language : "en-us", { minimumFractionDigits: 3 }).format(solveTime / 1000);
        return (this.isSolvedByCurrentPlayer(solvedBy) ? "YOU" : solvedBy) + " solved the pyramid in " + formattedSolveTime + " sec!";
    }

    private isSolvedByCurrentPlayer(solvedBy: string): boolean {
        return this.userService.getUserName() === solvedBy;
    }
}
