/**
 *	get random hex color string
 *
 * @returns {string}
 */
export const randomColor = function () {
	const random_number = ~~(Math.random() * (1 << 24))
	const hex_color_string = '#' + random_number.toString(16)
	return hex_color_string
}
