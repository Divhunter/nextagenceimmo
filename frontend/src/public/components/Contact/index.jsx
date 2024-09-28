import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import Footer from '../Footer'
import HeaderBanner from '../HeaderBanner'
import woman from '../../assets/pictures/woman.png'
import ContactForm from '../../../functions/ContactForm'
import { faPrint, faEnvelope, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// styles
import './m-contact.css'
import './d-contact.css'

const Contact = () => {

    const biensArray = JSON.parse(localStorage.getItem('biensArray'))

    // Récupération de la fiche correspondante
	const { Id } = useParams()
    const card = biensArray.find(bien => bien.Id === parseFloat(Id))
    
    const contactHeader = pagesHeadersArray.find(el => el.title === "6")
    const contactHeaderArray = []
    contactHeaderArray.push(contactHeader)

    const isNoRef = card.Opérations.includes('En attente')
    const isAchatContact = card.Opérations.includes('Achat')
    const isVenteContact = card.Opérations.includes('Vente')
    const isLocationContact = card.Opérations.includes('Location')

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const navigate = useNavigate();

    const allOpérations = ['Achat', 'Location', 'Location saisonnière', 'Programme', 'Viager', 'Enchère']
    const isAnyOperationIncluded = allOpérations.some(operation => card.Opérations.includes(operation))

    const retour = () => {
        if (isAnyOperationIncluded) {
            navigate(`/BiensCard/${Id}`)
        } else {
            navigate('/')
        }
    }

	return (
        <>
            {card ?
                <section id='contact' className='contact'>
                    <HeaderBanner />
                    <h1 className='headerBanner__header__message'>Contact</h1>
                    <div className='content-contact'>
                        {(isAchatContact || isVenteContact || isLocationContact) && 
                            <ul className='content-contact__biensCard__content__tag biensCard__content__tag'>
                                {
                                    (
                                        card.Exclu !== false && card.Exclu !== "" &&
                                        card.Exclu !== undefined
                                    ) &&
                                    <li className='biensCard__content__tag__exclu'>Exclusivité</li>
                                } 
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
                                <li id='biensCard__content__tag__envoyer' title='Envoyer à un ami'>
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                    />
                                </li>
                                <li id='biensCard__content__tag__imprimer' title='Imprimer cette page'>
                                    <FontAwesomeIcon
                                        icon={faPrint}
                                    />
                                </li>
                            </ul>
                        }
                        <div className='containerContact'>
                            <div className='containerContact__text' >
                                {isNoRef &&
                                    <p className='containerContact__text__header'>
                                        Estimation offerte
                                    </p>
                                }
                                {isAchatContact &&
                                    <p className='containerContact__text__header'>
                                        Achat ref : {card.RefNum}
                                    </p>
                                }
                                {isVenteContact &&
                                    <p className='containerContact__text__header'>
                                        Estimation offerte
                                    </p>
                                }
                                {isLocationContact &&
                                    <p className='containerContact__text__header'>
                                        Location ref : {card.RefNum}
                                    </p>
                                }
                                <div className='containerContact__text__form'>
                                    <ContactForm />
                                </div>
                            </div>
                            <div className='containerContact__bloc'>
                                <img 
                                    className='containerContact__bloc__woman' 
                                    src={woman}
                                    width='1130px'
                                    height='2078px'
                                    fetchpriority='high' 
                                    alt='serrage de main'
                                />
                            </div>
                            <p className='containerContact__bloc__pub'>
                                La clé de vos 
                                <br/>
                                projets immo
                                <br/>
                                est à portée 
                                <br/>
                                de main
                            </p>
                        </div>
                    </div>
                </section>
                : 
                < Navigate replace to ="/Error" />
            }
            <br/><br/>
            <Footer />
        </>
	)
}

export default Contact