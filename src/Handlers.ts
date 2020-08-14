import { FieldState } from './State'
import { FieldSymbol, mark, reveal } from './Game'
import { FieldText } from './Nodes'

const enum Click {
    Left = 0,
    Middle = 1,
    Right = 2,
}

// Field click handler factory
export function FieldClickHandler (
    fieldState: FieldState,
    fieldNode: HTMLElement
) {
    // Event handler
    return function (ev: MouseEvent) {
        switch (ev.button) {
        // case Click.Left:
        //     if (fieldState.isRevealed()) {
        //         reveal(fieldState.index)
        //     } else {
        //         reveal(...fieldState.nearbyIndices)
        //     }
        //     if (fieldState.fieldVal === FieldSymbol.Mine) {
        //         const textNode = FieldText(FieldSymbol.Mine)
        //         fieldNode.appendChild(textNode)
        //     }
        //     return
        // case Click.Middle:
        // case Click.Right:
        //     if (!fieldState.isMarked()) {
        //         mark(fieldState.index)
        //     }
        //     return
        }
    }
}
