import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../../components/PagesHeaders'
import office from '../../assets/pictures/office.jpg'
import logoEstimation from '../../assets/pictures/logo-agences.png'

// styles
import './m-agences.css'
import './d-agences.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Agences = () => {

    const redirection = 'https://www.google.fr/maps/place/NOTRE+AGENCE+IMMO/@45.7341047,4.8512631,17z/data=!3m1!4b1!4m6!3m5!1s0x47f4ea1a7d100001:0xed0c061d8a46da0c!8m2!3d45.734101!4d4.853838!16s%2Fg%2F11gd215m_z?entry=ttu'
    
    const agencesHeader = pagesHeadersArray.find(el => el.title === "4")
    const agencesHeaderArray = []
    agencesHeaderArray.push(agencesHeader)

    const officeInTop = (elem, delay, duration) => {
        gsap.fromTo(
            elem,
            {
                opacity: 0,
                x: 200,
            },
            {
                opacity: 1,
                x: 0,
                delay: delay || .5,
                duration: duration || 1.5,
                scrollTrigger: {
                    trigger: elem,
                    start: "top center",
                    end: "bottom center"
                }
            }
        )
    }

    useEffect(() => {
        officeInTop('#containerOffice__bloc__office')
    }, [])

	return (
		<section id='agences' className='agences section--padding'>
            {agencesHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='agences-header-text'>
                            <img
                                src={logoEstimation} 
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-estimation'
                            />
                            <br/>
                            {item.titleCol1}
                        </div>
                    }
                    subTitle1={
                        <div id='titleAgences'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                    text1={
                        <div 
                            id='containerOfficeBloc' 
                            className='containerOffice__bloc'
                        >   
                            <br/><br/>
                            <div id='containerOffice__bloc__office'>
                                <img 
                                    className='containerOffice__bloc__office__pic' 
                                    src={office}
                                    width='1500px'
                                    height='844px'
                                    fetchpriority='high' 
                                    alt='bureau'
                                />
                                <div className='containerOffice__bloc__office__text'>  
                                    <div 
                                        className='containerOffice__bloc__office__text__content'
                                        >
                                        <p><strong>Notreagenceimmo</strong></p>
                                        <p>standard</p>
                                        <p>04 72 76 33 44</p>
                                        <p>
                                            <a href='mailto:accueil@notreagenceimmo.com'>accueil@notreagenceimmo.com</a>
                                        </p>
                                        <p  
                                            className='agences-adress'
                                        >
                                            <a href={redirection}>165 Rte de Vienne, 69008 Lyon</a>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    } 
                />
            ))}
		</section>
	)
}

export default Agences