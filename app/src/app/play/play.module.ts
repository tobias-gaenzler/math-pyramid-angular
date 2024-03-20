import {NgModule} from '@angular/core';
import {PlayComponent} from "./play.component";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";

@NgModule({
    declarations: [PlayComponent],
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
