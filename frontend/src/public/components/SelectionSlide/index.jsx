import React from 'react'
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Link } from 'react-router-dom' 
import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './m-selectionSlide.css'
import './d-selectionSlide.css'

// ...

const SelectionSlide = () => {
  const navigate = useNavigate()

  const [selectionArray, setSelectionArray] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get("/datas/biensArray.json")
        setSelectionArray(res.data) // Stockage de tous les éléments dans selectionArray
      } catch (error) {
        console.error("Une erreur s'est produite lors de la récupération des données.", error)
        navigate("/Error", { state: { message: "Nous ne pouvons pas récupérer les données" } })
      }
    };

    getData()
    // eslint-disable-next-line
  }, [])

  const settings = {
    dots: false,
    infinite: true,
    speed: 200,
    slidesToShow: 4,
    slidesToScroll: 1,
  }

  const selectedItems = selectionArray.filter((item) => item.Selection === true)

  return (
    <div className='selection-slide'>
      <Slider {...settings}>
        {selectedItems.map((item, Id) => (
          <div key={Id}>
            <div className='selection-slide__card'>
              <Link to={`/BiensCard/${item.Id}`}>
                <div className='selection-slide__card__text'>
                  <p className='selection-slide__card__text__op'>{item.Opérations}<br/>{item.Localisations}</p>
                  <div className='selection-slide__card__text__dp'>
                    <p className='selection-slide__card__text__dp__designation'>{item.TypesB}</p>
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
