import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import biensArray from '../../datas/biensArray.json'
import Footer from '../Footer'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import './m-biensContainer.css'
import './d-biensContainer.css'

const BiensContainer = () => {
  const [resultMessage, setResultMessage] = useState('')

  // Récupération du tableau sortedIDsArray à partir du localStorage
  const sortedIDsArray = JSON.parse(localStorage.getItem('sortedIDsArray')) || []

  // Tri des biens dans l'ordre de sortedIDsArray
  const sortedBiens = sortedIDsArray.map((id) => biensArray.find((bien) => bien.Id === id))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    // Mise à jour du message en fonction du nombre de biens trouvés
    if (sortedBiens.length > 0) {
      setResultMessage('Votre resultat de recherche')
    } else {
      setResultMessage('Aucun bien ne correspond à votre recherche')
    }
  }, [sortedBiens])

  return (
    <>
      <section className='biensContainer'>
        <Link to='/'>
          <img
            className='nav__menu__logo-nai'
            src={logoNAIS}
            max-width='4123px'
            max-height='1554px'
            fetchpriority='high'
            alt='logo de notre agence immo'
          />
        </Link>
        <h1 className='biensContainer__message'>{resultMessage}</h1>
        <Link to='https://app.zelok.fr/auth/signup/locataire/step2'>
          <div 
            className='biensContainer__button button'
          >
            Mon dossier en ligne
          </div>
        </Link>
        <br/><br/>
        <div className='biensContainer__items'>
          {sortedBiens.map((item, id) => (
            <div
              className='biensContainer__items__items' 
              key={id}
            >
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
