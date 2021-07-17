import React, { FunctionComponent, useState } from 'react'

export const Game: FunctionComponent = () => {
    const [ stars_left, set_stars_left ] = useState(0)
    const [ fields_left, set_fields_left ] = useState(0)
    const [ game_over, set_game_over ] = useState(0)

    return (
        <React.Fragment>
            <div>Game</div>
        </React.Fragment>
    )
}
