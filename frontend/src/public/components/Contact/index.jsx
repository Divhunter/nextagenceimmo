import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import biensArray from '../../datas/biensArray.json'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../PagesHeaders'
import Footer from '../Footer'
import woman from '../../assets/pictures/woman.png'
import ContactForm from '../../../functions/ContactForm'
import logoContact from '../../assets/pictures/logo-contact.png'

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
                    <div className='contact__header'>
                        <Link to='/'>
                            <img
                            className='contact__header__logo'
                            src={logoNAIS}
                            max-width='4123px'
                            max-height='1554px'
                            fetchpriority='high'
                            alt='logo de notre agence immo'
                            />
                        </Link>
                    </div>
                    {contactHeaderArray.map((item, index) => (
                        <PagesHeaders 
                            key={index}
                            titleCol1={
                                <div id='contact-header-text' className='contact section--padding'>
                                    <img
                                        src={logoContact}
                                        className='header-logo'
                                        width='615px'
                                        height='747px'
                                        loading='lazy'
                                        alt='logo-contact'
                                    />
                                    <br/>
                                    {item.titleCol1}
                                </div>
                            }
                            subTitle1={
                                <div id='titleContact'>
                                    {item.subTitle1}
                                </div>
                            }
                            subTitle2={item.subTitle2}
                            text1={
                                <>
                                    <br/><br/>
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
                                </>
                            } 
                        />
                    ))}
                </section>
                : 
                <section id='contact' className='contact'>
                    <div className='contact__header'>
                        <Link to='/'>
                            <img
                            className='contact__header__logo'
                            src={logoNAIS}
                            max-width='4123px'
                            max-height='1554px'
                            fetchpriority='high'
                            alt='logo de notre agence immo'
                            />
                        </Link>
                    </div>
                    {contactHeaderArray.map((item, index) => (
                        <PagesHeaders 
                            key={index}
                            titleCol1={
                                <div id='contact-header-text' className='contact section--padding'>
                                    <img
                                        src={logoContact}
                                        className='header-logo'
                                        width='615px'
                                        height='747px'
                                        loading='lazy'
                                        alt='logo-contact'
                                    />
                                    <br/>
                                    {item.titleCol1}
                                </div>
                            }
                            subTitle1={
                                <div id='titleContact'>
                                    {item.subTitle1}
                                </div>
                            }
                            subTitle2={item.subTitle2}
                            text1={
                                <>
                                    <br/><br/>
                                    <div className='containerContact'>
                                        <div className='containerContact__text' >
                                                <p className='containerContact__text__header'>
                                                    Estimation offerte
                                                </p>
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
                                </>
                            } 
                        />
                    ))}
                </section>
            }
            <Footer />
        </>
	)
}

export default Contact