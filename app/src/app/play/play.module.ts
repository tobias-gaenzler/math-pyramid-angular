import { NgModule } from '@angular/core';
import { PlayComponent } from "./play.component";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgForOf, NgIf } from "@angular/common";
import { MatCard, MatCardContent } from "@angular/material/card";
import { RowComponent } from "./row.component";
import { FieldComponent } from './field.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [PlayComponent, RowComponent, FieldComponent],
    imports: [
        MatButtonModule,
        MatFormField,
        MatInput,
        NgForOf,
        MatCardContent,
        MatCard,
        FormsModule,
        NgIf
    ]
})

export class PlayModule {
}
