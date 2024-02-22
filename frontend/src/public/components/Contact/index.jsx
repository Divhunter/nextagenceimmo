import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import biensArray from '../../datas/biensArray.json'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import Footer from '../Footer'
import HeaderBanner from '../HeaderBanner'
import woman from '../../assets/pictures/woman.png'
import ContactForm from '../../../functions/ContactForm'

// styles
import './m-contact.css'
import './d-contact.css'

const Contact = () => {

    // Récupération de la fiche correspondante
	const { Id } = useParams()
    const card = biensArray.find(bien => bien.Id === parseFloat(Id))
    
    const contactHeader = pagesHeadersArray.find(el => el.title === "6")
    const contactHeaderArray = []
    contactHeaderArray.push(contactHeader)

    const isVenteContact = card.Opérations.includes("Vente")
    const isLocationContact = card.Opérations.includes("Location")

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

	return (
        <>
            {card ?
                <section id='contact' className='contact'>
                    <HeaderBanner />
                    <h1 className='headerBanner__header__message'>Contact</h1>
                    <div className='content-contact'>
                    <div className='containerContact'>
                        <div className='containerContact__text' >
                            {isVenteContact &&
                                <p className='containerContact__text__header'>
                                    Estimation offerte
                                </p>
                            }
                            {isLocationContact &&
                                <p className='containerContact__text__header'>
                                    Location
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
            <Footer />
        </>
	)
}

export default Contact