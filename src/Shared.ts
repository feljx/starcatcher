export enum FieldSymbol {
    Safe = '',
    Mine = '*',
}

export enum Difficulty {
    Easy = 0.12,
    Intermediate = 0.15,
    Hard = 0.17,
}

export interface Options {
    diff: Difficulty
    numCols: number
    numRows: number
}
