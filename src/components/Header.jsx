import React from 'react'
import Button from './Button'
import { useLocation } from 'react-router-dom'

const Header = ({onShowForm, isFormShowed}) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1>Task Tracker</h1>
            {location.pathname === '/' && <Button
                color={isFormShowed ? 'red' : 'green'}
                text={isFormShowed ? 'Close' : 'Add'}
                onAddBtnClick={onShowForm}
            />}
        </header>
    )
}

export default Header
