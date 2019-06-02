const MISSING_ARGS = 'render function needs child args or child[]'

/**
 * @param  {HTMLElement[]} children
 * @returns {Object}
 */
function render(...children) {
    if (children.length < 1) throw new Error(MISSING_ARGS)
    const arrayPassed = children[0] instanceof Array
    if (arrayPassed) children = children[0]

	/**
     * @param {HTMLElement} parent
     * @returns {void}
     */
    function to(parent) {
        for (const c of children) {
            parent.appendChild(c)
        }
    }
    return { to }
}

export default render
