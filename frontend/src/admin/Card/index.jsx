import { useNavigate, useParams } from 'react-router-dom'
import { faArrowLeft, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { ProjectContext } from '../../context/ProjetContext'
import { AuthContext } from '../../context/AuthContext'
import { notifyInfo } from '../../context/Notify'
import { FaWhatsapp } from 'react-icons/fa'
import { MdCall } from 'react-icons/md'
import { motion } from "framer-motion";

// styles
import './m-card.css'
import './d-card.css'

const Card = () => {
  const messagePreRempli = 'Bonjour, je souhaite en savoir plus.';


  const { projets, fetchProjets, handleIsReadProjetProjet } = useContext(ProjectContext)
  const { logout } = useContext(AuthContext)

  const { id } = useParams()
  const navigate = useNavigate()

  const [costumerCard, setCostumerCard] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!costumerCard) {
      fetchProjets();
    }
    // Recherchez le projet correspondant dans la liste des projets
    const foundProject = projets.find((project) => project.id === id)

    if (foundProject) {
      setCostumerCard(foundProject)

    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projets, id])

  useEffect(() => {
    handleIsReadProjetProjet(id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const backToWebSite = () => navigate('/dashboard/costumers')

  const logoutUser = () => {
    logout()
    navigate('/dashboard')
    notifyInfo('Vous avez été déconnecté !')
  }

  // Utilisation de wa.me pour créer le lien WhatsApp
  const lienWhatsApp = `https://wa.me/${costumerCard?.phone}?text=${encodeURIComponent(messagePreRempli)}`;

  return (
    <section className="card">
      <div className='header-card'>

        <FontAwesomeIcon
          onClick={backToWebSite}
          className="arrow-left"
          icon={faArrowLeft}
        />
        <h1 className="card__title">Carte</h1>
        <span className="logout" onClick={() => logoutUser()}>
          <FontAwesomeIcon className="logout__btn" icon={faPowerOff} />
        </span>
      </div>

      {costumerCard && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }} className="card__container">

          <div className='profil profil__border'>
            <div className='photo'>
              <span className='profil-initial'>{costumerCard?.firstName[0]}</span>
              <span className='profil-initial'>{costumerCard?.lastName[0]}</span>
            </div>
            <div className='profil-content' >
              <span className='costumers__card__info name'>{costumerCard.firstName} {costumerCard.lastName}</span>
              <span className='date'>Le {new Date(costumerCard.createdDate).toLocaleDateString("en-GB")} à {new Date(costumerCard.createdDate).getHours()}h:{new Date(costumerCard.createdDate).getMinutes()}</span>
            </div>
          </div>
          {
            costumerCard.phone && (
              <div className='phone'>
                <div className='phone-item'>
                  <MdCall className="icon call" />
                  <a className="phone-text" href={`tel:${costumerCard?.phone}`}>
                    {costumerCard?.phone}
                  </a>
                </div>
                <div className='phone-item'>
                  <FaWhatsapp className="icon whathapp" />
                  <a className="phone-text" href={lienWhatsApp} target="_blank" rel="noopener noreferrer">
                    Le contacter via WhatsApp
                  </a>
                </div>
              </div>
            )
          }

          <div className='email'>
            Email :
            <a className='email-text' href={`mailto:${costumerCard.email}`} > {costumerCard.email}</a>
          </div>
          <div className='message'>
            <p className='message-title'>Message</p>
            <div className='message'>
              {
                costumerCard.messages.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate)).map((item, index) => (
                  <div key={index} className='message-content'>
                    <span className='content' >{item.content}</span>
                    <span className='date-container'>
                      <span className='date-message'>le {new Date(item.createdDate).toLocaleDateString("en-GB")} à {new Date(item.createdDate).getHours()}h:{new Date(item.createdDate).getMinutes()}</span> {item.isRead}
                    </span>
                  </div>
                ))
              }
            </div>
          </div>
        </motion.div>
      )}
    </section>
  )
}

export default Card
