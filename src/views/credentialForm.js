import { styled, div, span, h1, button, input, addText } from 'flxels'
import { containerStyles, inputStyles, buttonStyles } from '../styles/credentialForm'
import { titleStyles } from '../styles/app'
import axios from 'axios'
import scrypt from 'scrypt-async'

const scryptOpts = {
	N: 16384,
	r: 8,
	p: 1,
	dkLen: 32,
	encoding: 'base64',
}

const logUrl = 'https://galerie-22.azurewebsites.net/login?user='
const regUrl = 'https://galerie-22.azurewebsites.net/register?user='

const submitHandler = e => {
	e.preventDefault()
	console.log('submit, event:', e)
	const loginData = e.currentTarget.getElementsByTagName('input')
	const [ user, pw, email ] = [ ...loginData ].map(el => el.value)
	scrypt(pw, '#$rfjm9nx8' + user, scryptOpts, pwHash => {
		axios({
			method: 'post',
			url: (email ? regUrl : logUrl) + user,
			data: email ? { user, pw: pwHash, email } : { user, pw: pwHash },
		})
			.then(res => console.log('response:', res))
			.catch(err => console.warn(err.response.data))
	})
}
const credentialForm = () => {
	const container = styled('form', containerStyles)
	container.addEventListener('submit', submitHandler)
	const title = h1(titleStyles)
	addText('Galerie', title)

	const usernameInput = input(inputStyles)
	usernameInput.placeholder = 'Username'

	const passwordInput = input(inputStyles)
	passwordInput.placeholder = 'Password'
	passwordInput.type = 'password'

	container.appendChild(usernameInput)
	container.appendChild(passwordInput)
	return container
}

export default credentialForm
