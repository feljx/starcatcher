import cxs from 'cxs'

export const Context = class {
	constructor (container, views) {
		this.container = this.c = container
		this.children = views
		this.state = this.s = {}
	}

	render () {
		for (const view of this.children) {
			this.clearView(view)
			this.renderView(view)
		}
	}

	/**
	 * Clear given view from state and DOM.
	 * @param {Function} view
	 */
	clearView (view) {
		if (this.s[view.name]) {
			this.s[view.name].remove()
			this.s[view.name] = undefined
		}
	}
	/**
	 * Render given view to state and DOM.
	 * Clear view in the process.
	 * @param {Function} view
	 */
	renderView (view) {
		this.clearView(view)
		const instance = view()
		this.container.appendChild(instance)
		this.s[view.name] = instance
	}
}

export const RenderingContext = Context

/**
 * Create new element.
 * @param {*} tag
 * @returns HTMLElement
 */
export const el = tag => document.createElement(tag)

/**
 * Create new styled element.
 * @param {String} tag
 * @param {Object} styles
 * @returns HTMLElement
 */
export const styled = (tag, styles) => {
	if (!styles) throw new Error('"styles" object must be defined')
	const el = document.createElement(tag)
	el.className = cxs(styles)
	return el
}

/**
 * Add styles to given element.
 * @param {Object} styles
 * @param {HTMLElement} el
 */
export const style = (styles, el) => addClass(cxs(styles), el)

/**
 * Add class to given element.
 * @param {String} cls
 * @param {HTMLElement} el
 */
export const addClass = (cls, el) => (el.className += ` ${cls}`)

/**
 * Add text node to given element.
 * @param {String} txt
 * @param {HTMLElement} el
 */
export const addText = (txt, el) => el.appendChild(document.createTextNode(txt))

/**
 * Create new styled div element.
 * @param {Object} styles
 * @returns HTMLDivElement
 */
export const div = styles => (styles ? styled : el)('div', styles)

/**
 * Create new styled span element.
 * @param {Object} styles
 * @returns HTMLSpanElement
 */
export const span = styles => (styles ? styled : el)('span', styles)

/**
 * Create new styled h1 element.
 * @param {Object} styles
 * @returns HTMLHeadingElement
 */
export const h1 = styles => (styles ? styled : el)('h1', styles)

/**
 * Create new styled h2 element.
 * @param {Object} styles
 * @returns HTMLHeadingElement
 */
export const h2 = styles => (styles ? styled : el)('h2', styles)

/**
 * Create new styled paragraph element.
 * @param {Object} styles
 * @returns HTMLParagraphElement
 */
export const p = styles => (styles ? styled : el)('p', styles)

/**
 * Create new styled input element.
 * @param {Object} styles
 * @returns HTMLParagraphElement
 */
export const input = styles => (styles ? styled : el)('input', styles)

/**
 * Create new styled button element.
 * @param {Object} styles
 * @returns HTMLParagraphElement
 */
export const button = styles => (styles ? styled : el)('button', styles)
