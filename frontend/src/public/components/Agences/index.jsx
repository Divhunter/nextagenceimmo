import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../../components/PagesHeaders'
import office from '../../assets/pictures/office.jpg'

// styles
import './m-agences.css'
import './d-agences.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Agences = () => {

    const redirection = 'https://www.google.com/maps/place/41+Rue+de+la+D%C3%A9couverte,+31670+Lab%C3%A8ge/@43.5486589,1.4988126,17z/data=!3m1!4b1!4m14!1m7!4m6!1m4!2m2!1d4.859918!2d45.753319!4e1!1m0!3m5!1s0x12aebe752ad9aaa9:0xd6f36883f2362eeb!8m2!3d43.548655!4d1.5013875!16s%2Fg%2F11bw3_w4y6?entry=ttu'
    
    const agencesHeader = pagesHeadersArray.find(el => el.title === "8")
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
		<section id='agences' className='agences'>
            {agencesHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={item.titleCol1}
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
                                        <p><strong>MUTUACT</strong></p>
                                        <p>standard</p>
                                        <p>06 28 18 02 03</p>
                                        <p>
                                            <a href='mailto:mutuact@mutuact.fr'>mutuact@mutuact.fr</a>
                                        </p>
                                        <p  
                                            className='agences-adress'
                                        >
                                            <a href={redirection}>41 Rue de la Découverte CS37621 - 31670 Labège</a>
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