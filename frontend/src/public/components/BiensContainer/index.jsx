import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import HeaderBanner from '../HeaderBanner'

import './m-biensContainer.css'
import './d-biensContainer.css'

const BiensContainer = () => {
  
  const [resultMessage, setResultMessage] = useState('')

  const getBiensArray = localStorage.getItem('biensArray')
  const biensArray = JSON.parse(getBiensArray) || []

  // Récupération du tableau sortedIDsArray à partir du localStorage
  const sortedIDsArray = JSON.parse(localStorage.getItem('sortedIDsArray')) || []

  // Tri des biens dans l'ordre de sortedIDsArray
  const sortedBiens = sortedIDsArray.map((id) => biensArray.find((bien) => bien.Id === id))

  const isLocationAvailable = biensArray.some((bien) => bien.Opérations === "Location" && sortedIDsArray.includes(bien.Id))

  const isAchatAvailable = biensArray.some((bien) => bien.Opérations === "Achat" && sortedIDsArray.includes(bien.Id))

  const [selectedTypeLocation, setSelectedTypeLocation] = useState('')

  const filteredBiens = biensArray.filter((bien) => {
    return selectedTypeLocation === '' || (bien.TypesL ?? '').includes(selectedTypeLocation)
  })  
  
  useEffect(() => {
    document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    // Mise à jour du message en fonction du nombre de biens trouvés
    if (sortedBiens.length > 0) {
      setResultMessage(`Nous avons trouvé ${selectedTypeLocation === '' ? sortedBiens.length : filteredBiens.length} resultat(s) pour votre recherche`)
    } else {
      setResultMessage('Aucun bien ne correspond à votre recherche')
    }
  }, [sortedBiens, filteredBiens, selectedTypeLocation])

  return (
    <>
      <section className='biensContainer'>
        <HeaderBanner />
        <h1 className='headerBanner__header__message'>{resultMessage}</h1>

        {/*Relatif à aucun bien trouvé*/}

        {sortedBiens.length === 0 && (
          <Link to='/'>
            <button className='biensContainer__vide button'>
                Retour à l'Accueil
            </button> 
          </Link>
        )}

        {/*Relatif à l'option Location*/}

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
                htmlFor="location-select">Affinez votre recherche :
              </label>
              <br/><br/>
              <select 
                className='biensContainer__select__option' 
                name="location" 
                id="location-select"
                onChange={(e) => setSelectedTypeLocation(e.target.value)}
              >
                <option value="" style={{color: "#858585"}}>--Types de location--</option>
                <option value="Vide" style={{color: "black"}}>Vide</option>
                <option value="Meublé" style={{color: "black"}}>Meublé</option>
                <option value="Colocation" style={{color: "black"}}>Colocation</option>
              </select>
            </article>
          </>
        )}
        <br/>
        {selectedTypeLocation === '' ? 
        <div className='biensContainer__items'>
          {sortedBiens.map((item, Id) => (
            <Link to={`/BiensCard/${item.Id}`}>
              <div
                className='biensContainer__items__items' 
                key={Id}
              >
                <div className='biensContainer__items__items__content'>
                    <p className='biensContainer__items__items__content__secteur'>
                      {item.Secteur}
                    </p>
                    <p className='biensContainer__items__items__content__prix'>
                      {item.Prix}{item.Unite}
                    </p> 
                    <p className='biensContainer__items__items__content__description'>
                      {item.Description}
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
            </Link>
          ))} 
        </div> :
        <div className='biensContainer__items'>
          {filteredBiens.map((item, Id) => (
            <Link to={`/BiensCard/${item.Id}`}>
              <div
                className='biensContainer__items__items' 
                key={Id}
              >
                <div className='biensContainer__items__items__content'>
                    <p className='biensContainer__items__items__content__secteur'>
                      {item.Secteur}
                    </p>
                    <p className='biensContainer__items__items__content__prix'>
                      {item.Prix}{item.Unite}
                    </p> 
                    <p className='biensContainer__items__items__content__description'>
                      {item.Description}
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
            </Link>
          ))} 
        </div>
        }

        {/*Relatif à l'option Achat*/}

        {isAchatAvailable && (
          <>
            <p className='biensContainer__contentAchat'>
              <strong>
                Next agence Immo vous accompagne dans vos projets immobilier. 
                <br/>
                Nos 2 agences situées à Lyon et Vénissieux disposent des derniers outils technologiques et de la meilleure couverture publicitaire du marché.
              </strong>
              <br/><br/>
              Nous vous proposons :
              <br/><br/>
              - L’estimation gratuite de votre bien
              <br/>
              - Signature électronique du mandat de Achat certifiée
              <br/>
              - Visite 360 degrés 
              <br/>
              - Visite 3D Matterport
              <br/>
              - Reportage photo avec appareil professionnel 
              <br/>
              - Publicités avec visibilités maximales
              <br/>
              - Matières de communication physique (panneaux, flyers...) et digitale (réseaux sociaux...)
            </p>
          </>
        )}

        {/*Relatif à l'option Achat saisonnière*/}

      </section>
    <Footer/>
    </>
  )
}

export default BiensContainer
