import { FunctionComponent, Reducer, useReducer, useState } from 'react'
import { CellState } from './Cell'

interface Dimensions {
    x: number
    y: number
}

interface BoardState {
    dims: Dimensions
    cells: CellState[]
}

const enum ActionType {
    Generate = 'generate',
    Flag = 'flag',
    OpenSingle = 'openSingle',
    OpenNearby = 'openNearby'
}

interface BoardAction {
    type: ActionType
    payload?: any
}

const reduceBoard: Reducer<BoardState, BoardAction> = (state, action) => {
    switch (action.type) {
        case ActionType.OpenSingle:
            return state
        case ActionType.OpenNearby:
            return state
        default:
            throw new Error('Reducer action wrong or missing.')
    }
}

export const Board: FunctionComponent = () => {
    const [ boardState, dispatch ] = useReducer(reduceBoard, {})

    const [ stars_left, set_stars_left ] = useState(0)
    const [ fields_left, set_fields_left ] = useState(0)
    const [ game_over, set_game_over ] = useState(0)

    return (
        <div className={}>
            <Sidebar />
            <Board data={board_data} />
        </div>
    )
}

const foo = () => {}
