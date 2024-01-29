import React, { useContext, useEffect, useRef, useState } from 'react'
import { BsBellFill } from 'react-icons/bs'
import './notification.css'
import ModalNotification from './ModalNotification/ModalNotification'
import { ProjectContext } from '../../context/ProjetContext'

const Notification = () => {
    const { projets } = useContext(ProjectContext)

    const [isOpen, setIsOpen] = useState(false)

    const modalRef = useRef();

    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsOpen(!isOpen);
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('click', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isOpen]);
    return (
        <div ref={modalRef} className='notif-container' onClick={() => setIsOpen(!isOpen)} >
            <div className='notif'>
                {projets && projets.length > 0 && projets.filter((projet) => projet.isRead === false).length !== 0 &&
                    <span className='notif-count'>
                        {projets.filter((projet) => projet.isRead === false).length}
                    </span>
                }
                <BsBellFill className='bell' />
                <ModalNotification isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>

        </div>
    )
}

export default Notification