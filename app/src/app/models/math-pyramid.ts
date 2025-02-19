interface MathPyramidModelData {
    size: number;
    solutionValues: number[];
    startValues: Array<number | null>;
}

class MathPyramidModel {
    size: number;
    solutionValues: number[];
    startValues: Array<number | null>;
    userInput: Array<number | null>;

    constructor(data: MathPyramidModelData) {
        const hasNullValue = data.solutionValues.find((value) => value === null || value === undefined);
        if (hasNullValue !== undefined) {
            throw new Error(`Solution must not contain null or undefined values: ${JSON.stringify(data.solutionValues)}`);
        }

        this.size = data.size;
        this.solutionValues = data.solutionValues;
        this.startValues = data.startValues;
        this.userInput = [...this.startValues];
    }

    index(rowId: number, colId: number): number {
        let index = 0;
        for (let i = 0; i < rowId; i++) {
            index += this.size - i;
        }
        return index + colId;
    }

    startValue(rowId: number, colId: number): number {
        return this.startValues[this.index(rowId, colId)]!;
    }

    solutionValue(rowId: number, colId: number): number {
        return this.solutionValues[this.index(rowId, colId)]!;
    }

    columnIndices(rowId: number): number[] {
        return Array.from({ length: this.size - rowId }, (_, i) => i);
    }

    rowIndices(): number[] {
        return Array.from({ length: this.size }, (_, i) => i).reverse();
    }

    solved(): boolean {
        return this.solutionValues.every((value, index) => value === this.userInput[index]);
    }
}

export { MathPyramidModel };
export type { MathPyramidModelData };