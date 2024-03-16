import { Link as Contact } from "react-router-dom"
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../PagesHeaders'
import logoEstimation from '../../assets/pictures/logo-estimation.png'

// styles
import './m-estimation.css'
import './d-estimation.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Estimation = () => {

    const getBiensArray = localStorage.getItem('biensArray')
    const biensArray = JSON.parse(getBiensArray) || []

    const estimationHeader = pagesHeadersArray.find(el => el.title === "3")
    const estimationHeaderArray = []
    estimationHeaderArray.push(estimationHeader)

    const clientNoRef = biensArray.filter((item) => item.NoRef)

	return (
		<section 
            id='estimation' 
            className='estimation section--padding'
        >
            {estimationHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='estimation-header-text'>
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
                        <div id='titleEstimation'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={
                        <div className='estimation-func'>
                            <p>Formulaire de pré-estimation</p>
                        </div>
                    }
                    button={clientNoRef.map((item, Id) => (
                        <Contact key={Id} to={`/Contact/${item.Id}`}>
                            <p className='button button-estimation'>Contactez-nous</p>
                        </Contact>))
                    }
                />
            ))}
		</section>
	)
}

export default Estimation