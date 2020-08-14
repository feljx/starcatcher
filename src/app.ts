import Game from './Game'
import { Options, Difficulty } from './Shared'

//
// HTML Containers
//

// const appContainer = document.getElementById('app')
const gameContainer = document.getElementById('game')

//
// Start Game!
//

const defaultOptions: Options = {
    diff: Difficulty.Intermediate,
    numCols: 15,
    numRows: 15,
}
const game = new Game(defaultOptions, gameContainer)

//
//
//

//
// Hot Module Replacement (HMR)
//

if (module.hot) {
    // module.hot.accept('./views/login', () => {
    // 	context.renderView(login)
    // })
    module.hot.accept()
    module.hot.dispose(() => {
        document.body.className = ''
        gameContainer.remove()
        // title.remove()
        // game.container.remove()
        // for (const f of g.board) {
        // 	f.container.remove()
        // }
    })
}
