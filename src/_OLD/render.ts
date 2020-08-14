import Game from './Game2'

type Renderable = Game | HTMLElement

function render (...children: Renderable[]) {
    function to (parent: Renderable) {
        const p = parent
        for (const c of children) {
            const cref = c instanceof HTMLElement ? c : c.container
            const pref = p instanceof HTMLElement ? p : p.container
            pref.appendChild(cref)
        }
    }
    return { to }
}

export default render
