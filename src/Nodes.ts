import { FieldState, GameState } from './State'
import { FieldSymbol } from './Shared'
import { FieldClickHandler } from './Handlers'

const enum CssClass {
    Game = 'game',
    Menu = 'menu',
    MenuItem = 'menu-item',
    Board = 'board',
    Field = 'field',
}

//
// Node base classes
//
abstract class __Node {
    public readonly container: HTMLElement

    constructor (container: HTMLElement, ...cssClasses: CssClass[]) {
        this.container = container
        this.container.classList.add(...cssClasses)
    }

    append (...nodes: _Node[]) {
        this.container.append(...nodes.map((n) => n.container))
    }
}

abstract class _Node extends __Node {
    constructor (tag: string, ...cssClasses: CssClass[]) {
        super(document.createElement(tag), ...cssClasses)
    }
}

abstract class _NodeWithText extends _Node {
    private textNode = document.createTextNode('')

    constructor (tag: string, ...cssClasses: CssClass[]) {
        super(tag, ...cssClasses)
        this.container.appendChild(this.textNode)
    }

    updateText (newText: string) {
        this.textNode.nodeValue = newText
    }
}

//
// Game
//

export class GameNode extends __Node {
    public menuNode = new MenuNode()
    public boardNode: BoardNode

    constructor (state: GameState, container?: HTMLElement) {
        super(container || document.createElement('div'), CssClass.Game)
        this.boardNode = new BoardNode(state)
        this.append(this.menuNode, this.boardNode)
    }
}

export default GameNode

//
// Menu
//

class MenuNode extends _Node {
    private menuItems: MenuItemNode[]

    constructor () {
        super('ul', CssClass.Menu)
        const toMenuItem = (label: string) => new MenuItemNode(label)
        this.menuItems = [ 'Settings', 'New Game', 'Forfeit' ].map(toMenuItem)
        this.append(...this.menuItems)
    }
}

//
// Menu item

class MenuItemNode extends _NodeWithText {
    constructor (label: string) {
        super('li', CssClass.MenuItem)
        this.updateText(label)
    }
}

//
// Board
//

class BoardNode extends _Node {
    private fieldNodes: FieldNode[]

    constructor (state: GameState) {
        super('div', CssClass.Board)
        const toField = (state: FieldState) => new FieldNode(state)
        this.fieldNodes = state.fields.map(toField)
        this.append(...this.fieldNodes)
    }
}

//
// Field
//

class FieldNode extends _NodeWithText {
    constructor (state: FieldState) {
        super('div', CssClass.Field)
        this.container.onclick = FieldClickHandler(state, this.container)
    }
}
