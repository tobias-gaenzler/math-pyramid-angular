import { NDArray, matrix } from 'vectorious';

export class MathPyramidSolver {

    solveBottomUp(size: number, bottomValues: number[]): number[] {
        // solve pyramid from bottom to top (expects values in bottom line to be present)
        let offset = 0;
        for (let row = 1; row < size; row++) {
            for (let col = 0; col < size - row; col++) {
                bottomValues.push(bottomValues[offset + col] + bottomValues[offset + col + 1]);
            }
            offset += size - (row - 1);
        }
        return bottomValues;
    }

    isSolvable(startValues: Map<number, number>, size: number): boolean {
        const difficulty = this.getDifficulty(new Set(startValues.keys()), size);
        return difficulty === 0;
    }

    private getDifficulty(startPositions: Set<number>, size: number): number | null {
        if (!this.isUniquelySolvable(startPositions, size)) {
            return null;
        }

        const calculatablePositions: Set<number> = new Set<number>(startPositions);
        for (let i = 0; i < size; i++) {
            this.addCurrentCalculatablePositions(calculatablePositions, size);
        }
        return calculatablePositions.size < this.getNumberOfBlocks(size) ? 1 : 0;
    }

    private addCurrentCalculatablePositions(calculatablePositions: Set<number>, size: number): void {
        for (let row = 0; row < size - 1; row++) {
            for (let col = 0; col < size - row; col++) {
                if (col + 1 < size - row) {
                    // plus
                    const first = this.getIndex(row, col, size);
                    const second = this.getIndex(row, col + 1, size);
                    if (calculatablePositions.has(first) && calculatablePositions.has(second)) {
                        calculatablePositions.add(this.getIndex(row + 1, col, size));
                    }
                    // minus to the right
                    const firstMinus = this.getIndex(row, col, size);
                    const secondMinus = this.getIndex(row + 1, col, size);
                    if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
                        calculatablePositions.add(this.getIndex(row, col + 1, size));
                    }
                }
                //minus to the left
                if (col > 0) {
                    const firstMinus = this.getIndex(row, col, size);
                    const secondMinus = this.getIndex(row + 1, col - 1, size);
                    if (calculatablePositions.has(firstMinus) && calculatablePositions.has(secondMinus)) {
                        calculatablePositions.add(this.getIndex(row, col - 1, size));
                    }
                }
            }
        }
    }

    private getIndex(row: number, col: number, size: number): number {
        // starting in bottom row left, e.g. for pyramid of size 3:
        // 0 0 -> 0
        // 0 1 -> 1
        // 0 2 -> 2

        // 1 0 -> 3
        // 1 1 -> 4

        // 2 0 -> 5
        this.checkDimensions(row, col, size);
        let index = 0;
        // increase index by (size - i) for each row
        for (let i = 0; i < row; i++) {
            index += size - i;
        }
        return index + col;
    }

    private checkDimensions(row: number, col: number, size: number): void {
        if (row < 0 || row >= size) {
            throw new Error(`Row ${row} must be non-negative and smaller than the size of the pyramid ${size}`);
        }
        if (col < 0 || col >= size - row) {
            throw new Error(`Column ${col} must be non-negative and smaller than the size of the pyramid minus row ${row}, size ${size}`);
        }
    }

    private isUniquelySolvable(startValues: Set<number>, size: number): boolean {
        const columns = this.getNumberOfBlocks(size);
        const rows = columns - size;
        const A = matrix(rows, rows);
        const F = this.createMatrix(size);
        let column = 0;
        for (let i = 0; i < columns; i++) {
            if (!startValues.has(i)) {
                for (let j = 0; j < rows; j++) {
                    A.set(j, column, F.get(j, i));
                }
                column++;
            }
        }
        const b = matrix(rows, 1);
        try {
            A.solve(b);
            return true;
        } catch (e) {
            return false;
        }
    }

    private createMatrix(size: number): NDArray {
        const numberOfColumns = this.getNumberOfBlocks(size);
        const numberOfRows = numberOfColumns - size;
        const A = matrix(numberOfRows, numberOfColumns);
        for (let i = 0; i < numberOfRows; i++) {
            A.set(i, i + size, -1);
        }
        let row = 0;
        for (let i = 0; i < size - 1; i++) {
            for (let j = 0; j < size - 1 - i; j++) {
                A.set(row + j, row + j + i, 1);
                A.set(row + j, row + j + i + 1, 1);
            }
            row += size - i - 1;
        }
        return A;
    }

    private getNumberOfBlocks(size: number): number {
        return (size * size + size) / 2;
    }
}