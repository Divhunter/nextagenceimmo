import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import selectionArray from '../../datas/selectionArray.json'
import { faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// styles
import './m-selectionSlide.css'
import './d-selectionSlide.css'

const SelectionSlide = () => {

    const picLength = selectionArray.length // Définition de la longueur de l'objet Carrousel

	let [currentPic, setCurrentPic] = useState(0) // Définition du state

	// Définition de la fonction pour aller à l'image suivante du carrousel (+1 à currentPic)
	const nextPic = () => {
		setCurrentPic(currentPic === picLength - 1 ? 0 : currentPic + 1);
	}

	// Définition de la fonction pour aller à l'image précédente du carrousel (-1 à currentPic)
	const prevPic = () => {
		setCurrentPic(currentPic === 0 ? currentPic - 1 : currentPic - 1);
	}

    return (
        <div className='selection-slide'>
        
            {picLength > 1 ? (
                <>
                    <FontAwesomeIcon
                        className='selection-slide__arrow selection-slide__arrow-left' 
                        icon={faChevronLeft}
                        onClick={prevPic} 
                    />
                    <FontAwesomeIcon
                        className='selection-slide__arrow selection-slide__arrow-right' 
                        icon={faChevronRight}
                        onClick={nextPic} 
                    />
                </>
            ) : null}
            
            {selectionArray.map((items, id) => (
                <div key={id}>
                    <div className='selection-slide__card'>
                        <Link to={`/Lodgement/${items.id}`}>
                            <h1 className='selection-slide__card__img'>{items.img}</h1>
                            <h2 className='selection-slide__card__lieux'>{items.lieux}</h2>
                            <p className='selection-slide__card__designation'>{items.designation}</p>
                            <p className='selection-slide__card__lieux'>{items.prix}</p>
                            <p className='selection-slide__card__exclu'>{items.exclu}</p>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    ) 
}

export default SelectionSlide