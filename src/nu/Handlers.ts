import { FieldState } from './State'
import { FieldValue, mark, reveal } from './Game'
import { FieldNode, FieldText } from './Nodes'

const enum Click {
    Left = 0,
    Middle = 1,
    Right = 2,
}

// Field click handler factory
export function FieldClickHandler (
    fieldState: FieldState,
    fieldNode: FieldNode
) {
    // Event handler
    return function (ev: MouseEvent) {
        switch (ev.button) {
            case Click.Left:
                if (fieldState.revealed) {
                    reveal(fieldState.index)
                } else {
                    reveal(...fieldState.nearbyIndices)
                }
                if (fieldState.fieldVal === FieldValue.Mine) {
                    const textNode = FieldText(FieldValue.Mine)
                    fieldNode.appendChild(textNode)
                }
                return
            case Click.Middle:
            case Click.Right:
                if (!fieldState.marked) {
                    mark(fieldState.index)
                }
                return
        }
    }
}
