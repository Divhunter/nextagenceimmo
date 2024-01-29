import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../PagesHeaders'
import logoPro from '../../assets/pictures/logo-pro.png'


// styles
import './m-pro.css'
import './d-pro.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Prof = () => {

    const proHeader = pagesHeadersArray.find(el => el.title === "5")
    const proHeaderArray = []
    proHeaderArray.push(proHeader)

	return (
		<section 
            id='pro' 
            className='pro'
        >
            {proHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='pro-header-text'>
                            {item.titleCol1}
                            <br/>
                            <img
                                src={logoPro} 
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-pro'
                            />
                        </div>
                    }
                    subTitle1={
                        <div id='titlePro'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                    text1={
                        <>
                            <section className='why'>
                                <div className='pagination'>4</div>
                                <header>
                                    Pourquoi choisir mutuact
                                </header>
                                <p>
                                    Nous vous offrons des solutions d'assurance professionnelles adaptées à vos besoins spécifiques.
                                    <br/><br/>
                                    Que vous ayez besoin d'une Responsabilité Civile Professionnelle infaillible, d'une Multirisque Professionnelle complète pour vos bureaux, ou encore d'une Assurance Décennale pour garantir la qualité de vos réalisations à long terme, nous sommes là pour vous.
                                    <br/><br/>
                                    Chez mutuact, nous ne proposons pas seulement des polices d'assurance standard, nous créons des partenariats qui évoluent avec votre activité. Nos solutions d'assurance sont conçues pour anticiper les risques, protéger votre patrimoine professionnel, et vous permettre de vous concentrer sur ce que vous faites de mieux.
                                    <br/><br/>
                                    Parce que chaque entreprise est unique, nous personnalisons nos offres pour assurer une couverture optimale et adaptée à votre secteur d'activité. Faites équipe avec des professionnels qui comprennent vos besoins. Contactez-nous dès maintenant pour explorer comment nos solutions d'assurance professionnelle peuvent être le pilier de votre réussite.
                                </p>
                            </section>
                        </>
                    }
                />
            ))}
		</section>
	)
}

export default Prof