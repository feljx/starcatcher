import render from './Renderable'
import Game from './Game'

// Constants
const GAME_CONTAINER = document.getElementById('game') as HTMLDivElement
const DEFAULT_PARAMS = {
    cols: 15,
    rows: 15,
}

// Render
const game = new Game(DEFAULT_PARAMS)
game.renderTo(GAME_CONTAINER)

//
//
//

// style document body
// style(document.body, body_styles)

// app title
// const title = h1(title_styles)
// add_text(title, 'starcatcher')
// render(title).to(document.body)

// game settings
// const cols = 15
// const rows = 15
// const prob = 0.15

// game start
// let game: Game
// const start_game = () => {
//     game = new Game(cols, rows, prob)
//     game.sidebar.attach_smile_click(() => {
//         game.container.remove()
//         start_game()
//     })
//     // game.end.then(game_won => {
//     // 	game.sidebar.sadden_smile()
//     // })
//     document.body.appendChild(game.container)
// }

// HMR stuff
if (module.hot) {
    // module.hot.accept('./views/login', () => {
    // 	context.renderView(login)
    // })
    module.hot.accept()
    module.hot.dispose(() => {
        document.body.className = ''
        GAME_CONTAINER.remove()
        // title.remove()
        // game.container.remove()
        // for (const f of g.board) {
        // 	f.container.remove()
        // }
    })
}
