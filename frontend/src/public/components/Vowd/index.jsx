import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import assuPub from '../../assets/pictures/assuPub.jpg'
import logoMutuactP from '../../assets/pictures/logo-mutuact-blanc-solo.png'

// styles
import './m-vowd.css'
import './d-vowd.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Vowd = () => {

    const sectionInTop = (elem, delay, duration) => {
        gsap.fromTo(
            elem,
            {
                transform: "translateX(-150vw)",
            },
            {
                transform: "translateX(0)",
                delay: delay || .5,
                duration: duration || .5,
                scrollTrigger: {
                    trigger: elem,
                    start: "top center",
                    end: "bottom center"
                }
            }
        )
    }

    useEffect(() => {
        sectionInTop('#vowd__filtre')
    }, [])

    const onEnter = () => {
        gsap.to('#vowd__filtre', {
            transform: "translateX(0)",
        })
    }

    const onLeave = ({ currentTarget }) => {
        gsap.to(currentTarget, {
            transform: "translateX(-150vw)",
        })
    }

    return (
        <section className='vowd'>
            <img 
                className='vowd__img' 
                src={assuPub} 
                width='1500px' 
                height='998px'
                fetchpriority='high' 
                alt='famille heureuse' 
                onMouseEnter={onEnter}
            />
            <div 
                id='vowd__filtre' 
                className='vowd__filtre'
                onMouseLeave={onLeave}
            >
                <img
                    className='vowd__logo' 
                    src={logoMutuactP} 
                    alt='logo mutuact planet' 
                />
                <p className='vowd__filtre__text'>Chez mutuact, assurez-vous la tranquillité d'esprit</p>
            </div>
        </section>
    )
}

export default Vowd