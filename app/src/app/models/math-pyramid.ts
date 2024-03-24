interface MathPyramidModelData {
    size: number;
    solutionValues: number[];
    startValues: Array<number | null>;
}

class MathPyramidModel {
    size: number
    solutionValues: Array<number>
    startValues: Array<number | null>
    userInput: Array<number | null>

    constructor(
        data: MathPyramidModelData
    ) {
        const hasNullValue: number | undefined = data.solutionValues.find((value) => !value)
        if (hasNullValue !== undefined && hasNullValue > -1) {
            throw new Error(`Solution must not contain null values: ${JSON.stringify(data.solutionValues)}`)
        }

        this.size = data.size
        this.solutionValues = data.solutionValues
        this.startValues = data.startValues
        this.userInput = Object.assign([], this.startValues)
    }

    index(rowId: number, colId: number): number {
        let index: number = 0
        // increase index by (size - i) for each row
        for (let i: number = 0; i < rowId; i = i + 1) {
            index = index + this.size - i
        }
        return index + colId

    }

    startValue(rowId: number, colId: number): number {
        return this.startValues[this.index(rowId, colId)]!
    }
    
    solutionValue(rowId: number, colId: number): number {
        return this.solutionValues[this.index(rowId, colId)]!
    }

    columnIndices(rowId: number): number[] {
        return [...Array(this.size - rowId).keys()]
    }

    rowIndices(): number[] {
        return [...Array(this.size).keys()].reverse()
    }

    solved() {
        return JSON.stringify(this.solutionValues) === JSON.stringify(this.userInput)
    }
}

export { MathPyramidModel }
export type { MathPyramidModelData }