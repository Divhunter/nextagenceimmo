import { Link } from 'react-router-dom'
import {fab, faFacebook, faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import logoNAI from '../../assets/pictures/logo-notreagence.png'
import logoMalakoff from '../../assets/brands/logo-malakoff.png'
import logoCegema from '../../assets/brands/logo-cegema.png'
import logoAlpis from '../../assets/brands/logo-alpis.png'
import logoHenner from '../../assets/brands/logo-henner.png'
import logoSwiss from '../../assets/brands/logo-swiss.png'
import logoApivia from '../../assets/brands/logo-apivia.png'
import logoAirbag from '../../assets/brands/logo-airbag.png'
import logoZenioo from '../../assets/brands/logo-zenioo.png'
import logoEntoria from '../../assets/brands/logo-entoria.png'
import logoTetris from '../../assets/brands/logo-tetris.png'
import logoMetlife from '../../assets/brands/logo-metlife.png'

// styles
import './m-footer.css'
import './d-footer.css'

const Footer = () => {
  return (
    <section className='footer'>
      <h1>Suivez-nous</h1>
      <div className='footer__link'>
        <Link to=''>
          <FontAwesomeIcon className='footer__link__icon icon-fb' icon={(fab, faFacebook)} />
        </Link>
        <Link to='/'>
          <FontAwesomeIcon className='footer__link__icon icon-tw' icon={(fab, faTwitter)} />
        </Link>
        <Link to='/'>
          <FontAwesomeIcon className='footer__link__icon icon-lk' icon={(fab, faLinkedin)} />
        </Link>
        <Link to='/'>
          <FontAwesomeIcon className='footer__link__icon icon-gh' icon={(fab, faInstagram)} />
        </Link>
      </div>
      <Link to='https://notreagenceimmo.vercel.app/'>
        <img 
						className='footer__logo-Notreagenceimmo' 
						src={ logoNAI } 
						max-width='4123px'
						max-height='1554px'
						fetchpriority='high' 
						alt='logo de notre agence immo'
				/>
      </Link>
      <p className='footer__logo-info'>
        NOTRE AGENCE IMMO
        <br/>
        Numéro SIRET : 40223003100021
        <br/>
        Tél : 04 72 76 33 44
        <br/>
        https://www.Notreagenceimmo.com
        <br/>
        <span>
          <a 
            href='mailto:accueil@notreagenceimmo.com'
            className='mail-link'
          >
              accueil@notreagenceimmo.com
          </a>
        </span>
        <br/>
        165 Rte de Vienne, 69008 Lyon
      </p><div className='footer__partenaires'>
        <img 
          className='footer__partenaires__logo'
          src={logoMalakoff} 
          width='1831px'
          height='596px'
          fetchpriority='high'  
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoAlpis} 
          width='654px'
          height='596px'
          loading='lazy'  
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoCegema} 
          width='850px'
          height='596px'
          loading='lazy'  
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoSwiss} 
          width='856px'
          height='596px'
          loading='lazy'  
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoHenner} 
          width='596px'
          height='596px'
          loading='lazy'  
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoApivia} 
          width='846px'
          height='598px'
          loading='lazy'  
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoZenioo} 
          width='2136px'
          height='596px'
          fetchpriority='high'    
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoAirbag} 
          width='1222px'
          height='598px'
          fetchpriority='high'   
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoEntoria} 
          width='1011px'
          height='596px'
          fetchpriority='high'   
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoTetris} 
          width='1234px'
          height='598px'
          fetchpriority='high' 
          alt='logo assureur'
        />
        <img 
          className='footer__partenaires__logo'
          src={logoMetlife} 
          width='470px'
          height='598px'
          loading='lazy'  
          alt='logo assureur'
        />
      </div>
      <div className='footer__copyright'>
          <p>
              © Notreagenceimmo - Tous droits réservés - <Link className='footer__copyright__link' to='/cgu'>Mentions légales</Link> - 2023 - conception web vowd.fr
          </p>
      </div>	
    </section>
  )
}

export default Footer