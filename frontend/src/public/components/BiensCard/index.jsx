import { useParams, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carrousel from '../Carrousel'
import Footer from '../Footer'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import biensArray from '../../datas/biensArray.json'

// styles
import './m-biensCard.css'
import './d-biensCard.css'

const BiensCard = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

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
                    </ul>
                    <p className='biensCard__content__tag__prix'>
                            {card.Prix}{card.Unite}
                    </p>
                    <Carrousel/>
                </article>
            </section>
            <Footer/>
        </>
    ) : (
        < Navigate replace to ="/Error" />
    )
}

export default BiensCard