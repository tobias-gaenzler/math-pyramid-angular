import { NgModule } from '@angular/core';
import { PlayComponent } from "./play.component";
import { MatFormField, MatFormFieldModule } from "@angular/material/form-field";
import { MatInput, MatInputModule } from "@angular/material/input";
import { NgForOf, NgIf } from "@angular/common";
import { MatCard, MatCardContent } from "@angular/material/card";
import { RowComponent } from "./row.component";
import { FieldComponent } from './field.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { GameSolvedDialog } from './game-solved-dialog';
import { MatIcon } from '@angular/material/icon';

@NgModule({
    declarations: [PlayComponent, RowComponent, FieldComponent, GameSolvedDialog],
    imports: [
        MatButtonModule,
        MatFormField,
        MatInput,
        NgForOf,
        MatCardContent,
        MatCard,
        FormsModule,
        NgIf,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatIcon
    ],
    providers: [
       {
         provide: MatDialogRef,
         useValue: {}
       }
    ]
})

export class PlayModule {
}
