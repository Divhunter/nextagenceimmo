import React, { useContext } from 'react'
import './modalNotification.css'
import { Link } from 'react-router-dom';
import { ProjectContext } from '../../../context/ProjetContext';

const ModalNotification = ({ isOpen }) => {
    const { projets } = useContext(ProjectContext)
    if (projets && projets.length > 0 && projets?.filter((projet) => projet.isRead === false).length === 0) {
        return null;
    }
    if (!isOpen) return null;
    return (
        <div
            className='modal-container-notif'>
            <div className="modal-notif">
                {
                   projets && projets.length > 0 && projets?.filter((projet) => projet.isRead === false).sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).map((item, index) => (
                        < Link key={index} to={`/dashboard/card/${item.id}`} className='link-modal'>
                            <div className='profil-modal'>
                                <div className='photo-modal'>
                                    <span className='profil-initial-modal'>{item.firstName[0]}</span>
                                    <span className='profil-initial-modal'>{item.lastName[0]}</span>
                                </div>
                                <div className='profil-info-modal'>
                                    <span className='full-name-modal'>
                                        <span>{item.firstName}</span>
                                        <span>{item.lastName}</span>
                                    </span>
                                    <span className='date-modal'>Le {new Date(item.createdDate).toLocaleDateString("en-GB")} à {new Date(item.createdDate).getHours()}h:{new Date(item.createdDate).getMinutes()}</span>
                                </div>
                            </div>
                        </Link>
                    ))
                }

            </div>
        </div >
    )
}

export default ModalNotification