import { Link, useNavigate } from 'react-router-dom'
import { Fragment, memo, useContext, useEffect, useState } from 'react'
import { faArrowLeft, faPowerOff, faXmark, faTrash, faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AuthContext } from '../../context/AuthContext'
import { ProjectContext } from '../../context/ProjetContext'
import { Loader } from '../../functions/loader/Loader'
import { notifyInfo } from '../../context/Notify'
import { Tooltip } from 'react-tooltip';
import { BsFilterSquare } from 'react-icons/bs'
import { BiSolidSelectMultiple } from 'react-icons/bi'
import { IoCheckmarkDoneSharp, IoCheckmarkDoneOutline } from 'react-icons/io5';
import { MdCancelPresentation } from 'react-icons/md'
import { FaAngleDown, FaAngleUp, FaDownload, FaTrashAlt } from 'react-icons/fa'
import * as XLSX from 'xlsx';
import { motion } from "framer-motion";
import Spinner from "react-activity/dist/Dots";
import "react-activity/dist/Dots.css";

// styles
import './m-costumers.css'
import './d-costumers.css'
import CheckboxCustom from '../../functions/CheckboxCustom/CheckboxCustom'
import ModalConfirmation from '../../functions/Modals/ModalConfirmation '
import Search from '../../functions/SearchComponent/Search'
import Pagination from '../Pagination/Pagination'
import Notification from '../Notification/Notification'

