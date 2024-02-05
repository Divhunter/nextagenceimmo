import React, { useState } from 'react'
// import Autosuggest from 'react-autosuggest'

import './m-formulaireRecherche.css'
import './d-formulaireRecherche.css'


const FormulaireRecherche = () => {
  const [operations, setOperations] = useState([])
  const [selectAllOperations, setSelectAllOperations] = useState(false)

  const [typesBiens, setTypesBiens] = useState([])
  const [selectAllTypesBiens, setSelectAllTypesBiens] = useState(false)

  const [nombrePieces, setNombrePieces] = useState([])
  const [selectAllNombrePieces, setSelectAllNombrePieces] = useState(false)

  const [localisations, setLocalisations] = useState([])
  const [selectAllLocalisations, setSelectAllLocalisations] = useState(false)

  const [prix, setPrix] = useState([])
  const [selectAllPrix, setSelectAllPrix] = useState(false)

  const [openWindow, setOpenWindow] = useState(null)

  const operationsOptions = [
    'Vente',
    'Location',
    'Location saisonnière',
    'Programme',
    'Viager',
    'Enchère',
  ]

  const typesBiensOptions = [
    'Appartement',
    'Maison',
    'Terrain',
    'Commerce',
    'Garage / Parking',
    'Immeuble',
    'Bureau',
    'Bateau',
    'Locaux / Entrepôts',
    'Cave / Box',
  ]

  const nombrePiecesOptions = [
    '1 pièce',
    '2 pièces',
    '3 pièces',
    '4 pièces',
    '5 pièces',
    '6+ pièces',
  ]

  const localisationsOptions = [
    'Brignais',
    'Bron',
    'Irigny',
    'La Mulatière',
    'Lyon 2ième',
    'Lyon 7ième',
    'Lyon 8ième',
    'Oullin',
    'Saint-Genis-Laval',
    'Vénissieux',
  ]

  const prixOptions = [
    '0-500',
    '500-1000',
    '1000-1500',
    '1500-2000',
    '2000-3000',
    '3000-4000',
    '4000-5000',
    '5000+',
  ]

  const handleToggleOperation = (operation) => {
    setOpenWindow('operations')
    if (operation === 'Tout sélectionner') {
      setSelectAllOperations(!selectAllOperations)
      setOperations(selectAllOperations ? [] : operationsOptions)
    } else {
      const updatedOperations = operations.includes(operation)
        ? operations.filter((selectedOperation) => selectedOperation !== operation)
        : [...operations, operation]

      setOperations(updatedOperations)
      setSelectAllOperations(updatedOperations.length === operationsOptions.length)
    }
  }

  const handleToggleTypeBien = (type) => {
    setOpenWindow('typesBiens')
    if (type === 'Tout sélectionner') {
      setSelectAllTypesBiens(!selectAllTypesBiens)
      setTypesBiens(selectAllTypesBiens ? [] : typesBiensOptions)
    } else {
      const updatedTypesBiens = typesBiens.includes(type)
        ? typesBiens.filter((selectedType) => selectedType !== type)
        : [...typesBiens, type]

      setTypesBiens(updatedTypesBiens)
      setSelectAllTypesBiens(updatedTypesBiens.length === typesBiensOptions.length)
    }
  }

  const handleToggleNombrePieces = (nombrePiece) => {
    setOpenWindow('nombrePieces')
    if (nombrePiece === 'Tout sélectionner') {
      setSelectAllNombrePieces(!selectAllNombrePieces)
      setNombrePieces(selectAllNombrePieces ? [] : nombrePiecesOptions)
    } else {
      const updatedNombrePieces = nombrePieces.includes(nombrePiece)
        ? nombrePieces.filter((selectedNombrePiece) => selectedNombrePiece !== nombrePiece)
        : [...nombrePieces, nombrePiece]

      setNombrePieces(updatedNombrePieces)
      setSelectAllNombrePieces(updatedNombrePieces.length === nombrePiecesOptions.length)
    }
  }

  const handleToggleLocalisations = (localisation) => {
    setOpenWindow('localisations')
    if (localisation === 'Tout sélectionner') {
      setSelectAllLocalisations(!selectAllLocalisations)
      setLocalisations(selectAllLocalisations ? [] : localisationsOptions)
    } else {
      const updatedLocalisations = localisations.includes(localisation)
        ? localisations.filter((selectedLocalisation) => selectedLocalisation !== localisation)
        : [...localisations, localisation]

      setLocalisations(updatedLocalisations)
      setSelectAllLocalisations(updatedLocalisations.length === localisationsOptions.length)
    }
  }

  const handleTogglePrix = (prixOption) => {
    setOpenWindow('prix')
    if (prixOption === 'Tout sélectionner') {
      setSelectAllPrix(!selectAllPrix)
      setPrix(selectAllPrix ? [] : prixOptions)
    } else {
      const updatedPrix = prix.includes(prixOption)
        ? prix.filter((selectedPrix) => selectedPrix !== prixOption)
        : [...prix, prixOption]

      setPrix(updatedPrix)
      setSelectAllPrix(updatedPrix.length === prixOptions.length)
    }
  }

  return (
    <div>
      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setOpenWindow(openWindow === 'operations' ? null : 'operations')}
        >
          Types d'opération
        </div>
        {openWindow === 'operations' && (
          <div className="dropdown-options">
            <label>
              <input
                type="checkbox"
                id="selectAllOperations"
                checked={selectAllOperations}
                onChange={() => handleToggleOperation('Tout sélectionner')}
              />
              Tout sélectionner
            </label>
            {operationsOptions.map((operation) => (
              <label key={operation}>
                <input
                  type="checkbox"
                  id={operation}
                  value={operation}
                  checked={operations.includes(operation)}
                  onChange={() => handleToggleOperation(operation)}
                />
                {operation}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setOpenWindow(openWindow === 'typesBiens' ? null : 'typesBiens')}
        >
          Types de bien
        </div>
        {openWindow === 'typesBiens' && (
          <div className="dropdown-options">
            <label>
              <input
                type="checkbox"
                id="selectAllTypesBiens"
                checked={selectAllTypesBiens}
                onChange={() => handleToggleTypeBien('Tout sélectionner')}
              />
              Tout sélectionner
            </label>
            {typesBiensOptions.map((type) => (
              <label key={type}>
                <input
                  type="checkbox"
                  id={type}
                  value={type}
                  checked={typesBiens.includes(type)}
                  onChange={() => handleToggleTypeBien(type)}
                />
                {type}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setOpenWindow(openWindow === 'nombrePieces' ? null : 'nombrePieces')}
        >
          Nombre de pièce
        </div>
        {openWindow === 'nombrePieces' && (
          <div className="dropdown-options">
            <label>
              <input
                type="checkbox"
                id="selectAllNombrePieces"
                checked={selectAllNombrePieces}
                onChange={() => handleToggleNombrePieces('Tout sélectionner')}
              />
              Tout sélectionner
            </label>
            {nombrePiecesOptions.map((nombrePiece) => (
              <label key={nombrePiece}>
                <input
                  type="checkbox"
                  id={nombrePiece}
                  value={nombrePiece}
                  checked={nombrePieces.includes(nombrePiece)}
                  onChange={() => handleToggleNombrePieces(nombrePiece)}
                />
                {nombrePiece}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setOpenWindow(openWindow === 'localisations' ? null : 'localisations')}
        >
          Localisation
        </div>
        {openWindow === 'localisations' && (
          <div className="dropdown-options">
            <label>
              <input
                type="checkbox"
                id="selectAllLocalisations"
                checked={selectAllLocalisations}
                onChange={() => handleToggleLocalisations('Tout sélectionner')}
              />
              Tout sélectionner
            </label>
            {localisationsOptions.map((localisation) => (
              <label key={localisation}>
                <input
                  type="checkbox"
                  id={localisation}
                  value={localisation}
                  checked={localisations.includes(localisation)}
                  onChange={() => handleToggleLocalisations(localisation)}
                />
                {localisation}
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="dropdown">
        <div
          className="dropdown-header"
          onClick={() => setOpenWindow(openWindow === 'prix' ? null : 'prix')}
        >
          Fourchette de prix
        </div>
        {openWindow === 'prix' && (
          <div className="dropdown-options">
            <label>
              <input
                type="checkbox"
                id="selectAllPrix"
                checked={selectAllPrix}
                onChange={() => handleTogglePrix('Tout sélectionner')}
              />
              Tout sélectionner
            </label>
            {prixOptions.map((prixOption) => (
              <label key={prixOption}>
                <input
                  type="checkbox"
                  id={prixOption}
                  value={prixOption}
                  checked={prix.includes(prixOption)}
                  onChange={() => handleTogglePrix(prixOption)}
                />
                {prixOption}
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default FormulaireRecherche