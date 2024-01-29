import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import Background from '../../public/components/Background'
import Header from '../../public/components/Header'
import Banner from '../../public/components/Banner'
import About from '../../public/components/About'
import Estimation from '../../public/components/Estimation'
import Gestion from '../../public/components/Gestion'
import Sante from '../../public/components/Sante'
import Vowd from '../../public/components/Vowd'
import Prof from '../../public/components/Prof'
import Pret from '../../public/components/Pret'
import Auto from '../../public/components/Auto'
import Agences from '../../public/components/Agences'
import Contact from '../../public/components/Contact'
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
                y: -200,
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
        slideInTop('#titleestimation')
    }, [])

    useEffect(() => {
        slideInTop('#titleGestion')
    }, [])

	useEffect(() => {
        slideInTop('#titleSante')
    }, [])

	useEffect(() => {
        slideInTop('#titlePro')
    }, [])

	useEffect(() => {
        slideInTop('#titlePret')
    }, [])

    useEffect(() => {
        slideInTop('#titleAuto')
    }, [])

    useEffect(() => {
        slideInTop('#titleAgences')
    }, [])

    useEffect(() => {
        slideInTop('#titleContact')
    }, [])

	return (
		<>
			<main>
				<Header />
				<Banner />
				<About />
                <Gestion />
				<Estimation />
				<Sante />
                <Vowd />
                <Prof />
                <Pret />
                <Auto />
                <Agences />
				<Contact />
				<Footer />
                <Background />
			</main>
		</>
	) 
}
 
export default PublicContainer