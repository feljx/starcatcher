import { styled, div, span, h1, button, input, addText } from 'flxels'
import { containerStyles, inputStyles, buttonStyles } from '../styles/credentialForm'
import credentialForm from './credentialForm'

const registration = () => {
	const container = credentialForm()

	const emailInput = input(inputStyles)
	emailInput.placeholder = 'Email'
	emailInput.type = 'email'

	const registerButton = button(buttonStyles)
	registerButton.type = 'submit'
	addText('Register', registerButton)

	container.appendChild(emailInput)
	container.appendChild(registerButton)
	return container
}

export default registration
