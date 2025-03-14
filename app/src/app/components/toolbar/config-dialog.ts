import { Component, HostListener, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

export interface DialogData {
    size: string;
    maxValue: string;
}

@Component({
    selector: 'config-dialog',
    templateUrl: 'config-dialog.html',
    standalone: true,
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ],
})
export class ConfigDialog {
    constructor(
        public dialogRef: MatDialogRef<ConfigDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
    ) { }

    @HostListener('window:keyup.Enter', ['$event'])
    onDialogClick(event: KeyboardEvent): void {
        this.close();
    }
    close(): void {
        this.dialogRef.close(this.data);
    }
}
