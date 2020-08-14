import { FieldState, GameState } from './State'
import { FieldSymbol } from './Shared'
import { FieldClickHandler } from './Handlers'

const enum CssClass {
    Field = 'field',
    Game = 'game',
}

//
// Main node
//

function MainNode () {}

//
// Field node
//

export function FieldText (text: FieldSymbol) {
    return document.createTextNode(text)
}

export function FieldNode (fieldState: FieldState) {
    const fieldNode: HTMLElement = document.createElement('div')
    fieldNode.classList.add(CssClass.Field)
    fieldNode.onclick = FieldClickHandler(fieldState, fieldNode)
    return fieldNode
}

//
// Board node
//

export function BoardNode (): HTMLElement {
    const node = document.createElement('div')
    node.classList.add(CssClass.Game)
    return node
}

//
// Game node
//

interface GameNode {
    self: Node
    boardNode: HTMLElement
    fieldNodes: HTMLElement[]
}

export function GameNode (state: GameState): GameNode {
    const self = document.getElementById('game')
    const boardNode = BoardNode()
    const fieldNodes = state.fields.map(FieldNode)
    boardNode.append(...fieldNodes)
    self.append(boardNode)
    return { self, boardNode, fieldNodes }
}

export class GameNodes {
    constructor () {}
}
