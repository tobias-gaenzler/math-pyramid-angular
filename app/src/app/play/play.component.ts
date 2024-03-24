import { Component } from '@angular/core';
import { MathPyramidModel, MathPyramidModelData } from "../models/math-pyramid";

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent {
    private modelData: MathPyramidModelData = {
        size: 3,
        startValues: [null, 18, null, 25, 26, null],
        solutionValues: [7, 18, 8, 25, 26, 51]
    };
    model: MathPyramidModel = new MathPyramidModel(this.modelData)

    rowIndices(): number[] {
        return this.model.rowIndices()
    }
}
