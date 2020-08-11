import Renderable from './Renderable'

export interface GameParameters {
    cols: number
    rows: number
}

export interface BoardI extends Renderable {}

export class Board {
    private container = document.createElement('div')

    constructor () {
        this.container.className = 'board'
    }

    // public renderTo (gameContainer: HTMLDivElement) {
    //     gameContainer.appendChild(this.container)
    // }
}

interface Game extends Renderable {
    b: number
}

class Game {
    private board = new Board()

    constructor (params: GameParameters) {}

    // renderTo (gameContainer: HTMLDivElement) {
    //     this.board.renderTo(gameContainer)
    // }
}

export default Game
