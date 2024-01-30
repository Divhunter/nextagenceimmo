import { Link } from 'react-scroll'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../../components/PagesHeaders'
import couple from '../../assets/pictures/couple.jpg'
import logoDrapeau from '../../assets/pictures/logo-drapeau.png'

// styles
import './m-about.css'
import './d-about.css'

const About = () => { 
    
    const aboutHeader = pagesHeadersArray.find(el => el.title === "1") 
    const aboutHeaderArray = []
    aboutHeaderArray.push(aboutHeader)

	return (
		<section 
                id='about' 
                className='about'
        >
            {aboutHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='about-header-text'>
                            <img
                                src={logoDrapeau}
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-drapeau'
                            />
                            <br/>
                            {item.titleCol1}
                        </div>
                    }
                    subTitle1={
                        <div id='titleAbout'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                    button={
                        <Link to='contact'>
                            <p className='button'>Contactez-nous</p>
                        </Link>
                    }
                    text1={
                        <div id='containerAbout' className='containerAbout'>
                            <p className='containerAbout__text' >
                                <span className='containerAbout__text__header'>
                                    La clé de vos projets immo !
                                </span>
                                <br/><br/>
                                À Lyon depuis plus d'une décennie, Notre Agence Immo s'est affirmée comme le partenaire de confiance pour tous vos projets immobiliers en région Rhône-Alpes. Notre devise, "La clé de vos projets immo", reflète notre engagement à rendre vos rêves immobiliers accessibles et réalisables.
                                <br/><br/>
                                Nous suivons assidûment l'évolution dynamique du marché immobilier avec passion et expertise. Notre équipe dévouée, composée d'experts locaux, possède une connaissance approfondie du marché lyonnais et de ses environs. Que vous envisagiez d'acheter, de vendre ou de gérer votre patrimoine immobilier, nous sommes là pour vous guider à chaque étape.
                                <br/><br/>
                                Chez Notre Agence Immo, nous comprenons l'importance des outils technologiques de pointe dans le secteur immobilier moderne. Nous investissons constamment dans les dernières technologies pour offrir à nos clients une expérience transparente et efficace. Nous bénéficions, par ailleurs, de la meilleure couverture publicitaire du marché, assurant une visibilité maximale pour vos biens.
                                <br/><br/>
                                Ici, nous ne vendons pas simplement des propriétés, nous créons des opportunités et réalisons des rêves. Ouvrons la porte à vos projets...
                                <br/><br/>
                                <div className='end'>La clé est à portée de main !</div>
                            </p>
                            <div className='containerAbout__bloc'>
                                <img 
                                    className='containerAbout__bloc__couple' 
                                    src={couple}
                                    alt='serrage de main'
                                />
                                <p className='containerAbout__bloc__pub'>
                                    <span>La clé</span> 
                                    <br/>
                                    de vos projets
                                    <br/> 
                                    immo à portée de main
                                </p>
                            </div>
                        </div>
                    } 
                />
            ))}
		</section>
	)
}

export default About