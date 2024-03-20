import React from 'react'
import './modal.css'

const Modal = ({ active, setActive, children}) => {
    return (
        <div className={active ? "userModal active" : "userModal"} onClick={() => setActive(false)}>
            <div className={active ? "userModal__content active" : "userModal__content"} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}

export default Modal;