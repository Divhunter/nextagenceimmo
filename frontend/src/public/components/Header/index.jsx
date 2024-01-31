import { Link } from 'react-scroll'
import { Link as Home} from 'react-router-dom'
import { useState } from 'react'
import { faBars, faXmark, faBullhorn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoNAI from '../../assets/pictures/logo-notreagence.png'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import background1 from '../../assets/pictures/group.jpg'

// styles
import './m-header.css'
import './d-header.css'

const Header = () => {

	const [isOpen, setIsOpen] = useState(false)
	const isOpenState = () => {
        setIsOpen(!isOpen)
    }

	const scrollToTop = () => {
		window.scrollTo(0, 0)
	}
	
	return (
		<>
			<nav id='navbar' className={	
				isOpen ? 
				'navbar navbar-open':
				'navbar navbar-closed' 
			}>
				<Home to='/'>
					<img 
						className='nav__menu__logo-nai' 
						src={ isOpen ? logoNAIS : logoNAI } 
						max-width='4123px'
						max-height='1554px'
						fetchpriority='high' 
						alt='logo de notre agence immo'
					/>
				</Home>

				<Link to='transaction'>
					<div className='nav__menu__button nav__menu__transaction'>Transaction</div>
				</Link>

				<Link to='location'>
					<div className='nav__menu__button nav__menu__location'>Location</div>
				</Link>

				<div className='nav__menu__alert'>
					<FontAwesomeIcon
						icon={faBullhorn}
					/>
				</div>

				<FontAwesomeIcon 
					onClick={(e) => { isOpenState(e); scrollToTop(e) }} 
					className={
						isOpen ?
						'navbar__button-bars closed':
						'navbar__button-bars open'} 
					icon={faBars} 
				/>
				<FontAwesomeIcon 
					onClick={(e) => { isOpenState(e); scrollToTop(e) }} 
					className={
						isOpen ?
						'navbar__button-x open':
						'navbar__button-x closed'} 
					icon={faXmark} 
				/>

				<img 
					className={ isOpen ? 'group open' : 'group closed'} 
					src={background1} 
					width='1334px'
					height='2000px'
					fetchpriority='high' 
					alt='group' 
				/>

				<menu className={
						isOpen ?
						'navbar__menu navbar__menu-open':
						'navbar__menu navbar__menu-closed'
					}
				>
					<Link to='/'>
						<p onClick={isOpenState} className='navbar__menu__text'>Accueil</p>
					</Link>
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
					<Link to='contact'>
						<p onClick={isOpenState} className='navbar__menu__text'>Contact</p>
					</Link>
				</menu> 
			</nav>
		</>
	)
}
 
export default Header