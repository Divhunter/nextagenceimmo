import { Link } from 'react-router-dom'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import lyon from '../../assets/pictures/lyon.jpg'

import './m-headerBanner.css'
import './d-headerBanner.css'
  
const HeaderBanner = () => {
    
    return (
        <>
            <Link to='/'>
                <img
                className='headerBanner__header__logo'
                src={logoNAIS}
                width='4123px'
                height='1554px'
                fetchpriority='high'
                alt='logo de notre agence immo'
                />
            </Link>
            <img
                className='headerBanner__header__pic'
                src={lyon}
                max-width='2000px'
                max-height='630px'
                fetchpriority='high'
                alt='ville de lyon panoramique'
            />
        </>
    )
}
  
export default HeaderBanner