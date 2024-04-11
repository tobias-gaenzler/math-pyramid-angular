import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
    title: string,
    style: string
}

@Component({
    selector: 'game-solved-dialog',
    templateUrl: 'game-solved-dialog.html',
    styleUrl: './game-solved-dialog.component.scss'
})
export class GameSolvedDialog {
    constructor(
        public dialogRef: MatDialogRef<GameSolvedDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
