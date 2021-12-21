import React from 'react'

const Button = ({color, text, onAddBtnClick}) => {

    return (
        <button onClick={onAddBtnClick} style={{ backgroundColor: color }} className='btn'>{text}</button>
    )
}

Button.defaultProps = {
    color: 'steelBlue',
}

export default Button