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
                        <div id='docs-header-text' className='docs section--padding'>
                            <img
                                src={logoDocs} 
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-documents'
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
                    subTitle2={
                        <div className='doc-func'>
                            <p>Fonctionnalité uploader</p>
                        </div>
                    }
                />
            ))}
		</section>
	)
}

export default Docs