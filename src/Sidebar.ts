import { div, add_text, remove_text } from 'flxels'
import { sidebar_styles, smile_styles } from './styles'
import Game from './Game'

class Sidebar {
	public container = div(sidebar_styles)
	private smile = div(smile_styles)
	private star_counter = div()

	constructor (private game: Game) {
		add_text(this.smile, '; >')
		this.update_counter()
		this.container.appendChild(this.smile)
		this.container.appendChild(this.star_counter)
	}

	attach_smile_click (restart_game: () => void) {
		this.smile.addEventListener('click', ev => {
			restart_game()
		})
	}

	brighten_smile () {
		remove_text(this.smile)
		add_text(this.smile, '<3')
	}

	sadden_smile () {
		remove_text(this.smile)
		add_text(this.smile, ': <')
	}

	update_counter () {
		remove_text(this.star_counter)
		add_text(this.star_counter, this.game.stars_left.toString())
	}
}

export default Sidebar
