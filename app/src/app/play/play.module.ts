import { NgModule } from '@angular/core';
import { PlayComponent } from "./play.component";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { NgForOf } from "@angular/common";
import { MatCard, MatCardContent } from "@angular/material/card";
import { RowComponent } from "./row.component";
import { FieldComponent } from './field.component';

@NgModule({
    declarations: [PlayComponent, RowComponent, FieldComponent],
    imports: [
        MatFormField,
        MatInput,
        NgForOf,
        MatCardContent,
        MatCard
    ]
})

export class PlayModule {
}
