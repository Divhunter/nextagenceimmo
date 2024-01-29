import React, { useState, useEffect } from 'react'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './m-scrollToTop.css'

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 700) {
                setShowTopBtn(true)
            } else {
                window.scroll = 0
                setShowTopBtn(false)
            }
        })
    }, [])

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className="top-to-btm">
            {' '}
            {showTopBtn && (
                <FontAwesomeIcon 
                    className='icon-position icon-style' 
                    icon={faAngleUp} onClick={goToTop}
                />
            )}{' '}
        </div>
    )
}

export default ScrollToTop