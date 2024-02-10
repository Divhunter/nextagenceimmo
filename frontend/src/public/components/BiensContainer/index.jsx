import { Link } from "react-router-dom"
import biensArray from '../../datas/biensArray.json'
import logoNAIS from '../../assets/pictures/logo-notreagence-simple.png'
import './m-biensContainer.css'
import './d-biensContainer.css'

const BiensContainer = () => {

  return (
    <section className='biensContainer'>
      <Link to='/'>
        <img 
          className='nav__menu__logo-nai' 
          src={ logoNAIS } 
          max-width='4123px'
          max-height='1554px'
          fetchpriority='high' 
          alt='logo de notre agence immo'
        />
      </Link>
      <div className="biensContainer__items">
        {biensArray.map((item, id) => (
          <div 
            key={id}
          >
            <img 
              className="biensContainer__items__covers"
              src={item.Cover}
              max-width='1500px'
              max-height='1000px'
              fetchpriority='high' 
              alt='bien immobilier'
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default BiensContainer;
