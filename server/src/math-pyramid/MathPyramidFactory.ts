import { MathPyramidSolver } from './MathPyramidSolver';

export interface MathPyramidModelData {
    size: number;
    solutionValues: number[];
    startValues: Array<number | null>;
}

export interface MathPyramidRequestData {
    size: string;
    maxValue: string;
}

export class MathPyramidFactory {
    private static readonly MAX_ITERATIONS = 250;

    getNewGameData(data: MathPyramidRequestData): MathPyramidModelData {
        const size = parseInt(data.size);
        const maxValue = parseInt(data.maxValue);
        const solutionValues = this.createRandomSolution(size, maxValue);
        const startValues = this.getUniquelySolvableRandomStartValues(solutionValues);

        console.log(`Start values: ${JSON.stringify(startValues)}`);
        console.log(`Solution values: ${JSON.stringify(solutionValues)}`);
        return {
            size,
            startValues,
            solutionValues,
        };
    }

    private createRandomSolution(size: number, maxValue: number): number[] {
        const maxValueInLowestRow = Math.max(2, Math.floor(maxValue / Math.pow(2, size - 1)));
        // start values in bottom row of pyramid
        const randomSolution = Array.from({ length: size }, () => Math.floor(Math.random() * (maxValueInLowestRow - 1) + 1));

        return new MathPyramidSolver().solveBottomUp(size, randomSolution);
    }

    private getUniquelySolvableRandomStartValues(solutionValues: number[]): Array<number | null> {
        const size = this.getSizeFromNumberOfBlocks(solutionValues.length);
        let startValues = this.getRandomStartValues(solutionValues);
        let tries = 1;
        const solver = new MathPyramidSolver();

        while (!solver.isSolvable(startValues, size) && tries <= MathPyramidFactory.MAX_ITERATIONS) {
            startValues = this.getRandomStartValues(solutionValues);
            tries++;
        }

        if (tries > MathPyramidFactory.MAX_ITERATIONS) {
            throw new Error(`Could not find a uniquely solvable solution in ${MathPyramidFactory.MAX_ITERATIONS} iterations.`);
        }

        console.log(`Needed ${tries} iterations to find suitable start values.`);
        const startValuesAsArray = Array(solutionValues.length).fill(null);
        startValues.forEach((value, key) => {
            startValuesAsArray[key] = value;
        });

        return startValuesAsArray;
    }

    private getRandomStartValues(solutionValues: number[]): Map<number, number> {
        const size = this.getSizeFromNumberOfBlocks(solutionValues.length);
        const numberOfBlocks = this.getNumberOfBlocks(size);
        const randomStartValues = new Map<number, number>();
        const randomIndices = this.getRandomIndices(numberOfBlocks, size);

        randomIndices.forEach((randomIndex) => {
            randomStartValues.set(randomIndex, solutionValues[randomIndex]);
        });

        return randomStartValues;
    }

    private getRandomIndices(maxValue: number, numberOfIndices: number): number[] {
        const indices = Array.from({ length: maxValue }, (_, i) => i);
        indices.sort(() => Math.random() - 0.5);
        return indices.slice(0, numberOfIndices);
    }

    private getNumberOfBlocks(size: number): number {
        return (size * size + size) / 2;
    }

    private getSizeFromNumberOfBlocks(numberOfBlocks: number): number {
        return (Math.sqrt(1 + 8 * numberOfBlocks) - 1) / 2;
    }
}