import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../PagesHeaders'
import logoAuto from '../../assets/pictures/logo-auto.png'

// styles
import './m-auto.css'
import './d-auto.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Auto = () => {

    const autoHeader = pagesHeadersArray.find(el => el.title === "7")
    const autoHeaderArray = []
    autoHeaderArray.push(autoHeader)

	return (
		<section 
            id='auto' 
            className='auto'
        >
            {autoHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='auto-header-text'>
                            {item.titleCol1}
                            <br/>
                            <img
                                src={logoAuto} 
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-auto'
                            />
                        </div>
                    }
                    subTitle1={
                        <div id='titleAuto'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                    text1={
                        <>
                            <section className='why'>
                                <div className='pagination'>6</div>
                                <header>
                                    Pourquoi choisir mutuact
                                </header>
                                <p>
                                    Que vous soyez locataire ou propriétaire, que vous possédiez une résidence secondaire ou un immeuble, notre objectif est de protéger ce qui compte le plus pour vous. Laissez-nous vous guider à travers des options d'assurance habitation flexibles, conçues pour s'adapter à votre style de vie.
                                    <br/><br/>
                                    N'ayez pas peur de comparer. Parce que nous comprenons que chaque situation est unique, nous vous offrons la possibilité de personnaliser votre couverture. Ne compromettez pas votre sécurité et votre tranquillité d'esprit. Optez pour des assurances qui s'adaptent à votre réalité.
                                    <br/><br/>
                                    Contactez-nous dès aujourd'hui pour découvrir comment nos solutions d'assurance auto, moto et habitation peuvent s'aligner parfaitement sur votre mode de vie dynamique. Votre protection, notre engagement.
                                </p>
                            </section>
                        </>
                    }
                />
            ))}
		</section>
	)
}

export default Auto