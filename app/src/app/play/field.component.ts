import { Component, Input } from '@angular/core';
import { MathPyramidModel } from '../models/math-pyramid';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrl: './field.component.scss'
})
export class FieldComponent {
    @Input() rowId!: number;
    @Input() colId!: number;
    @Input() model!: MathPyramidModel;

    disabled(): boolean {
        return this.startValue() !== null
    }

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

    startValue(): number {
        return this.model.value(this.rowId, this.colId)!
    }
}
