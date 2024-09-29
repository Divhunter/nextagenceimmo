import { Link } from 'react-scroll'
import { Link as Home, Link as Contact } from "react-router-dom"
import { useState, useEffect } from 'react'
import { faBars, faXmark, faBullhorn, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoNAI from '../../assets/pictures/logo-notreagence-full.png'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import background1 from '../../assets/pictures/group-m.jpg'
import background2 from '../../assets/pictures/group.jpg'

// styles
import './m-header.css'
import './d-header.css'

const Header = () => {

	const getBiensArray = localStorage.getItem('biensArray')
    const biensArray = JSON.parse(getBiensArray) || []

	const [mobileSearch, setMobileSearch] = useState(window.innerWidth <= 991)

	useEffect(() => {
		document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
		const handleResize = () => {
			setMobileSearch(window.innerWidth <= 991)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const [isOpen, setIsOpen] = useState(false)
	const isOpenState = () => {
        setIsOpen(!isOpen)
    }

	const [isActu, setIsActu] = useState(false)
	const isActuState = () => {
        setIsActu(!isActu)
		document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
    }

	const scrollToTop = () => {
		document.documentElement.scrollTo({ top: 0, behavior: 'smooth' })
	}
	
	const clientNoRef = biensArray.filter((item) => item.NoRef)

	return (
		<>
			<nav id='navbar' className={	
				isOpen ? 
				'navbar navbar-open':
				'navbar navbar-closed' 
			}>
				<Home to='https://nextagenceimmo.vercel.app/'>
					<img 
						className='nav__menu__logo-nai' 
						src={ isOpen ? logoNAIS : logoNAI } 
						max-width='4123px'
						max-height='1554px'
						fetchpriority='high' 
						alt='logo de notre agence immo'
					/>
				</Home>

				<div className='container-button'>
					<Link to='selection__container'>
						<button onClick={() => setIsOpen(false)} 
							className='nav__menu__button nav__menu__filtre'
						> 
							<FontAwesomeIcon
								icon={faSearch}
							/>{!mobileSearch && <p>&nbsp;Filtrez votre recherche</p>}
							
						</button>
					</Link>
					<div
						className={
							isActu ?
							'nav__menu__alert nav__menu__alert--gray' : 'nav__menu__alert nav__menu__alert--transparent'
						}
						onClick={(e) => { setIsOpen(false); isActuState(e) }} 
					>
						<FontAwesomeIcon
							icon={faBullhorn}
						/>
					</div>
				</div>

				<FontAwesomeIcon 
					onClick={(e) => { isOpenState(e); scrollToTop(e) }} 
					className={
						isOpen ?
						'navbar__button-bars hidden':
						'navbar__button-bars visible'} 
					icon={faBars} 
				/>
				<FontAwesomeIcon 
					onClick={(e) => { isOpenState(e); scrollToTop(e) }} 
					className={
						isOpen ?
						'navbar__button-x visible':
						'navbar__button-x hidden'} 
					icon={faXmark} 
				/>

				<div className='back1'>
					<img 
						className={ isOpen ? 'group visible' : 'group hidden'} 
						src={background1} 
						width='720px'
						height='1672px'
						fetchpriority='high' 
						alt='group' 
					/>
				</div>
				
				<div className='back2'>
					<img 
						className={ isOpen ? 'group visible' : 'group hidden'} 
						src={background2} 
						width='1334px'
						height='2000px'
						fetchpriority='high' 
						alt='group' 
					/>
				</div>

				<menu className={
						isOpen ?
						'navbar__menu navbar__menu-open':
						'navbar__menu navbar__menu-closed'
					}
				>
					<Link to='about'>
						<p onClick={isOpenState} className='navbar__menu__text'>À propos</p>
					</Link>
					<Link to='gestion'>
						<p onClick={isOpenState} className='navbar__menu__text'>Gestion</p>
					</Link>
					<Link to='estimation'>
						<p onClick={isOpenState} className='navbar__menu__text'>Estimation</p>
					</Link>
					<Link to='agences'>
						<p onClick={isOpenState} className='navbar__menu__text'>Notre agence</p>
					</Link>
					<Link to='docs'>
						<p onClick={isOpenState} className='navbar__menu__text'>Documments utiles</p>
					</Link>
					{clientNoRef.map((item, Id) => (
                    	<Contact key={Id} to={`/Contact/${item.Id}`}>
							<p onClick={isOpenState} className='navbar__menu__text'>Contact</p>
						</Contact>))
                    }
				</menu> 
			</nav>
			<div 
				id='actu'
				className={
				isActu ?
				'visible':'hidden'
				}
			>
				<div className='actu-container'>
					<div 
						onClick={isActuState}
						className='actu-container__closed' 
					>
						<FontAwesomeIcon icon={faXmark} />
					</div>
					<header>
						<h1>Créez votre alerte personnalisée et ne ratez plus aucun bien !</h1>
					</header>
					<div className='actu-form'>
						<p>Formulaire Alert e-mail</p>
					</div>
					<br/>
				</div>
			</div>
		</>
	)
}
 
export default Header