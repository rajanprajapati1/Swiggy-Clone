import React from 'react'

const Overlay = ({onClose}) => {
    return (
            <div 
                className={`fixed top-0 left-0 right-0 bottom-0 z-[10000] bg-[#282c3f] opacity-70`}
                onClick={onClose}
            >
            </div>
    )
}

export default Overlay