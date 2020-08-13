import { FieldState, GameState } from './State'
import { FieldValue } from './Game'
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

export function FieldText (text: FieldValue) {
    return document.createTextNode(text)
}

export function FieldNode (fieldState: FieldState) {
    const fieldNode: FieldNode = document.createElement('div')
    fieldNode.classList.add(CssClass.Field)
    fieldNode.onclick = FieldClickHandler(fieldState, fieldNode)
    return fieldNode
}

//
// Board node
//

export function BoardNode (): BoardNode {
    const node = document.createElement('div')
    node.classList.add(CssClass.Game)
    return node
}

//
// Game node
//

interface GameNode {
    self: Node
    boardNode: BoardNode
    fieldNodes: FieldNode[]
}

export function GameNode (state: GameState): GameNode {
    const self = document.getElementById('game')
    const boardNode = BoardNode()
    const fieldNodes = state.fields.map(FieldNode)
    boardNode.append(...fieldNodes)
    self.append(boardNode)
    return { self, boardNode, fieldNodes }
}
