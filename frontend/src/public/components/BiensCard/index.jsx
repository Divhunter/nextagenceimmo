import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Link, Link as Contact } from 'react-router-dom'
import Carrousel from '../Carrousel'
import Footer from '../Footer'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import { faPrint, faEnvelope, faArrowCircleLeft, faChevronDown, faChevronUp, faCalculator } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// styles
import './m-biensCard.css'
import './d-biensCard.css'

const BiensCard = () => {

    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }, [])

    const navigate = useNavigate()

    const biensArray = JSON.parse(localStorage.getItem('biensArray'))

    const sortedIDsArray = JSON.parse(localStorage.getItem('sortedIDsArray'))

    const [ upAndDownResume, setUpAndDownResume ] = useState(true)
    const isUpAndDownResume = () => {
        setUpAndDownResume(!upAndDownResume)
    }

    const [ upAndDownSurfaces, setUpAndDownSurfaces ] = useState(true)
    const isUpAndDownSurfaces = () => {
        setUpAndDownSurfaces(!upAndDownSurfaces)
    }

    const [ upAndDownPrestations, setUpAndDownPrestations ] = useState(true)
    const isUpAndDownPrestations = () => {
        setUpAndDownPrestations(!upAndDownPrestations)
    }

    const [ upAndDownProximités, setUpAndDownProximités ] = useState(true)
    const isUpAndDownProximités = () => {
        setUpAndDownProximités(!upAndDownProximités)
    }

    const [ upAndDownEfficacitéEnergétique, setUpAndDownEfficacitéEnergétique ] = useState(true)
    const isUpAndDownEfficacitéEnergétique = () => {
        setUpAndDownEfficacitéEnergétique(!upAndDownEfficacitéEnergétique)
    }

    const [ upAndDownInformationsLégales, setUpAndDownInformationsLégales ] = useState(true)
    const isUpAndDownInformationsLégales = () => {
        setUpAndDownInformationsLégales(!upAndDownInformationsLégales)
    }

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

    const generateRésumé = (label, value) => {
        return (
            (
                label !== null && label !== "" && label!== undefined &&
                value !== null && value !== "" && value!== undefined 
            ) &&
            <p>{label}: <span><strong>{value}</strong></span></p>
        )
    }

    const generateSurfaces = (label, nb, surface) => {
        return (
            (
                label !== null && label !== "" && label!== undefined &&
                nb !== null && nb !== "" && nb!== undefined &&
                surface !== null && surface !== "" && surface!== undefined
            ) &&
            <p>{label}: <span><strong>nb {nb} - {surface} m²</strong></span></p>
        )
    }

    const generatePrestations = (value) => {
        return (
            (value !== null && value !== "" && value!== undefined) &&
            <p>{value}</p>
        )
    }

    const generateProximités = (value) => {
        return (
            (value !== null && value !== "" && value!== undefined) &&
            <p>{value}</p>
        )
    }

    const generateEfficacitéEnrg = (label, pic) => {
        return (
            (   
                label !== null && label !== "" && label!== undefined &&
                pic !== null && pic !== "" && pic!== undefined
            ) &&
          <div>
            <p>{label}</p>
            <img 
                src={pic} 
                width='980px'
                height='980px'
                loading='lazy'
                alt='Classe énergétique/climatique'
            />
          </div>
        )
    }

    const isAchat = card.Opérations.includes("Achat")
   
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
                                    <div 
                                        className={
                                            upAndDownResume ? 
                                            'biensCard-dropdown--Up': 
                                            'biensCard-dropdown--Down'}
                                    >
                                        <header onClick={() => isUpAndDownResume()}>
                                            <p>
                                                Résumé
                                                {upAndDownResume ? 
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                    />
                                                </span> :
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}
                                                    />
                                                </span>}
                                            </p>
                                        </header>
                                        {generateRésumé("Pièce(s)", card.Résumé.Pièces)}
                                        {generateRésumé("Surface", card.Résumé.Surface)}
                                        {generateRésumé("Chauffage", card.Résumé.Chauffage)}
                                        {generateRésumé("Eau chaude", card.Résumé.EauChaude)}
                                        {generateRésumé("État", card.Résumé.Etat)}
                                        {generateRésumé("Étage", card.Résumé.Etage)}
                                        {generateRésumé("Construit en", card.Résumé.ConstruitEn)}
                                        {generateRésumé("Disponibilité", card.Résumé.Disponibilité)}
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        className={
                                            upAndDownSurfaces ? 
                                            'biensCard-dropdown--Up': 
                                            'biensCard-dropdown--Down'}
                                    >
                                        <header onClick={() => isUpAndDownSurfaces()}>
                                            <p>
                                                Surfaces
                                                {upAndDownSurfaces ? 
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                    />
                                                </span> :
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}
                                                    />
                                                </span>}
                                            </p>
                                        </header>
                                        {generateSurfaces("Pièce(s) de vie", card.Surfaces.PièceDeVieNb, card.Surfaces.PièceDeVieSurface)}
                                        {generateSurfaces("Entré(s)", card.Surfaces.EntréeNb, card.Surfaces.EntréeSurface)}
                                        {generateSurfaces("Séjour(s) - surface ref", card.Surfaces.SéjourNb, card.Surfaces.SéjourSurface)}
                                        {generateSurfaces("Cuisine(s)", card.Surfaces.CuisineNb, card.Surfaces.CuisineSurface)}
                                        {generateSurfaces("Balcon(s) - surface ref", card.Surfaces.BalconNb, card.Surfaces.BalconSurface)}
                                        {generateSurfaces("Couloir(s)", card.Surfaces.CouloirNb, card.Surfaces.CouloirSurface)}
                                        {generateSurfaces("Chambre(s) - surface ref", card.Surfaces.ChambresNb, card.Surfaces.ChambresSurface)}
                                        {generateSurfaces("Salle(s) de bain - surface ref", card.Surfaces.SalleDeBainNb, card.Surfaces.SalleDeBainSurface)}
                                        {generateSurfaces("Toilette(s)", card.Surfaces.ToilettesNb, card.Surfaces.ToilettesSurface)}
                                        {generateSurfaces("Cave(s)", card.Surfaces.CaveNb, card.Surfaces.CaveSurface)}
                                        {generateSurfaces("Garage(s) / Parking(s)", card.Surfaces.GarageNbParkingNb, card.Surfaces.GarageSurafecParkinSurface)}
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        className={
                                            upAndDownPrestations ? 
                                            'biensCard-dropdown--Up': 
                                            'biensCard-dropdown--Down'}
                                    >
                                        <header onClick={() => isUpAndDownPrestations()}>
                                            <p>
                                                Prestations
                                                {upAndDownPrestations ? 
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                    />
                                                </span> :
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}
                                                    />
                                                </span>}
                                            </p>
                                        </header>
                                        {generatePrestations(card.Prestations.DoubleVitrage)}
                                        {generatePrestations(card.Prestations.FenêtresPVC)}
                                        {generatePrestations(card.Prestations.Volets)}
                                        {generatePrestations(card.Prestations.Meublé)}
                                        {generatePrestations(card.Prestations.Ascenseur)}
                                        {generatePrestations(card.Prestations.FibreOptique)}
                                        {generatePrestations(card.Prestations.Interphone)}
                                        {generatePrestations(card.Prestations.Cafetière)}
                                        {generatePrestations(card.Prestations.Four)}
                                        {generatePrestations(card.Prestations.FourMicroOndes)}
                                        {generatePrestations(card.Prestations.LaveLinge)}
                                        {generatePrestations(card.Prestations.LaveVaisselle)}
                                        {generatePrestations(card.Prestations.LingeDeMaison)}
                                        {generatePrestations(card.Prestations.PlaqueDeCuisson)}
                                        {generatePrestations(card.Prestations.Réfrigérateur)}
                                        {generatePrestations(card.Prestations.Vaisselle)}
                                        {generatePrestations(card.Prestations.PortailElectrique)}
                                        {generatePrestations(card.Prestations.AccèsHandicapé)}
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        className={
                                            upAndDownProximités ? 
                                            'biensCard-dropdown--Up': 
                                            'biensCard-dropdown--Down'}
                                    >
                                        <header onClick={() => isUpAndDownProximités()}>
                                            <p>
                                                Proximités
                                                {upAndDownProximités ? 
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                    />
                                                </span> :
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}
                                                    />
                                                </span>}
                                            </p>
                                        </header>
                                        {generateProximités(card.Proximités.Bus)}
                                        {generateProximités(card.Proximités.Commerces)}
                                        {generateProximités(card.Proximités.ÉcolePrimaire)}
                                        {generateProximités(card.Proximités.ÉcoleSecondaire)}
                                        {generateProximités(card.Proximités.Hôpital)}
                                        {generateProximités(card.Proximités.Parc)}
                                        {generateProximités(card.Proximités.Supermarché)}
                                        {generateProximités(card.Proximités.Tram)}
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        className={
                                            upAndDownEfficacitéEnergétique ? 
                                            'biensCard-dropdown--Up': 
                                            'biensCard-dropdown--Down'}
                                    >
                                        <header onClick={() => isUpAndDownEfficacitéEnergétique()}>
                                            <p>
                                                Éfficacité énergétique
                                                {upAndDownEfficacitéEnergétique ? 
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                    />
                                                </span> :
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}
                                                    />
                                                </span>}
                                            </p>
                                        </header>
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergNeutre)}
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergA)}
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergB)}
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergC)}
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergD)}
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergE)}
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergF)}
                                        {generateEfficacitéEnrg("Classe Énergie :", card.EfficacitéEnergétique.EnergG)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimNeutre)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimA)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimB)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimC)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimD)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimE)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimF)}
                                        {generateEfficacitéEnrg("Classe Climat :", card.EfficacitéEnergétique.ClimG)}
                                    </div>
                                </li>
                                <li>
                                    <div 
                                        className={
                                            upAndDownInformationsLégales ? 
                                            'biensCard-dropdown--Up': 
                                            'biensCard-dropdown--Down'}
                                    >
                                        <header onClick={() => isUpAndDownInformationsLégales()}>
                                            <p>
                                                Informations légales
                                                { upAndDownInformationsLégales ? 
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronDown}
                                                    />
                                                </span> :
                                                <span>
                                                    <FontAwesomeIcon
                                                        icon={faChevronUp}
                                                    />
                                                </span>}
                                            </p>
                                        </header>
                                        {
                                            (
                                                card.InformationsLégales.ÉnergieConso !== null && card.InformationsLégales.ÉnergieConso !== "" &&
                                                card.InformationsLégales.ÉnergieConso !== undefined
                                            ) &&
                                            <p>Énergie CC :<span><strong>{card.InformationsLégales.ÉnergieConso}</strong></span></p>
                                        } 

                                        {
                                            (
                                                card.InformationsLégales.HonorairesAcharge !== null && card.InformationsLégales.HonorairesAcharge !== "" &&
                                                card.InformationsLégales.HonorairesAcharge !== undefined
                                            ) &&
                                            <p>{card.InformationsLégales.HonorairesAcharge}</p>
                                        } 

                                        {
                                            (
                                                card.InformationsLégales.ZoneSoumise !== null && card.InformationsLégales.ZoneSoumise !== "" &&
                                                card.InformationsLégales.ZoneSoumise !== undefined
                                            ) &&
                                            <p>{card.InformationsLégales.ZoneSoumise}</p>
                                        }

                                        {
                                            (
                                                card.InformationsLégales.LoyerDeBase !== null && card.InformationsLégales.LoyerDeBase !== "" &&
                                                card.InformationsLégales.LoyerDeBase !== undefined
                                            ) &&
                                            <p>Loyer de base :<span><strong>{card.InformationsLégales.LoyerDeBase} €</strong></span></p>
                                        } 

                                        {
                                            (
                                                card.InformationsLégales.LoyerDeRef !== null && card.InformationsLégales.LoyerDeRef !== "" &&
                                                card.InformationsLégales.LoyerDeRef !== undefined
                                            ) &&
                                            <p>Loyer de référence majoré :<span><strong>{card.InformationsLégales.LoyerDeRef} €</strong></span></p>
                                        }  

                                        {
                                            (
                                                card.InformationsLégales.ChargesMois !== null && card.InformationsLégales.ChargesMois !== "" &&
                                                card.InformationsLégales.ChargesMois !== undefined
                                            ) &&
                                            <p>Charges de copropriété :<span><strong>{card.InformationsLégales.ChargesMois} € / Mois</strong></span></p>
                                        }   

                                        {
                                            (
                                                card.InformationsLégales.LoiCarrez !== null && card.InformationsLégales.LoiCarrez !== "" &&
                                                card.InformationsLégales.LoiCarrez !== undefined
                                            ) &&
                                            <p>Loi Carrez :<span><strong>{card.InformationsLégales.LoiCarrez} m²</strong></span></p>
                                        }     

                                        {
                                            (
                                                card.InformationsLégales.Honoraires !== null && card.InformationsLégales.Honoraires !== "" &&
                                                card.InformationsLégales.Honoraires !== undefined
                                            ) &&
                                            <p>Honoraires d'agence :<span><strong>{card.InformationsLégales.Honoraires} € TTC</strong></span></p>
                                        }   

                                        {
                                            (
                                                card.InformationsLégales.DépôtDeGarantie !== null && card.InformationsLégales.DépôtDeGarantie !== "" &&
                                                card.InformationsLégales.DépôtDeGarantie !== undefined
                                            ) &&
                                            <p>Dépôt de garantie :<span><strong>{card.InformationsLégales.DépôtDeGarantie} €</strong></span></p>
                                        }   

                                        {
                                            (
                                                card.InformationsLégales.ÉtatDesLieux !== null && card.InformationsLégales.ÉtatDesLieux !== "" &&
                                                card.InformationsLégales.ÉtatDesLieux !== undefined
                                            ) &&
                                            <p>État des lieux :<span><strong>{card.InformationsLégales.ÉtatDesLieux} € TTC</strong></span></p>
                                        } 

                                        {
                                            (
                                                card.InformationsLégales.ChargesDeCopropriété !== null && card.InformationsLégales.ChargesDeCopropriété !== "" &&
                                                card.InformationsLégales.ChargesDeCopropriété !== undefined
                                            ) &&
                                            <p>Charges de copropriété :<span><strong>{card.InformationsLégales.ChargesDeCopropriété} € / Mois</strong></span></p>
                                        } 

                                        {
                                            (
                                                card.InformationsLégales.MontantEstimé !== null && card.InformationsLégales.MontantEstimé !== "" &&
                                                card.InformationsLégales.MontantEstimé !== undefined
                                            ) &&
                                            <p>Dépenses d'énergie :<span><strong>{card.InformationsLégales.MontantEstimé} (annuel)</strong></span></p>
                                        } 

                                        {
                                            (
                                                card.InformationsLégales.BarèmHonnoraires !== null && card.InformationsLégales.BarèmHonnoraires !== "" &&
                                                card.InformationsLégales.BarèmHonnoraires !== undefined
                                            ) &&
                                            <Link to='https://www.nextagenceimmo.com/fr/mentions-legales'><p className='barem'>{card.InformationsLégales.BarèmHonnoraires}</p></Link>
                                        } 

                                        {
                                            (
                                                card.InformationsLégales.ProcédureEnCours !== null && card.InformationsLégales.ProcédureEnCours !== "" &&
                                                card.InformationsLégales.ProcédureEnCours !== undefined
                                            ) &&
                                            <p>Procédure en cours :<span><strong>{card.InformationsLégales.ProcédureEnCours}</strong></span></p>
                                        } 
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </article>
                <div className='biensCard-button-container'>
                    {isAchat &&
                        <Contact to='https://www.matchcredit.fr/calculette/mensualite-credit-immobilier'>
                            <p className='button biensCard-button-container__simulateur'>
                                Simulateur&nbsp;
                                <FontAwesomeIcon
                                    icon={faCalculator}
                                />
                            </p>
                        </Contact> 
                    }
                    <Contact to={`/Contact/${Id}`}>
                        <p className='button biensCard-button-container__contact'>Contactez-nous</p>
                    </Contact>
                    <br/>
                    <br/>
                    <br/>
                </div>
            </section>
            <Footer/>
        </>
    ) : (
        < Navigate replace to ="/Error" />
    )
}

export default BiensCard