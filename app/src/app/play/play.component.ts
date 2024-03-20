import {Component} from '@angular/core';
import {MathPyramidModel, MathPyramidModelData} from "../math-pyramid/model";

@Component({
    selector: 'app-play',
    templateUrl: './play.component.html',
    styleUrl: './play.component.scss'
})
export class PlayComponent {
    private message: string = "{\"size\":3,\"startValues\":[null,18,null,25,26,null],\"solutionValues\":[7,18,8,25,26,51]}";
    console: Console = console;
    model: MathPyramidModel = new MathPyramidModel(JSON.parse(this.message) as MathPyramidModelData)

    onKeydown(event: KeyboardEvent): void {
        if (!/\d/.test(event.key) &&
            !/Backspace/.test(event.key) &&
            !/Delete/.test(event.key) &&
            !/ArrowLeft/.test(event.key) &&
            !/ArrowRight/.test(event.key)
        ) {
            event.preventDefault()
        }
    }

    getIndex(row: number, column: number): number {
        console.log("row: " + row);
        console.log("column: " + column);
        // TODO: prepare proper rows to iterate over
        row = this.model.size - row - 1; //deviation from standard, as we can not do loops counting down in template,
        let index: number = 0
        // increase index by (size - i) for each row
        for (let i: number = 0; i < row; i = i + 1) {
            index = index + this.model.size - i
        }
        return index + column
    }
}
