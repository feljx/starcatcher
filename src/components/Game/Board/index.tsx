import { FunctionComponent, Reducer, useReducer, useState } from 'react'
import { CellStateI } from './Cell'

interface Vector {
    x: number
    y: number
}

interface VectorWithN extends Vector {
    n: number
}

const nearby = (coord: VectorWithN, state: BoardState): VectorWithN[] => {
    const dims = state.dims
    const isInBounds = (nearbyCoord: VectorWithN) => {
        const nearbyCoordRepr = JSON.stringify(nearbyCoord)
        if (!state.nearbyCache[nearbyCoordRepr]) {
            const isInXBounds = nearbyCoord.x > 0 && nearbyCoord.x <= dims.x
            const isInYBounds = nearbyCoord.y > 0 && nearbyCoord.y <= dims.y
            state.nearbyCache[nearbyCoordRepr] = isInXBounds && isInYBounds
        }
        return state.nearbyCache[nearbyCoordRepr]
    }
    const deltas: [number, number][] = [
        [ -1, -1 ],
        [ 0, -1 ],
        [ 1, -1 ],
        [ -1, 0 ],
        [ 1, 0 ],
        [ -1, 1 ],
        [ 0, 1 ],
        [ 1, 1 ]
    ]
    const deltaToCoordinate = ([ deltaX, deltaY ]: [number, number]) => {
        return Coordinate(coord.x + deltaX, coord.y + deltaY, dims)
    }
    return deltas.map(deltaToCoordinate).filter(isInBounds)
}

const xyToN = (x: number, y: number, dims: VectorWithN) => {
    return dims.x * (y - 1) + (x - 1)
}

const Dimensions = (width: number, height: number): Readonly<VectorWithN> => {
    return Object.freeze({ x: width, y: height, n: width * height })
}

const Coordinate = (x: number, y: number, dims: VectorWithN): Readonly<VectorWithN> => {
    const n = xyToN(x, y, dims)
    return Object.freeze({ x, y, n })
}

interface BoardState {
    dims: VectorWithN
    cells: CellStateI[]
    nearbyCache: any
}

const BoardState = (width: number, height: number): Readonly<BoardState> => {
    const dims = Dimensions(width, height)
    const cells: CellStateI[] = []
    const nearbyCache = {}
    return Object.freeze({ dims, cells, nearbyCache })
}

const enum ActionType {
    Generate = 'generate',
    Flag = 'flag',
    OpenSingle = 'openSingle',
    OpenNearby = 'openNearby'
}

interface BoardActionI {
    type: ActionType
    payload?: VectorWithN
}

const reduceBoard: Reducer<BoardState, BoardActionI> = (state, action) => {
    const openCells = (...coords: VectorWithN[]) => {
        for (const c of coords) {
            state.cells[c.n].opened = true
        }
    }
    switch (action.type) {
        case ActionType.Generate:
            //

            return state
        case ActionType.Flag:
            const cell = state.cells[action.payload.n]
            if (!cell.opened) {
                cell.flagged = true
            }
            return state
        case ActionType.OpenSingle:
            openCells(action.payload)
            return state
        case ActionType.OpenNearby:
            openCells(action.payload, ...nearby(action.payload, state))
            return state
        default:
            throw new Error('Reducer action wrong or missing.')
    }
}

export const Board: FunctionComponent = () => {
    const [ boardState, dispatch ] = useReducer(reduceBoard, BoardState(20, 10))

    const [ stars_left, set_stars_left ] = useState(0)
    const [ fields_left, set_fields_left ] = useState(0)
    const [ game_over, set_game_over ] = useState(0)

    return (
        <div className={}>
            <Sidebar />
            <BoardState data={board_data} />
        </div>
    )
}

const foo = () => {}
