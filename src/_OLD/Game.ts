import Renderable from './Renderable'

export const enum GameMode {
    Easy = 0.12,
    Intermediate = 0.15,
    Hard = 0.17,
}

export interface GameParameters {
    cols: number
    rows: number
    mode: GameMode
}

enum FieldValue {
    Mine = '*',
}

//
// Board Field
//

class Field {
    public readonly neighbourIndices: number[]
    private container = document.createElement('div')
    private textNode: Text
    private revealed = false
    private isMine = false

    constructor (board: Board, index: number) {
        // append html container to board, set css class
        board.container.appendChild(this.container)
        this.container.className = 'field'

        // if random number [0, 1) is smaller than game mode probability -> field contains a mine
        this.isMine = Math.random() < board.params.mode

        // define neighbours (not validated, includes non-existing indices)
        const c = board.params.cols
        const offsets = [ -1, 1, -c, -c - 1, -c + 1, c, c - 1, c + 1 ]
        this.neighbourIndices = offsets.map((offset) => index + offset)
    }

    reveal () {
        if (!this.revealed) {
            this.revealed = true
            if (this.isMine) {
                this.textNode = document.createTextNode(FieldValue.Mine)
                this.container.appendChild(this.textNode)
            }
        }
    }

    remove () {
        if (this.textNode) {
            this.container.removeChild(this.textNode)
        }
        this.container.remove()
        this.container = null
    }
}

//
// Game Board
//

interface BoardI extends Renderable {}

class Board implements BoardI {
    public container = document.createElement('div')
    public params: GameParameters
    private fields: Field[]

    constructor (params: GameParameters) {
        // set css class
        this.container.className = 'board'

        // save parameters, generate board
        this.params = params
        this.generate()
    }

    generate () {
        // (re)generate array of initialized Fields
        const numFields = this.params.cols * this.params.rows
        const toField = (_: any, idx: number) => new Field(this, idx)
        this.fields = new Array(numFields).fill(0).map(toField)
    }

    renderTo (gameContainer: HTMLDivElement) {
        // appent html container to game
        gameContainer.appendChild(this.container)
    }

    remove () {
        for (const field of this.fields) {
            field.remove()
        }
        this.fields = null
        this.container.remove()
        this.container = null
    }
}

//
// Game
//

interface GameI extends Renderable {}

class Game implements GameI {
    private board: Board

    constructor (params: GameParameters) {
        this.board = new Board(params)
    }

    remove () {
        // remove existing board
        if (this.board) {
            this.board.remove()
            this.board = null
        }
    }

    renderTo (gameContainer: HTMLDivElement) {
        this.board.renderTo(gameContainer)
    }
}

export default Game
