import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private size: number;
    private maxValue: number;

    constructor() {
        this.size = 3;
        this.maxValue = 100;
    }

    getSize(): number {
        return this.size;
    }

    setSize(newSize: number): void {
        this.size = newSize;
    }   

    getMaxValue(): number {
        return this.maxValue;
    }

    setMaxValue(newMaxValue: number): void {
        this.maxValue = newMaxValue;
    }   
}