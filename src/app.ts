import render from './render'
import { h1, add_text, style, div } from 'flxels'
import { body_styles, title_styles, grid_styles } from './styles'
import Game from './Game'

// style document body
style(document.body, body_styles)

// app title
const title = h1(title_styles)
add_text(title, 'starcatcher')
render(title).to(document.body)

// game settings
const cols = 15
const rows = 15
const prob = 0.15

// game start
let game: Game
const start_game = () => {
	game = new Game(cols, rows, prob)
	game.sidebar.attach_smile_click(() => {
		game.container.remove()
		start_game()
	})
	// game.end.then(game_won => {
	// 	game.sidebar.sadden_smile()
	// })
	document.body.appendChild(game.container)
}

// start game
start_game()

// HMR stuff
if (module.hot) {
	// module.hot.accept('./views/login', () => {
	// 	context.renderView(login)
	// })
	module.hot.accept()
	module.hot.dispose(() => {
		document.body.className = ''
		title.remove()
		game.container.remove()
		// for (const f of g.board) {
		// 	f.container.remove()
		// }
	})
}
