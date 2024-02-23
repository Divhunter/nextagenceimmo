import { useParams } from 'react-router-dom'
import { useState } from "react"
import arrow from '../../assets/pictures/arrow.png'

import './m-carrousel.css'
import './d-carrousel.css'

// Définition du Carrousel
const Carrousel = () => {

	const biensArray = JSON.parse(localStorage.getItem('biensArray'))

	// Récupération de la fiche correspondante 
	const { Id } = useParams()
    const card = biensArray.find(bien => bien.Id === parseFloat(Id))

	let picsLength = card.Pictures.length // Définition de la longueur de l'objet Carrousel

	const [currentPic, setCurrentPic] = useState(0) // Définition du state

	// Définition de la fonction pour aller à l'image suivante du carrousel (+1 à currentPic)
	const nextPic = () => {
		setCurrentPic(currentPic === picsLength - 1 ? 0 : currentPic + 1)
	}

	// Définition de la fonction pour aller à l'image précédente du carrousel (-1 à currentPic)
	const prevPic = () => {
		setCurrentPic(currentPic === 0 ? picsLength - 1 : currentPic - 1)
	}

	return (

		<div className='carrousel'>
			{/* On map dans le tableau/objet slides, les images et leurs index */}
		  	{card.Pictures.map((picture, index) => {
				
				return (
					<div
						// On ajoute l'index à la div et les class active/inactive pour afficher/cacher 
						key={index}
						className={
						index === currentPic ?
							'carrousel carrousel__pictures__active':
							'carrousel carrousel__pictures__inactive'
						}
					>
						{/* Si l'index est égal à currentPic, alors on ajoute l'image au carrousel*/}
						{index === currentPic && (
								<img src={picture} 
									alt='inside-lodgement' 
									className='carrousel__pictures carrousel__pictures__current' 
								/>
							)
						}
					</div>
				)
			})}

			<h1 className='carrousel__secteur'>{card.Secteur}<br/>{card.Prix}{card.Unite}</h1>

			{/* affiche les boutons next/previous et du compteur si il y a plus d'un élément dans le carrousel */}
			{picsLength > 1 ? (
				<>
					<button className='carrousel__button carrousel__button__left' onClick={prevPic}>
						<img src={arrow} alt='left' 
							className='carrousel__button__arrow carrousel__button__arrow__left' 
						/>
					</button>
					<button className='carrousel__button carrousel__button__right' onClick={nextPic}>
						<img src={arrow} alt='right' 
							className='carrousel__button__arrow carrousel__button__arrow__right' 
						/>
					</button>
					<p className='carrousel__count'>
						{currentPic + 1} / {picsLength} 
					</p>
				</>
			) : null}
		</div>
	)
}
 
export default Carrousel