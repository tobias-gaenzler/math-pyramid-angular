import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { GameService } from '../service/game.service';

@Component({
    selector: 'field',
    templateUrl: './field.component.html',
    styleUrls: ['./field.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FieldComponent implements OnInit, OnChanges {
    @Input() startValue!: number | null;
    @Input() solutionValue!: number;
    @Input() index!: number;
    fieldValue: number | undefined;
    expectsUserInput: boolean = false;
    className: string = "pyramid-field";

    constructor(private gameService: GameService) { }

    ngOnInit(): void {
        this.initializeField();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit()
    }

    private initializeField(): void {
        this.fieldValue = this.startValue ?? undefined;
        this.expectsUserInput = this.startValue === null;
        this.className = this.expectsUserInput ? "pyramid-field" : "pyramid-field disabled";
    }

    disabled(): boolean {
        return this.startValue !== null || this.fieldValue === this.solutionValue;
    }

    onChange(): void {
        if (this.expectsUserInput) {
            if (this.fieldValue === null) {
                this.className = "pyramid-field";
            } else if (this.solutionValue === this.fieldValue) {
                this.gameService.userInput(this.index, this.fieldValue);
                this.className = "pyramid-field correct";
            } else {
                this.className = "pyramid-field incorrect";
            }
        } else {
            this.className = "pyramid-field disabled";
        }
    }

    onKeydown(event: KeyboardEvent): void {
        const allowedKeys = ['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'];
        if (!/\d/.test(event.key) && !allowedKeys.includes(event.key)) {
            event.preventDefault();
        }
    }
}

