import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../../components/PagesHeaders'
import AgencesSlide from '../../components/AgencesSlide'
import office from '../../assets/pictures/office.jpg'
import logoEstimation from '../../assets/pictures/logo-agences.png'

// styles
import './m-agences.css'
import './d-agences.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Agences = () => {

    const redirection = 'https://www.google.com/maps/place/Vowd.Fr/@45.7491953,4.8617687,17z/data=!3m1!4b1!4m6!3m5!1s0x47f4ebe1b7fe5f39:0xec44f2a4ee0eef69!8m2!3d45.7491953!4d4.8617687!16s%2Fg%2F11l59mq2zh?entry=ttu'
    
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
                                        <p><strong>NEXT AGENCE IMMO</strong></p>
                                        <p>standard</p>
                                        <p>04 27 11 59 13 44</p>
                                        <p>
                                            <a href='mailto:vowd-sv@outlook.com'>accueil@nextagenceimmo.com</a>
                                        </p>
                                        <p  
                                            className='agences-adress'
                                        >
                                            <a href={redirection}>7 CRS Albert Thomas - 69003 Lyon</a>
                                        </p>
                                        <div className='sep'></div>
                                    </div>
                                    <p><strong>ORGANIGRAMME</strong></p>
                                    <AgencesSlide />
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