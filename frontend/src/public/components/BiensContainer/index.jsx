import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import biensArray from '../../datas/biensArray.json'
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
    // Mise à jour du message en fonction du nombre de biens trouvés
    if (sortedBiens.length > 0) {
      setResultMessage('Votre Résultat de recherche')
    } else {
      setResultMessage('Aucun bien ne correspond à votre recherche')
    }
  }, [sortedBiens])

  return (
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
      <div className='biensContainer__items'>
        {sortedBiens.map((item, id) => (
          <div key={id}>
            <img
              className='biensContainer__items__covers'
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
  )
}

export default BiensContainer
