import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin} from 'gsap/ScrollToPlugin'
import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../PagesHeaders'
import logoDocs from '../../assets/pictures/logo-docs.png'


// styles
import './m-docs.css'
import './d-docs.css'

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

const Docs = () => {

    const docsHeader = pagesHeadersArray.find(el => el.title === "5")
    const docsHeaderArray = []
    docsHeaderArray.push(docsHeader)

	return (
		<section 
            id='docs' 
            className='docs'
        >
            {docsHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='docs-header-text'>
                            <img
                                src={logoDocs} 
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
                        <div id='titleDocs'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                />
            ))}
		</section>
	)
}

export default Docs