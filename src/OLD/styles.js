export const STARRYFIRE = '#b50060'
export const STARRYGOLD = '#efde73'
export const STARRYNIGHT = '#1d2856'

const CELL_NUM = 15
const RAW_CELL_SIZE = 2
export const CELL_SIZE = RAW_CELL_SIZE.toString() + 'rem'
export const ZOOMED_FONT_SIZE = (RAW_CELL_SIZE * 1.5).toString() + 'rem'

const NO_USER_SELECT = {
    '-ms-user-select': 'none',
    '-moz-user-select': 'none',
    '-webkit-user-select': 'none',
    userSelect: 'none'
}
const PROTO_CELL_STYLES = {
    width: CELL_SIZE,
    height: CELL_SIZE,
    fontSize: '1.8rem',
    fontFamily: 'Arial',
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'pointer',
    ...NO_USER_SELECT
}

export const body_styles = {
    backgroundColor: STARRYNIGHT,
    fontFamily: 'Times, serif',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'flex-start',

    '> *': {
        marginTop: '1rem'
    }
}

export const title_styles = {
    color: STARRYGOLD,
    fontSize: '4rem',
    marginTop: '2rem'
    // lineHeight: '0',
}

export const game_styles = {
    color: STARRYGOLD,
    display: 'flex',
    marginLeft: '-10rem'
}

export const sidebar_styles = {
    width: '6rem',
    fontSize: '3.2rem',
    // fontFamily: 'Helvetica',
    // fontWeight: 'bold',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginRight: '4rem',

    '> *': {
        padding: '0.6rem'
    },

    '> *:not(:first-child)': {
        marginTop: '3rem'
    }
}

export const smile_styles = {
    padding: '0.6rem',
    cursor: 'pointer',
    ':hover': {
        background: STARRYGOLD,
        color: STARRYNIGHT
    }
}

export const grid_styles = {
    color: STARRYGOLD,

    display: 'grid',
    gridGap: '0.3rem',
    gridTemplateColumns: `repeat(${CELL_NUM}, 1fr)`,
    gridTemplateColumns: `repeat(${CELL_NUM}, 1fr)`
}

export const cell_styles = {
    ...PROTO_CELL_STYLES,
    background: STARRYGOLD,
    color: STARRYNIGHT,

    ':hover': {
        color: STARRYGOLD,
        background: STARRYFIRE
    }
}

export const open_cell_styles = {
    ...PROTO_CELL_STYLES,
    background: STARRYNIGHT,
    color: STARRYGOLD
}

export const flagged_cell_styles = {
    ...PROTO_CELL_STYLES,
    background: STARRYFIRE,
    color: STARRYGOLD
}
