import { Link } from 'react-router-dom'

import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../PagesHeaders'
import logoGestion from '../../assets/pictures/logo-gestion.png'

// styles
import './m-gestion.css'
import './d-gestion.css'

const Gestion = () => {
    
    const gestionHeader = pagesHeadersArray.find(el => el.title === "2")
    const gestionHeaderArray = []
    gestionHeaderArray.push(gestionHeader)

	return (
		<section id='gestion' className='gestion'>
            {gestionHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='gestion-header-text'>
                            <img
                                src={logoGestion}
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-gestion'
                            />
                            <br/>
                            {item.titleCol1}
                        </div>
                    }
                    subTitle1={
                        <div id='titlegestion'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                    button={
                        <Link to='https://www.orchestrav2.egiweb.net/'>
                            <p className='button'>Accès intranet</p>
                        </Link>
                    }
                    text1={
                        <>
                            <section className='why'>
                                <div className='pagination'>10</div>
                                <header>
                                    points d'engagement
                                </header>
                                <p>
                                    &#8226; Estimation locative de votre bien offerte
                                    <br/><br/>
                                    &#8226; Visites systématiquement accompagnées
                                    <br/><br/>
                                    &#8226; Etude approfondie du dossier du candidat locataire
                                    <br/><br/>
                                    &#8226; Etats des lieux informatisés réalisés par nos soins
                                    <br/><br/>
                                    &#8226; Gestion des problèmes techniques et des sinistres
                                    <br/><br/>
                                    &#8226; Suivi des contentieux et gestion assurance loyers impayés
                                    <br/><br/>
                                    &#8226; Conseils juridiques, fiscaux et techniques
                                    <br/><br/>
                                    &#8226; Gestionnaires réactifs et disponibles
                                    <br/><br/>
                                    &#8226; Aide à la déclaration des revenus fonciers
                                    <br/><br/>
                                    &#8226; Espace client dédié en ligne
                                </p>
                            </section>
                        </>
                    } 
                />
            ))}
		</section>
	)
}

export default Gestion