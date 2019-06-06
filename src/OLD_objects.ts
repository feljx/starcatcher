import { span, add_text, restyle, remove_text } from 'flxels'
import {
	cell_styles,
	open_cell_styles,
	flagged_cell_styles,
	ZOOMED_FONT_SIZE,
} from './styles'
import Game from './OLD_g'

export const STAR = '*'
export const EMPTY = ''
export const FLAG = '#'

export interface GameObject {
	container: ObjectContainer
}

export interface Cell extends GameObject {
	is_open: boolean
	is_flagged: boolean
	nearby_cells: Cell[]
	container: ObjectContainer
}

export interface ObjectContainer extends HTMLElement {
	game_obj: GameObject
}

export class Cell implements Cell {
	private _value: string
	private _nearby_stars: number

	constructor (private parent: Game) {
		this.is_open = false
		this.is_flagged = false
		this.container = span(cell_styles) as ObjectContainer
		this.container.game_obj = this
	}

	init (nearby_cells: Cell[], nearby_stars: number) {}

	set value (val: string) {
		if (this._value === undefined) this._value = val
	}
	get value () {
		return this._value
	}
	get is_star (): boolean {
		return this.value === STAR
	}
	get is_empty (): boolean {
		return this.value === EMPTY
	}
	set nearby_stars (num_stars: number) {
		this._nearby_stars = num_stars
		if (!this.is_star) this._value = num_stars.toString()
    }
    
    react_to_click () {
        if (this.is_open) 

    }

	open (from_event?: boolean) {
		// cell is not open
		if (!this.is_open) {
			if (!this.is_flagged) {
				restyle(this.container, open_cell_styles)
				this.is_open = true

				if (this.is_empty) {
					for (const cell of this.nearby_cells) {
						if (!cell.is_star) cell.open()
					}
				}
				else {
					add_text(this.container, this.value)
					if (this.is_star) {
						this.container.style.fontSize = ZOOMED_FONT_SIZE
					}
				}
			}
		}
		else if (from_event) {
			console.log('CELL OPEN')
			// cell is open
			// if no stars nearby, return
			if (this._nearby_stars === 0) return
			// no need to check for star (open star = game over)
			let nearby_flagged = 0
			for (const cell of this.nearby_cells) {
				if (cell.is_flagged) ++nearby_flagged
			}
			if (this._nearby_stars === nearby_flagged) {
				for (const cell of this.nearby_cells) {
					cell.open()
				}
			}
		}
    }
    
    open_nonflagged () {

    }

	flag () {
		if (!this.is_open) {
			if (!this.is_flagged) {
				restyle(this.container, flagged_cell_styles)
				add_text(this.container, FLAG)
			}
			else {
				restyle(this.container, cell_styles)
				remove_text(this.container)
			}
			this.is_flagged = !this.is_flagged
		}
	}
}