const Costumers = () => {

  const { isAuthenticated, logout } = useContext(AuthContext);
  const { projets, fetchProjets, handleDeleteProjet, isLoading, setIsLoading, deleteLoading } = useContext(ProjectContext)
  const [data, setData] = useState([])
  // État pour le tri par date (ascendant ou descendant)
  const [sortByDateAscending, setSortByDateAscending] = useState(false);
  // État pour le tri par nom (ascendant ou descendant)
  const [sortByNameAscending, setSortByNameAscending] = useState(false);

  const [showFilter, setShowFilter] = useState(false);

  const [confirmVisible, setConfirmVisible] = useState({})
  const [selectMultipl, setSelectMultipl] = useState(false)
  // État pour stocker les ID des projets sélectionnés
  const [selectedProjetIds, setSelectedProjetIds] = useState([]);

  //Le modal de confirmation
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const onToggleModelConfrm = () => setShowModalConfirm(!showModalConfirm)


  const navigate = useNavigate()

  const backToLogin = () => {
    navigate('/dashboard')
    notifyInfo('Vous avez été déconnecté !')
  }


  const exportDataToExcel = () => {
    const data = projets?.map((projet) => ({
      id: projet.id,
      nom: projet.firstName,
      prenom: projet.lastName,
      email: projet.email,
      telephone: projet.phone,
      messages: Array.isArray(projet.messages) ? projet.messages.map(msg => msg.content).join('; ') : '', // Convertir les messages en une chaîne séparée par des point-virgules

      date: `Le ${new Date(projet.createdDate).toLocaleDateString("en-GB")} à ${new Date(projet.createdDate).getHours()}h:${new Date(projet.createdDate).getMinutes()}`
    }))

    const ws = XLSX.utils.json_to_sheet(data); // Utilisez sortedProjets
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Clients');
    XLSX.writeFile(wb, 'clients.xlsx');
  };


  const logoutUser = () => {
    logout()
    backToLogin()
  }

  useEffect(() => {
    if (isAuthenticated && projets.lentgh === undefined) {
      fetchProjets()
      setIsLoading(false)
    }
  }, [isAuthenticated, isLoading])

  const handleIconClick = (itemId) => {
    setConfirmVisible((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId],
    }));
  }

  const totalMessagesNonLus = projets?.filter((projet) => projet.isRead === false).length;
  const totalMessagesLus = projets?.filter((projet) => projet.isRead === true).length;

  // console.log(totalMessagesLus);

  const deleteProjetById = (id) => {
    handleDeleteProjet(id)
    handleIconClick()
  }

  // Trie des donnés par date et par nom
  const sortByDateFunction = (a, b) => {
    return sortByDateAscending
      ? new Date(a.createdDate) - new Date(b.createdDate)
      : new Date(b.createdDate) - new Date(a.createdDate);
  };

  // Fonction de tri personnalisée pour trier par nom
  const sortByNameFunction = (a, b) => {
    return sortByNameAscending
      ? a.firstName.localeCompare(b.firstName)
      : b.firstName.localeCompare(a.firstName);
  };

  const handlSortByName = () => {

    // Copiez les données de projets dans l'état de données (data) au chargement initial
    const sortedDataByName = data.slice() // Copiez les données pour ne pas modifier l'original
      .sort(sortByNameFunction); // Triez  par nom
    setData(sortedDataByName);
    setSortByNameAscending(!sortByNameAscending)
  }
  const handlSortByDate = () => {

    // Copiez les données de projets dans l'état de données (data) au chargement initial
    const sortedDataByDate = data.slice() // Copiez les données pour ne pas modifier l'original
      .sort(sortByDateFunction); // Triez  par nom
    setData(sortedDataByDate);
    setSortByDateAscending(!sortByDateAscending)
  }

  const handlSortByRead = () => {
    const sortedDataByRead = projets?.filter(projet => projet.isRead === true); // Triez  par lu
    setData(sortedDataByRead);
  }

  const handlSortByNoRead = () => {
    const sortedDataByNoRead = projets?.filter(projet => projet.isRead === false); // Triez  par nonlu
    setData(sortedDataByNoRead);
  }

  // Gérer la suppression de tous les projets
  const handleDeleteAllProjets = () => {
    selectedProjetIds?.map((id) => handleDeleteProjet(id))
    setShowModalConfirm(!showModalConfirm)
    setSelectedProjetIds([])
    setSelectMultipl(!selectMultipl)
  }
  // Gérer la sélection de tous les projets
  const handleCheckedSelectMultiplChange = () => {
    if (selectedProjetIds.length === projets.length) {
      setSelectedProjetIds([]);
    } else {
      // Obtenez un tableau des ID de tous les projets
      const allProjetIds = projets.map((projet) => projet.id);
      setSelectedProjetIds(allProjetIds);
    }
  };

  // Gérer la sélection d'un projet
  const handleProjetSelectionChange = (projetId) => {
    if (selectedProjetIds?.includes(projetId)) {
      // Si le projet est déjà sélectionné, le désélectionner
      setSelectedProjetIds(selectedProjetIds.filter(id => id !== projetId));
    } else {
      // Sinon, l'ajouter à la liste des projets sélectionnés
      setSelectedProjetIds([...selectedProjetIds, projetId]);
    }
  };
  // la pagination

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [pageNumber, setPageNumber] = useState(0);
  const itemsPerPage = 15; // Nombre d'éléments par page
  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setData(projets)
  }, [projets]);

  useEffect(() => {
    window.scrollTo(0, 0)
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Nettoyer l'écouteur d'événement lorsque le composant est démonté
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Le tableau de dépendances est vide pour s'assurer que l'effet s'exécute uniquement après le montage initial.

  // Utilisez windowWidth pour conditionner la taille du composant
  const checkboxSize = windowWidth <= 551 ? '20' : '30';

  if (isLoading && (!projets || projets.length === 0)) {
    return <Loader />;
  }  

  return (
    <Fragment>
      <div className='header'>
        <h1 className='costumers__title'>Clients</h1>
        <div className='header-right'>
          <Search projets={projets} setData={setData} />

          <Notification />
          <span className='logout' onClick={logoutUser}>
            <FontAwesomeIcon
              className='logout__btn'
              icon={faPowerOff}
            />
          </span>
        </div>
      </div>
      <section className='costumers'>
        <ModalConfirmation isOpen={showModalConfirm} message={`Êtes vous sûre de vouloir supprimer ${selectedProjetIds?.length} client(s) ?`} onClose={onToggleModelConfrm} onConfirm={handleDeleteAllProjets} />
        {
          projets && projets.length > 0 &&

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className='dashboard'>
            <div className='dashboard-left'>

              <div id='clients' className='item-stat' onClick={() => setData(projets)}>
                <FontAwesomeIcon
                  className='icon-stat'
                  icon={faUsers}
                />
                <span >{projets?.length}</span>
              </div>
              <Tooltip
                className='tooltip-content'
                anchorSelect="#clients"
                content="tous les clients"
              />
              <div id='lu' className='item-stat' onClick={handlSortByRead}>
                <IoCheckmarkDoneSharp
                  className='icon-stat lu'
                />
                {projets.length > 0 ? (
                  <span className='notif-counte'>
                    {totalMessagesLus}
                  </span>
                ) : (
                  <span className='notif-counte'>0</span>
                )}
              </div>
              <Tooltip
                className='tooltip-content'
                anchorSelect="#lu"
                content="les message lus"
              />
              <div id='nonlu' className='item-stat' onClick={handlSortByNoRead}>
                <IoCheckmarkDoneOutline
                  className='icon-stat nonlu'
                />

                {projets.length > 0 ? (
                  <span className='notif-counte'>
                    {totalMessagesNonLus}
                  </span>
                ) : (
                  <span className='notif-counte'>0</span>
                )}
              </div>
              <Tooltip
                className='tooltip-content'
                anchorSelect="#nonlu"
                content="les messages non lus"
              />

            </div>
            <div className='dashboard-right'>
              {
                selectMultipl ? (
                  <Fragment>

                    <div id='cancel' onClick={() => { setSelectMultipl(!selectMultipl); setSelectedProjetIds([]) }} >
                      <MdCancelPresentation className="icon-right x-cancel" />
                      <Tooltip
                        className='tooltip-content'
                        anchorSelect="#cancel"
                        content="annuler"
                      />
                    </div>
                    {
                      selectedProjetIds.length !== 0 &&
                      <Fragment>
                        <div id='deleteAll' onClick={onToggleModelConfrm}>
                          <FaTrashAlt className="icon-right trash-delete" />
                        </div>
                        <Tooltip
                          className='tooltip-content'
                          anchorSelect="#deleteAll"
                          content="supprimer"
                        />
                      </Fragment>
                    }
                    <div id='checkedAll' >
                      <CheckboxCustom checked={projets?.length && selectedProjetIds.length === data?.length} size={checkboxSize} handleCheckedChange={handleCheckedSelectMultiplChange} />
                      <Tooltip
                        className='tooltip-content'
                        anchorSelect="#checkedAll"
                        content="coché tout"
                      />
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Fragment>
                      <div id='selectAll' onClick={() => setSelectMultipl(!selectMultipl)}>
                        <BiSolidSelectMultiple className="icon-right select-all" />
                      </div>
                      <Tooltip
                        className='tooltip-content'
                        anchorSelect="#selectAll"
                        content="selection multiple"
                      />
                    </Fragment>
                    <div className='filter'>
                      <BsFilterSquare id='filter' onClick={() => setShowFilter(!showFilter)} className="icon-right" />
                      <Tooltip
                        className='tooltip-content'
                        anchorSelect="#filter"
                        content="trier par"
                      />
                      {
                        showFilter && (
                          <div onMouseLeave={() => setShowFilter(!showFilter)} className='filter-modal'>
                            <div className='filter-content'>
                              <span onClick={handlSortByDate} className='filter-item'> Trier par date </span>
                              {
                                !sortByDateAscending ?
                                  <FaAngleUp /> : <FaAngleDown />
                              }
                            </div>
                            <div className='filter-content'>
                              <span onClick={handlSortByName} className='filter-item'>Trier par nom </span>
                              {
                                sortByNameAscending ?
                                  <FaAngleUp /> : <FaAngleDown />
                              }
                            </div>
                          </div>
                        )
                      }
                    </div>
                    <div id='dowload' onClick={exportDataToExcel}>
                      <FaDownload className="icon-right" />
                    </div>
                    <Tooltip
                      className='tooltip-content'
                      anchorSelect="#dowload"
                      content="télecharger les donneés"
                    />
                  </Fragment>
                )
              }
            </div>
          </motion.div>
        }
        <div className='all-clients'>
          {data && projets.length > 0 ? (
            data.slice(pageNumber * itemsPerPage, (pageNumber + 1) * itemsPerPage).map((item, id) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className='costumers__card' id={`id-${id}`} key={id}>
                {
                  selectMultipl ? (
                    <CheckboxCustom key={id} checked={selectedProjetIds?.includes(item.id)}
                      handleCheckedChange={() => handleProjetSelectionChange(item.id)} />
                  ) : (
                    <div className='icons-delete'>
                      {deleteLoading ? <Spinner color="red" size={15} speed={1} animating={true} className={` ${confirmVisible[item.id] ? '' : 'confirm-hidden'}`} /> :
                        <FontAwesomeIcon
                          onClick={() => deleteProjetById(item.id)}
                          className={`x-delete icon-delete ${confirmVisible[item.id] ? '' : 'confirm-hidden'}`}
                          icon={faTrash}
                        />
                      }

                      <FontAwesomeIcon
                        onClick={() => handleIconClick(item.id)}
                        className={`x-delete  ${confirmVisible[item.id] ? 'confirm-hidden' : ''}`}
                        icon={faXmark}
                      />

                      <FontAwesomeIcon
                        onClick={() => handleIconClick(item.id)}
                        className={`x-delete icon-back ${confirmVisible[item.id] ? '' : 'confirm-hidden'}`}
                        icon={faArrowLeft}
                      />
                    </div>
                  )
                }
                <Link to={`/dashboard/card/${item.id}`} className='link-card'>
                  <div className='profil'>
                    <div className='photoco'>
                      <span className='profil-initialco'>{item.firstName[0]}</span>
                      <span className='profil-initialco'>{item.lastName[0]}</span>
                    </div>
                    <div className='profil-info'>
                      <span className='costumers__card__info nameco'>
                        <span>{item.firstName}</span>
                        <span>{item.lastName}</span>
                      </span>
                      <span style={{ display: 'flex', gap: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <span className='date'>Le {new Date(item.createdDate).toLocaleDateString("en-GB")} à {new Date(item.createdDate).getHours()}h:{new Date(item.createdDate).getMinutes()}</span>
                        {
                          item.isRead ? <IoCheckmarkDoneSharp
                            className='icon-stat lu'
                          /> : <IoCheckmarkDoneOutline
                            className='icon-stat nonlu'
                          />
                        }

                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className='no-data'>Pas de Projet</div>
          )}

        </div>
      </section>
      {
        data && projets.length > 15 && <Pagination pageCount={pageCount} handlePageClick={handlePageClick} />
      }
    </Fragment>
  )
}

export default memo(Costumers)