import render from './render'
import { h1, addText, style } from 'flxels'
import { bodyStyles, titleStyles } from './styles'

// Style document body
style(bodyStyles, document.body)

// App title
const title = h1(titleStyles)
addText('starcatcher', title)

// Render title to body
render(title).to(document.body)

// HMR stuff
if (module.hot) {
	// module.hot.accept('./views/login', () => {
	// 	context.renderView(login)
	// })
	module.hot.accept()
	module.hot.dispose(() => {
		document.body.className = ''
		title.remove()
	})
}
