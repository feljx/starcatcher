import { GameState, FieldState } from './State'
import { GameNode } from './Nodes'
import { Difficulty, Options } from './Shared'

//
// Main Game class: ties together state and html nodes
//

class Game {
    public state: GameState
    public node: GameNode

    constructor (options: Options, container?: HTMLElement) {
        const { diff, numCols, numRows } = options
        this.state = new GameState(diff, numCols, numRows)
        this.node = new GameNode(this.state, container)
    }

    reveal (...fieldIndices: number[]) {}

    mark (fieldIndex: number) {}

    // Count number of marked nearby fields
    getNearbyMarked (fieldState: FieldState) {
        return fieldState.nearbyIndices
            .map((idx) => this.state.fields[idx])
            .filter((state) => state.isMarked()).length
    }

    // Determine whether field can reveal in a cascade
    canCascade (fieldIndex: number) {
        const fieldState = this.state.fields[fieldIndex]
        const nearbyMarked = this.getNearbyMarked(fieldState)
        return nearbyMarked === fieldState.mineCount
    }
}
