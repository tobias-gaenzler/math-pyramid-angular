import { Component, Input } from '@angular/core';
import { MathPyramidModel } from '../models/math-pyramid';

@Component({
    selector: 'row',
    templateUrl: './row.component.html',
    styleUrl: './row.component.scss'
})
export class RowComponent {
    @Input() rowId!: number;
    @Input() model!: MathPyramidModel;

    getColumnIndices(): number[] {
        return this.model.columnIndices(this.rowId)
    }
}
