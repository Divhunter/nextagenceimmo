import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Background from '../../public/components/Background'
import Header from '../../public/components/Header'
import Banner from '../../public/components/Banner'
import Selection from '../../public/components/Selection'
import About from '../../public/components/About'
import Estimation from '../../public/components/Estimation'
import Gestion from '../../public/components/Gestion'
import Docs from '../../public/components/Docs'
import Agences from '../../public/components/Agences'
import Footer from '../../public/components/Footer'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const PublicContainer = () => {

	window.onload = () => {
		// localStorage.removeItem('token')
		window.scrollTo(0, 0)
	}

	const slideInTop = (elem, delay, duration) => {
        gsap.fromTo(
            elem,
            {
                opacity: 200,
                y: -300,
            },
            {
                opacity: 1,
                y: 0,
                delay: delay || .5,
                duration: duration || 1,
                scrollTrigger: {
                    trigger: elem,
                    start: "top center",
                    end: "bottom center"
                }
            }
        )
    }

    useEffect(() => {
        slideInTop('#titleAbout')
    }, [])

    useEffect(() => {
        slideInTop('#titleGestion')
    }, [])

    useEffect(() => {
        slideInTop('#titleEstimation')
    }, [])

    useEffect(() => {
        slideInTop('#titleAgences')
    }, [])

	useEffect(() => {
        slideInTop('#titleDocs')
    }, [])

	return (
		<>
			<main>
				<Header />
				<Banner />
                <Selection />
				<About />
                <Gestion />
				<Estimation />
                <Agences />
                <Docs />
				<Footer />
                <Background />
			</main>
		</>
	) 
}
 
export default PublicContainer