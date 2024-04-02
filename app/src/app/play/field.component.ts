import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { MathPyramidModel } from '../models/math-pyramid';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrl: './field.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class FieldComponent implements OnInit {
    @Input() rowId!: number
    @Input() colId!: number
    @Input() model: MathPyramidModel | undefined
    fieldValue: number | undefined;
    expectsUserInput: boolean = false;
    className: string = "pyramid-field";

    ngOnInit(): void {
        this.fieldValue = this.getStartValue()
        this.expectsUserInput = (this.getStartValue() === null)
        if (!this.expectsUserInput) {
            this.className = "pyramid-field disabled"
        }
    }

    disabled(): boolean {
        return (this.model?.startValue(this.rowId, this.colId) !== null) ||
            this.fieldValue === this.model.solutionValue(this.rowId, this.colId)
    }

    onChange(): void {
        if (this.expectsUserInput) {
            if (this.fieldValue === null) {
                this.className = "pyramid-field";
            } else if (this.model?.solutionValue(this.rowId, this.colId) === this.fieldValue) {
                this.className = "pyramid-field correct"
            } else {
                this.className = "pyramid-field incorrect"
            }
        } else {
            this.className = "pyramid-field disabled"
        }
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

    getStartValue(): number | undefined {
        return this.model ? this.model.startValue(this.rowId, this.colId) : undefined
    }
}

