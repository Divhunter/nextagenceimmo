import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../PagesHeaders'
import logoPret from '../../assets/pictures/logo-pret.png'

// styles
import './m-pret.css'
import './d-pret.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Pret = () => {

    const pretHeader = pagesHeadersArray.find(el => el.title === "6")
    const pretHeaderArray = []
    pretHeaderArray.push(pretHeader)

	return (
		<section 
            id='pret' 
            className='pret'
        >
            {pretHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='pret-header-text'>
                            {item.titleCol1}
                            <br/>
                            <img
                                src={logoPret} 
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-pret'
                            />
                        </div>
                    }
                    subTitle1={
                        <div id='titlePret'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                    text1={
                        <>
                            <section className='why'>
                                <div className='pagination'>5</div>
                                <header>
                                    Pourquoi choisir mutuact
                                </header>
                                <p>
                                    Cette assurance n'est pas seulement une formalité, c'est une barrière de protection cruciale. Elle garantit la continuité du remboursement de votre emprunt en cas de situations difficiles telles que le décès, l'invalidité, ou la perte d'emploi. Au-delà de la tranquillité d'esprit qu'elle offre à vous et à votre entourage, elle constitue également une sécurité pour l'organisme de crédit.
                                    <br/><br/>
                                    Imaginez, en cas de circonstances imprévues, l'assurance prend le relais, soulageant ainsi le fardeau financier qui pourrait peser sur votre famille. C'est un investissement dans la stabilité de votre avenir financier.
                                    <br/><br/>
                                    En tant qu'assureur dévoué, nous comprenons l'importance de choisir une assurance emprunteur qui répond à vos besoins spécifiques. Contactez-nous aujourd'hui pour discuter de la meilleure façon de protéger votre investissement et de garantir un avenir financier serein.
                                </p>
                            </section>
                        </>
                    }
                />
            ))}
		</section>
	)
}

export default Pret