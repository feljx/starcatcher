import React, { FunctionComponent, Reducer, useReducer, useState } from 'react'

import css from './styles.module.css'

interface Cell {
    val: string
    pos: [number, number]
}

export interface GameState {
    cols: number
    rows: number
    prob: number
    cells: Cell[]
    cells_left: number
    stars_left: number
    game_over: boolean
}

interface GameAction {}

const init_game_state: GameState = (cols: number, rows: number, prob: number) => {
    const cells = Array.from({ length: cols * rows }, (_, n) => {
        // calc cell props
        const pos = this.xy(n)
        const is_star = Math.random() < this.prob
        const val = is_star ? STAR : undefined

        // increment counter
        if (is_star) ++this.stars_left
        else ++this.fields_left

        // create, append and return field
        const field = new Field(this, pos, val)
        this.grid.appendChild(field.container)
        return field
    })
    return {
        cols,
        rows,
        prob,
        cells
    }
}

const reduce_game_state: Reducer<GameState, GameAction> = (state, action) => {}

export const Game: FunctionComponent = () => {
    const [ game_state, dispatch ] = useReducer(reduce_game_state, {})

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
