import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import biensArray from '../../datas/biensArray.json'
import Footer from '../Footer'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import lyon from '../../assets/pictures/lyon.jpg'
import './m-biensContainer.css'
import './d-biensContainer.css'

const BiensContainer = () => {
  const [resultMessage, setResultMessage] = useState('')

  // Récupération du tableau sortedIDsArray à partir du localStorage
  const sortedIDsArray = JSON.parse(localStorage.getItem('sortedIDsArray')) || []

  // Tri des biens dans l'ordre de sortedIDsArray
  const sortedBiens = sortedIDsArray.map((id) => biensArray.find((bien) => bien.Id === id))

  const isLocationAvailable = biensArray.some((bien) => bien.Opérations === "Location" && sortedIDsArray.includes(bien.Id));

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Mise à jour du message en fonction du nombre de biens trouvés
    if (sortedBiens.length > 0) {
      setResultMessage(`Nous avons trouvé ${sortedBiens.length} resultat(s) pour votre recherche`)
    } else {
      setResultMessage('Aucun bien ne correspond à votre recherche')
    }
  }, [sortedBiens])

  return (
    <>
      <section className='biensContainer'>
        <div className='biensContainer__header'>
        <Link to='/'>
            <img
              className='biensContainer__header__logo'
              src={logoNAIS}
              max-width='4123px'
              max-height='1554px'
              fetchpriority='high'
              alt='logo de notre agence immo'
            />
          </Link>
          <img
            className='biensContainer__header__pic'
            src={lyon}
            max-width='2000px'
            max-height='630px'
            fetchpriority='high'
            alt='ville de lyon panoramique'
          />
          <h1 className='biensContainer__header__message'>{resultMessage}</h1>
        </div>
        {isLocationAvailable && (
          <>
            <Link to='https://app.zelok.fr/auth/signup/locataire/step2'>
              <div 
                className='biensContainer__button button'
              >
                Votre dossier locataire
              </div>
            </Link>
            <br/><br/><br/><br/>
            <article className='biensContainer__select'>
              <label 
                className='biensContainer__select__label' 
                for="location-select">Affinez votre recherche :
              </label>
              <br/><br/>
              <select className='biensContainer__select__option' name="location" id="location-select">
                <option value="" style={{color: "#858585"}}>--Types de location--</option>
                <option value="Vide" style={{color: "black"}}>Vide</option>
                <option value="Meublé" style={{color: "black"}}>Meublé</option>
                <option value="Colocation" style={{color: "black"}}>Colocation</option>
              </select>
            </article>
          </>
        )}
        <br/>
        <div className='biensContainer__items'>
          {sortedBiens.map((item, Id) => (
            <div
              className='biensContainer__items__items' 
              key={Id}
            >
              <div className='biensContainer__items__items__content'>
                  <p>
                    {item.designation}
                  </p>  
              </div>
              {item.Exclu ?
                <p className='biensContainer__items__items__exclu'>Exclusivité</p>
                : null
              }
              <img
                className='biensContainer__items__items__covers'
                src={item.Cover}
                max-width='1500px'
                max-height='1000px'
                fetchpriority='high'
                alt='bien immobilier'
              />
            </div>
          ))}
        </div>
      </section>
    <Footer/>
    </>
  )
}

export default BiensContainer
