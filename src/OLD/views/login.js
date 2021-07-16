import { styled, div, span, h1, button, input, addText } from 'flxels'
import { containerStyles, inputStyles, buttonStyles } from '../styles/credentialForm'
import credentialForm from './credentialForm'

const login = () => {
	const container = credentialForm()

	const loginButton = button(buttonStyles)
	loginButton.type = 'submit'
	addText('Log in', loginButton)

	container.appendChild(loginButton)
	return container
}

export default login
