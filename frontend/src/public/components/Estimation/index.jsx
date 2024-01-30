import { Link } from 'react-scroll'
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

    const estimationHeader = pagesHeadersArray.find(el => el.title === "3")
    const estimationHeaderArray = []
    estimationHeaderArray.push(estimationHeader)

	return (
		<section 
            id='estimation' 
            className='estimation'
        >
            {estimationHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='estimation-header-text'>
                            {item.titleCol1}
                            <br/>
                            <img
                                src={logoEstimation} 
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-estimation'
                            />
                        </div>
                    }
                    subTitle1={
                        <div>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={
                        <div className='estimation-func'>
                            <p>Formulaire de pré-estimation</p>
                        </div>
                    }
                    button={
                        <Link to='contact'>
                            <p className='button'>Contactez un conseil</p>
                        </Link>
                    }
                />
            ))}
		</section>
	)
}

export default Estimation