import React, { FunctionComponent } from 'react'
import ReactDOM from 'react-dom'

import './styles.css'

const App: FunctionComponent = () => {
    return (
        <React.Fragment>
            <p>This cat is rendered in React.</p>
        </React.Fragment>
    )
}

const container = document.getElementById('react-container')
ReactDOM.render(<App />, container)
