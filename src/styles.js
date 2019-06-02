export const bodyStyles = {
	backgroundColor: '#232359',
	fontFamily: 'Times, serif',
	marginTop: '2rem',

	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
}

export const titleStyles = {
	fontSize: '4rem',
	color: 'lavender',
	lineHeight: '0',
}

// html {
//     background-color: midnightblue;
//     color: lavender;
// }

// #mid {
//     display: flex;
//     flex-direction: column;
// }

// h1 {
//     font-family: Times, serif;
//     font-size: 4rem;
// }

export const containerStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'space-evenly',

	'> *': {
		width: '18rem',

		':not(:first-child)': {
			marginTop: '2.2rem',
		},

		'> button:not(:first-child)': {
			marginLeft: '2rem',
		},
	},
}

export const inputStyles = {
	fontSize: '1.8rem',
	color: 'lavender',
	background: 'none',
	border: 'none',
	borderBottom: '0.1rem solid lavender',
	outline: 'none',
	paddingBottom: '0.4rem',
}

export const buttonStyles = {
	color: 'midnightblue',
	fontSize: '1.8rem',
	outline: 'none',
	border: 'none',
	padding: '0.2rem 0.5rem',
}
