import { useState, useEffect } from 'react'

import bannerBackground from '../../assets/pictures/banner-background.jpg'
import bannerBackgroundM from '../../assets/pictures/banner-background-m.jpg'
import kies from '../../assets/pictures/kies.png'
import kiesM from '../../assets/pictures/kies-m.png'
import home from '../../assets/pictures/home.png'
import homeM from '../../assets/pictures/home-m.png'
import businessMan from '../../assets/pictures/business-man.png'
import businessManM from '../../assets/pictures/business-man-m.png'
import logoNAI2 from '../../assets/pictures/logo-notreagence-drapeau.png'

// styles
import './m-banner.css'
import './d-banner.css'

const Banner = () => {

	const [currentState, setCurrentState] = useState(0)

	useEffect(()=> {
		const timer = setTimeout(() => {
			if (currentState === 2) {
				setCurrentState(0)
			}
			else {
				setCurrentState(currentState +1)
			}
		}, 7000)
		return () => clearTimeout(timer)
	}, [currentState] )

	const slideArray1 = [
		{	
			"img": `${kiesM}`
		},
		{	
			"img": `${homeM}`
		},
		{	
			"img": `${businessManM}`
		}
	]

	const slideArray2 = [
		{	
			"img": `${kies}`
		},
		{	
			"img": `${home}`
		},
		{	
			"img": `${businessMan}`
		}
	]

	return (
		<>
			<section 
				id='banner' 
				className='banner'
			>
				<img 
					className='banner__banner-background-m' 
					src={bannerBackgroundM} 
					width='836px'
					height='1383px'
					fetchpriority='high' 
					alt="background bleu sombre"
				/>
				<img 
					className='banner__banner-background' 
					src={bannerBackground} 
					width='3472px'
					height='2048px'
					fetchpriority='high' 
					alt="background bleu sombre"
				/>
				<div>
					{slideArray1.map((items, index) => (
						<div key={index}>
							<img className={index === currentState ? 
								'banner__picture1 banner__picture--in' : 
								'banner__picture1 banner__picture--out'
							}
							src={items.img} 
							width='836px'
							height='1383px'
							fetchpriority='high' 
							alt="photos slide" />
						</div>
						))}
					{slideArray2.map((items, index) => (
						<div key={index}>
							<img className={index === currentState ? 
								'banner__picture2 banner__picture--in' : 
								'banner__picture2 banner__picture--out'
							}
							src={items.img} 
							width='3472px'
							height='2048px'
							fetchpriority='high' 
							alt="photos slide" />
						</div>
					))}
				</div>
				<div className='banner__slogan'>
					<span className='banner__slogan__span-1'>La Clé</span>
					<br /> 
					de vos projets
					<br />
					<span className='banner__slogan__span-2'>immo</span>
				</div>
				<img 
					className='banner__logo-nai2' 
					src={logoNAI2} 
					width='1870px'
					height='1554px'
					fetchpriority='high' 
					alt='logo notre agence immo'
				/>
			</section>
		</>
	)
}
 
export default Banner