import { Cell, STAR, EMPTY } from './OLD_objects'
// import { pipe } from 'ramda'

class Game implements Game {
	static columns: number
	static rows: number
	static n: number
	static game_over: boolean
	static cells: Cell[]

	static play (columns: number, rows: number, probability: number) {
		this.columns = columns
		this.rows = rows
		this.n = columns * rows
		this.game_over = true

		const cell_values = Array.from({ length: this.n }, () => {
			return Math.random() < probability ? STAR : EMPTY
		})
		this.cells = cell_values.map(val => {
			const cell = new Cell(this)
			cell.value = val
			return cell
		})

		this.stars_and_neighbours()

		// 	for (const c of this.cells) {
		// 		c.open()
		// 	}
	}

	static stars_and_neighbours () {
		for (let n = 0; n < this.cells.length; ++n) {
			const cell = this.cells[n]
			const [ x, y ] = this.xy(n)
			const nearby_coords = this.nearby([ x, y ])
			let nearby_stars = 0
			const nearby_cells = nearby_coords
				.map(coords => this.get_cell(coords))
				.filter(cell => {
					if (cell !== undefined) {
						if (cell.is_star) ++nearby_stars
						return true
					}
				})

			// init cell
			cell.nearby_cells = nearby_cells
			if (nearby_stars > 0) {
				cell.nearby_stars = nearby_stars
				console.log('nearby stars', cell.nearby_stars)
			}
		}
	}

	static xy (n: number): [number, number] {
		const x = n % this.columns + 1
		const y = Math.trunc(n / this.columns) + 1
		return [ x, y ]
	}

	static nearby (xy: [number, number]): [number, number][] {
		const coords: [number, number][] = []
		for (let n = 0; n < 9; ++n) {
			n !== 4 &&
				coords.push([
					// calc x with integer division
					xy[0] - 1 + Math.trunc(n / 3),
					// calc y with modulo
					xy[1] - 1 + n % 3,
				])
		}
		return coords
	}

	static get_cells (coords: [number, number][]): Cell[] {
		return coords.map(this.get_cell)
	}

	static get_cell (xy: [number, number]): Cell | undefined {
		const [ x, y ] = xy
		if (x < 1 || y < 1) return undefined
		if (x > this.columns || y > this.rows) return undefined
		const n = x - 1 + this.columns * (y - 1)
		return this.cells[n]
	}
}

export default Game
