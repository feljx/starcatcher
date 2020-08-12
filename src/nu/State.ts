import { FieldValue, Difficulty } from './Game'

//
// Partial field state (before counting nearby mines)
//

interface PartialFieldState {
    fieldVal: FieldValue
    marked: boolean
    revealed: boolean
    index: number
    nearbyIndices: number[]
}

// Higher-order function (to close over game settings)
function PartialFieldState (
    diff: Difficulty,
    numCols: number,
    numRows: number
) {
    // Partial field state factory (with closure)
    return function (_: any, fieldIndex: number): PartialFieldState {
        const fieldVal =
            Math.random() < diff ? FieldValue.Mine : FieldValue.Safe
        return {
            fieldVal,
            marked: false,
            revealed: false,
            index: fieldIndex,
            nearbyIndices: getNearbyIndices(numCols, numRows, fieldIndex),
        }
    }
}

//
// Full field state
//

export interface FieldState extends PartialFieldState {
    nearbyMines: number
}

// Field state factory (counting nearby mines)
function FieldState (
    fieldState: PartialFieldState,
    _: number,
    fields: PartialFieldState[]
) {
    return {
        ...fieldState,
        nearbyMines: fieldState.nearbyIndices
            .map((idx) => fields[idx])
            .filter((fieldState) => fieldState.fieldVal === FieldValue.Mine)
            .length,
    }
}

//
// Game state
//

export interface GameState {
    diff: Difficulty
    numCols: number
    numRows: number
    fields: FieldState[]
}

// Game state factory
export function GameState (
    diff: Difficulty,
    numCols: number,
    numRows: number
): GameState {
    return {
        diff,
        numCols,
        numRows,
        fields: new Array(numCols * numRows)
            .fill(0)
            .map(PartialFieldState(diff, numCols, numRows))
            .map(FieldState),
    }
}

//
// Helper functions
//

// Calculate nearby field indices
function getNearbyIndices (
    numCols: number,
    numRows: number,
    fieldIndex: number
) {
    const c = numCols
    const offsets = [ -1, 1, -c, -c - 1, -c + 1, c, c - 1, c + 1 ]
    return offsets
        .map((offset) => offset + fieldIndex)
        .filter((nearbyIdx) => nearbyIdx >= 0 && nearbyIdx < numCols * numRows)
}
