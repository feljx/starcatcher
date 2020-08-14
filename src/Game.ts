import { GameState, FieldState } from './State'
import { GameNode } from './Nodes'
import { Difficulty } from './Shared'

//
// Live State
//

let gameState = new GameState(Difficulty.Intermediate, 15, 15)
// let gameNoes = new GameNodes()
let gameNode = GameNode(gameState)

//
// Main game logic
//
export function reveal (...fieldIndices: number[]) {}

//
export function mark (fieldIndex: number) {}

//
// Helper functions
//

// Count number of marked nearby fields
export function getNearbyMarked (fieldState: FieldState) {
    return fieldState.nearbyIndices
        .map((idx) => gameState.fields[idx])
        .filter((state) => state.isMarked()).length
}

// Determine whether field can reveal in a cascade
export function canCascade (fieldIndex: number) {
    const fieldState = gameState.fields[fieldIndex]
    const nearbyMarked = getNearbyMarked(fieldState)
    return nearbyMarked === fieldState.mineCount
}
