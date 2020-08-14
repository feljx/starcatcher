import { FieldSymbol, Difficulty } from './Shared'

//
// Field state
//

export class FieldState {
    private marked = 0
    private revealed = 0

    constructor (
        public readonly value: FieldSymbol,
        public readonly mineCount: number,
        public readonly nearbyIndices: number[]
    ) {}

    mark () {
        this.marked ^= 1
    }

    reveal () {
        this.revealed ^= 1
    }

    isMarked () {
        return this.marked
    }

    isRevealed () {
        return this.revealed
    }
}

//
// Helper: Calculate nearby field indices
//

export function NearbyIndices (
    fieldIndex: number,
    numCols: number,
    numRows: number
) {
    const c = numCols
    const offsets = [ -1, 1, -c, -c - 1, -c + 1, c, c - 1, c + 1 ]
    return offsets
        .map((offset) => offset + fieldIndex)
        .filter((nearbyIdx) => nearbyIdx >= 0 && nearbyIdx < numCols * numRows)
}

//
// Game state
//

export class GameState {
    public readonly fields: FieldState[]

    constructor (diff: Difficulty, numCols: number, numRows: number) {
        const FieldValue = () =>
            Math.random() < diff ? FieldSymbol.Mine : FieldSymbol.Safe
        const fieldValues = new Array(numCols * numRows).fill(0).map(FieldValue)

        const Field = (value: FieldSymbol, index: number) => {
            const nearbyIndices = NearbyIndices(index, numCols, numRows)
            const mineCount = nearbyIndices
                .map((index) => fieldValues[index])
                .filter((value) => value === FieldSymbol.Mine).length
            return new FieldState(value, mineCount, nearbyIndices)
        }
        this.fields = fieldValues.map(Field)
    }
}
