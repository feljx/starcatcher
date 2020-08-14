import { div, add_text } from 'flxels'
import Field from './Field'
import { grid_styles, game_styles, sidebar_styles } from './styles'
import Sidebar from './Sidebar'

export const STAR = '*'
export const FLAG = '#'

const mouse_event_handler = (ev: MouseEvent) => {
	const field = (ev.target as any).field
	if (field instanceof Field) {
		field.handle_click(ev.button)
	}
}

class Game {
	public stars_left = 0
	public fields_left = 0
	public game_over = false
	public end: Promise<boolean>
	public board: Field[]
	public container = div(game_styles)
	public grid = div(grid_styles)
	public sidebar: Sidebar
	private resolve_game: (game_over: boolean) => void

	constructor (
		private cols: number,
		private rows: number,
		private prob: number
	) {
		// init board
		this.create_board()
		this.solve_board()

		// prepare container
		this.sidebar = new Sidebar(this)
		this.container.appendChild(this.sidebar.container)
		this.container.appendChild(this.grid)

		// attach click event handlers
		this.container.oncontextmenu = ev => ev.preventDefault()
		this.grid.addEventListener('mousedown', mouse_event_handler)

		// store 'game over' promise resolve fn in game instance
		this.end = new Promise(resolve => {
			this.resolve_game = resolve
		})
	}

	private create_board () {
		// board is array of n (cols * rows) fields
		this.board = Array.from(
			{ length: this.cols * this.rows },
			(_, n) => {
				// calc field props
				const pos = this.xy(n)
				const is_star = Math.random() < this.prob
				const val = is_star ? STAR : undefined

				// increment counter
				if (is_star) ++this.stars_left
				else ++this.fields_left

				// create, append and return field
				const field = new Field(this, pos, val)
				this.grid.appendChild(field.container)
				return field
			}
		)
	}

	// convert n to [x, y] coordinate tuple
	private xy (n: number): [number, number] {
		const x = n % this.cols + 1
		const y = Math.trunc(n / this.cols) + 1
		return [ x, y ]
	}

	// mark fields with nearby star numbers
	private solve_board () {
		for (const field of this.board) {
			if (field.is_star) continue
			const stars = this.nearby(field).filter(f => f.is_star).length
			if (stars > 0) field.val = stars.toString()
		}
	}

	// get field from x, y coordinates
	private get_field (x: number, y: number): Field | undefined {
		if (x < 1 || y < 1) return
		if (x > this.cols || y > this.rows) return
		const n = --x + --y * this.cols
		return this.board[n]
	}

	public open_field (field: Field) {
		if (field.is_flagged) return

		if (field.is_star) {
			// end game before opening field
			// to overwrite possible win condition
			this.end_game(false)
			field.open()
		}
		else {
			// open one or multiple fields ('0 nearby' chain reaction)
			let to_be_opened = [ field ]
			while (to_be_opened.length > 0) {
				const f = to_be_opened.pop()
				if (!f.is_open) {
					f.open()
					if (f.is_empty) {
						const nearby_fields = this.nearby(f)
						to_be_opened.push(...nearby_fields)
					}
				}
			}
		}
	}

	// get array of nearby fields
	public nearby (field: Field): Field[] {
		const [ x, y ] = field.pos
		const nearby_fields: Field[] = []
		for (let n = 0; n < 9; ++n) {
			if (n !== 4) {
				const nearby_field = this.get_field(
					// calc x with integer division
					x - 1 + Math.trunc(n / 3),
					// calc y with modulo
					y - 1 + n % 3
				)
				nearby_field && nearby_fields.push(nearby_field)
			}
		}
		return nearby_fields
	}

	public end_game (game_won: boolean) {
		this.game_over = true
		if (game_won) this.sidebar.brighten_smile()
		else this.sidebar.sadden_smile()
		this.grid.removeEventListener('mousedown', mouse_event_handler)
		// resolve game_over promise, triggering game recreation
		this.resolve_game(game_won)
	}
}

export default Game

// attach flag keybind event handler ('f' key)
document.addEventListener('keydown', ev => {
	if (ev.code === 'KeyF') {
		const hovering = document.querySelectorAll(':hover')
		const tar = hovering[hovering.length - 1] as any
		if (tar.field instanceof Field) {
			if (!tar.field.game.game_over) tar.field.flag()
		}
	}
})
