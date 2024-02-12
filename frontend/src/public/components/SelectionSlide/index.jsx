import React from 'react'
import { Link } from 'react-router-dom'
import selectionArray from '../../datas/biensArray.json'
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './m-selectionSlide.css'
import './d-selectionSlide.css'

const SelectionSlide = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  const selectedItems = selectionArray.filter((item) => item.Selection)

  return (
    <div className='selection-slide'>
      <Slider {...settings}>
        {selectedItems.map((item, id) => (
          <div key={id}>
            <div className='selection-slide__card'>
              <Link to={`/Bien/${item.Id}`}>
                <div className='selection-slide__card__text'>
                  <p className='selection-slide__card__text__ville'>{item.Opérations}</p>
                  <div className='selection-slide__card__text__dp'>
                    <p className='selection-slide__card__text__dp__designation'>{item.Designation}</p>
                    <p className='selection-slide__card__text__dp__prix'>{item.Prix} <span>{item.Unite}</span></p>
                  </div>
                </div>
                {item.Exclu ?
                  <p className='selection-slide__card__text__exclu'>Exclusivité</p>
                  : null}
                <img className='selection-slide__card__img' src={item.Cover} alt='bien immobilier' />
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default SelectionSlide
