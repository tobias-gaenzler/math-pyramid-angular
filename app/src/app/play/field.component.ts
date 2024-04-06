import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrl: './field.component.scss',
    encapsulation: ViewEncapsulation.None
})
export class FieldComponent implements OnInit, OnChanges {
    @Input() startValue!: number | null
    @Input() solutionValue!: number | null
    fieldValue: number | undefined;
    private expectsUserInput: boolean = false;
    className: string = "pyramid-field";

    ngOnInit(): void {
        this.fieldValue = this.startValue ? this.startValue : undefined
        this.expectsUserInput = (this.startValue === null)
        if (this.expectsUserInput) {
            this.className = "pyramid-field"
        } else {
            this.className = "pyramid-field disabled"
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit()
    }

    disabled(): boolean {
        return this.startValue !== null || this.fieldValue === this.solutionValue
    }

    onChange(): void {
        if (this.expectsUserInput) {
            if (this.fieldValue === null) {
                this.className = "pyramid-field";
            } else if (this.solutionValue === this.fieldValue) {
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
}

