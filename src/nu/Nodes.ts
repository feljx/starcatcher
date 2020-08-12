import { FieldState } from './State'
import { FieldValue } from './Game'
import { FieldClickHandler } from './Handlers'

export type FieldNode = HTMLDivElement
export type BoardNode = HTMLDivElement

const enum Class {
    Field = 'field',
    Game = 'game',
}

export function FieldText (text: FieldValue) {
    return document.createTextNode(text)
}

export function FieldNode (fieldState: FieldState) {
    const fieldNode: FieldNode = document.createElement('div')
    fieldNode.classList.add(Class.Field)
    fieldNode.onclick = FieldClickHandler(fieldState, fieldNode)
    return fieldNode
}

export function BoardNode (): BoardNode {
    const node = document.createElement('div')
    node.classList.add(Class.Game)
    return node
}
