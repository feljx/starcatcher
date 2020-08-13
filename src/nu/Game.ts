import { GameState, FieldState } from './State'
import { GameNode } from './Nodes'

export enum FieldValue {
    Safe = '',
    Mine = '*',
}

export enum Difficulty {
    Easy = 0.12,
    Intermediate = 0.15,
    Hard = 0.17,
}

//
// Live State
//

let gameState = GameState(Difficulty.Intermediate, 15, 15)
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
        .filter((state) => state.marked).length
}

// Determine whether field can reveal in a cascade
export function canCascade (fieldIndex: number) {
    const fieldState = gameState.fields[fieldIndex]
    const nearbyMarked = getNearbyMarked(fieldState)
    return nearbyMarked === fieldState.nearbyMines
}
