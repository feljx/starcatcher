import { GameState } from '.'

interface GameUtilsI {
    get_xy: (n: number) => [number, number]
    get_n: (x: number, y: number) => number
}

export const GameUtils = (state: GameState): Readonly<GameUtilsI> => {
    return Object.freeze({
        // convert n to [x, y] coordinate tuple
        get_xy: (n: number): [number, number] => {
            const x = n % state.cols + 1
            const y = Math.trunc(n / state.cols) + 1
            return [ x, y ]
        },

        // get field from x, y coordinates
        get_n: (x: number, y: number): number => {
            if (x < 1 || y < 1) return
            if (x > state.cols || y > state.rows) return NaN
            const n = --x + --y * state.cols
            return n
        }
    })
}
