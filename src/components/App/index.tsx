import React, { FunctionComponent } from 'react'
import { Game } from '../Game'

import css from './styles.module.css'

export const App: FunctionComponent = () => {
    return (
        <React.Fragment>
            <h1 className={css.title}>starcatcher</h1>
            <Game />
        </React.Fragment>
    )
}
