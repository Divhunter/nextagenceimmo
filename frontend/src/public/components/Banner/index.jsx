import { useState, useEffect } from 'react'

import bannerBackground from '../../assets/pictures/banner-background.jpg'
import kies from '../../assets/pictures/kies.png'
import home from '../../assets/pictures/home.png'
import businessWoman from '../../assets/pictures/business-woman.png'
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

	/*const slideArray1 = [
		{	
			"img": `${img01}`
		},
		{	
			"img": `${img11}`
		},
		{
			"img": `${img21}`
		},
		{
			"img": `${img31}`
		},
		{
			"img": `${img41}`,
		}
	]*/

	const slideArray2 = [
		{	
			"img": `${kies}`
		},
		{	
			"img": `${home}`
		},
		{	
			"img": `${businessWoman}`
		}
	]

	return (
		<>
			<section 
				id='banner' 
				className='banner'
			>
				<img 
					className='banner__banner-background' 
					src={bannerBackground} 
					width='3472px'
					height='2048px'
					fetchpriority='high' 
					alt="background bleu sombre"
				/>
				<div>
					{/*{slideArray1.map((items, index) => (
						<div key={index}>
							<img className={index === currentState ? 
								'banner__picture1 banner__picture--in' : 
								'banner__picture1 banner__picture--out'
							}
							src={items.img} 
							width='720px'
							height='1342px'
							fetchpriority='high' 
							alt="photos paisible" />
						</div>
						))*/}
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
					{/*<br /> 
					à portée de
					<br />
					vos mains*/}
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