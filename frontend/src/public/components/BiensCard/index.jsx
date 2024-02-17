import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carrousel from '../Carrousel'
import Footer from '../Footer'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import biensArray from '../../datas/biensArray.json'
import { faPrint, faEnvelope, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// styles
import './m-biensCard.css'
import './d-biensCard.css'

const BiensCard = () => {

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
    }, [])

    const navigate = useNavigate();

    const sortedIDsArray = JSON.parse(localStorage.getItem('sortedIDsArray'))

    const retour = () => {
       
        if (sortedIDsArray) {
            navigate('/biensContainer')
        } else {
            navigate('/')
        }
    }

    // Récupération de la fiche correspondante
	const { Id } = useParams()
    const card = biensArray.find(bien => bien.Id === parseFloat(Id))

    return card ? (
        <>
            <section className='biensCard'>
                <div className='biensCard__header'>
                    <Link to='/'>
                        <img
                        className='biensCard__header__logo'
                        src={logoNAIS}
                        max-width='4123px'
                        max-height='1554px'
                        fetchpriority='high'
                        alt='logo de notre agence immo'
                        />
                    </Link>
                </div>
                <article className='biensCard__content'>
                    <ul className='biensCard__content__tag'>
                        <li>{card.Opérations}</li>
                        <li>{card.TypesB}</li>
                        <li>{card.NombreP}</li>
                        <li>{card.Localisations}</li>
                        <li 
                            id='biensCard__content__tag__retour'
                            onClick={retour}
                        >
                            Retour&nbsp;
                            <FontAwesomeIcon
								icon={faArrowCircleLeft}
							/>
                        </li>
                        <li id='biensCard__content__tag__envoyer'>
                            <FontAwesomeIcon
								icon={faEnvelope}
							/>
                        </li>
                        <li id='biensCard__content__tag__imprimer'>
                            <FontAwesomeIcon
								icon={faPrint}
							/>
                        </li>
                    </ul>
                    <Carrousel/>
                    <div className='biensCard__content__text'>
                        <div className='biensCard__content__text__description'>
                            <header>
                                <h1>Description</h1>
                            </header>
                            <p><strong>{card.RefString}{card.RefNum}</strong> - {card.Description}</p>
                            <br/><br/>
                            <ul className='biensCard__content__text__description__title'>
                                <li>
                                    <div>
                                        <header>Résumé</header>
                                        <p>
                                            Pièces : <span><strong>{card.NombreP}</strong></span>
                                            <br/>
                                            Surface : <span><strong>{card.Surface}</strong></span>
                                        </p>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <header>Surfaces</header>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <header>Prestations</header>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <header>Efficacité énergéitique</header>
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <header>Informations légales</header>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='biensCard__content__text__form'>

                        </div>
                    </div>
                </article>
            </section>
            <Footer/>
        </>
    ) : (
        < Navigate replace to ="/Error" />
    )
}

export default BiensCard