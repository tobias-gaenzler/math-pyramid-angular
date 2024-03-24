import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MathPyramidModel } from '../models/math-pyramid';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrl: './field.component.scss'
})
export class FieldComponent implements OnInit {
    @Input() rowId!: number
    @Input() colId!: number
    @Input() model!: MathPyramidModel
    fieldValue: number | undefined;
    
    ngOnInit(): void {
        this.fieldValue = this.model.startValue(this.rowId, this.colId)!
    }

    disabled(): boolean {
        return (this.model.startValue(this.rowId, this.colId) !== null) ||
        this.fieldValue === this.model.solutionValue(this.rowId, this.colId)
    }

    onChange(): void {
        console.log(this.fieldValue)
    }
    
    onKeydown(event: KeyboardEvent): void {
        if (!/\d/.test(event.key) &&
        !/Backspace/.test(event.key) &&
        !/Tab/.test(event.key) &&
        !/Delete/.test(event.key) &&
        !/ArrowLeft/.test(event.key) &&
        !/ArrowRight/.test(event.key)
        ) {
            event.preventDefault()
        }
    }
}
