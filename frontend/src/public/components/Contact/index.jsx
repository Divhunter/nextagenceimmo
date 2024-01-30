import pagesHeadersArray from '../../datas/pagesHeadersArray.json'
import PagesHeaders from '../../components/PagesHeaders'
import woman from '../../assets/pictures/woman.png'
import ContactForm from '../../../functions/ContactForm'
import logoDrapeau from '../../assets/pictures/logo-drapeau.png'

// styles
import './m-contact.css'
import './d-contact.css'

const Contact = () => {
    
    const contactHeader = pagesHeadersArray.find(el => el.title === "6")
    const contactHeaderArray = []
    contactHeaderArray.push(contactHeader)

	return (
		<section id='contact' className='contact'>
            {contactHeaderArray.map((item, index) => (
                <PagesHeaders 
                    key={index}
                    titleCol1={
                        <div id='contact-header-text'>
                            <img
                                src={logoDrapeau}
                                className='header-logo'
                                width='615px'
                                height='747px'
                                loading='lazy'
                                alt='logo-drapeau'
                            />
                            <br/>
                            {item.titleCol1}
                        </div>
                    }
                    subTitle1={
                        <div id='titleContact'>
                            {item.subTitle1}
                        </div>
                    }
                    subTitle2={item.subTitle2}
                    text1={
                        <>
                            <br/><br/>
                            <div className='containerContact'>
                                <div className='containerContact__text' >
                                    <p className='containerContact__text__header'>
                                        Devis gratuit sous 48h
                                    </p>
                                    <div className='containerContact__text__form'>
                                        <ContactForm />
                                    </div>
                                </div>
                                <div className='containerContact__bloc'>
                                    <img 
                                        className='containerContact__bloc__woman' 
                                        src={woman}
                                        width='1130px'
                                        height='2078px'
                                        fetchpriority='high' 
                                        alt='serrage de main'
                                    />
                                </div>
                                <p className='containerContact__bloc__pub'>
                                    Notre objectif
                                    <br/>
                                    est de vous offrir la tranquillité d'esprit
                                </p>
                            </div>
                        </>
                    } 
                />
            ))}
		</section>
	)
}

export default Contact