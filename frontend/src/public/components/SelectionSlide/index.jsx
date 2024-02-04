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
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1
    }

    return (
        <div className='selection-slide'>
            <Slider {...settings}>
                {selectionArray.map((items, id) => (
                    <div key={id}>
                        <div className='selection-slide__card'>
                            <Link to={`/Bien/${items.id}`}>
                                <div className='selection-slide__card__text'>
                                    <p className='selection-slide__card__text__ville'>{items.ville}</p>
                                    <div className='selection-slide__card__text__dp'>
                                        <p className='selection-slide__card__text__dp__designation'>{items.designation}</p>
                                        <p className='selection-slide__card__text__dp__prix'>{items.prix} <span>{items.unite}</span></p>
                                    </div>
                                </div>
                                {items.exclu ? 
                                    <p className='selection-slide__card__text__exclu'>Exclusivité</p>
                                : null} 
                                <img className='selection-slide__card__img' src={items.img} alt='appartement'/>
                            </Link>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    ) 
}

export default SelectionSlide