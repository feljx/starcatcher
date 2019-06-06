import { span, restyle, remove_text, add_text } from 'flxels'
import Game, { STAR, FLAG } from './Game'
import {
	cell_styles,
	flagged_cell_styles,
	open_cell_styles,
	ZOOMED_FONT_SIZE,
	STARRYFIRE,
	STARRYNIGHT,
} from './styles'

class Field {
	public container: any = span(cell_styles)
	public is_flagged = false
	public is_open = false

	constructor (
		private game: Game,
		public pos: [number, number],
		public val: string | undefined
	) {
		this.container.field = this
	}

	get is_star () {
		return this.val === STAR
	}

	get is_empty () {
		return this.val === undefined
	}

	get has_nearby_stars () {
		return !isNaN(Number(this.val))
	}

	flag () {
		if (this.is_open) return
		if (this.is_flagged) {
			restyle(this.container, cell_styles)
			remove_text(this.container)
		}
		else {
			restyle(this.container, flagged_cell_styles)
			add_text(this.container, FLAG)
		}
		this.is_flagged = !this.is_flagged
	}

	open () {
		// do nothing if field is open or flagged
		if (this.is_open || this.is_flagged) return

		// restyle field, update state, update sidebar
		restyle(this.container, open_cell_styles)
		this.is_open = true
		--this.game.fields_left
		this.game.sidebar.update_counter()

		// is field is not empty, add text and style
		if (!this.is_empty) {
			add_text(this.container, this.val as string)
			if (this.is_star) {
				this.container.style.background = STARRYFIRE
				this.container.style.color = STARRYNIGHT
				this.container.style.fontSize = ZOOMED_FONT_SIZE
			}
		}

		// if game is won
		if (this.game.fields_left === 0) this.game.end_game(true)
	}

	safe_reveal () {
		const nearby_fields = this.game.nearby(this)
		const nearby_flagged = nearby_fields.filter(f => f.is_flagged)
			.length
		// if number of nearby stars equals number of nearby flags
		if (nearby_flagged === Number(this.val)) {
			// message game to open all nearby fields
			for (const f of nearby_fields) {
				this.game.open_field(f)
			}
		}
	}

	handle_click (button: number) {
		// if field is already open and field has nearby stars
		if (this.is_open && this.has_nearby_stars) {
			// attempt to safely reveal nearby fields
			this.safe_reveal()
		}
		else {
			// if field is closed
			// left click -> message game to open field
			if (button === 0) this.game.open_field(this)
			// right click -> flag field
			if (button === 2) this.flag()
		}
	}
}

export default Field
