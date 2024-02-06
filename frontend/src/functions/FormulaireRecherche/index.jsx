import React, { useState } from 'react';
import selectionArray from '../../public/datas/biensArray.json';
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './m-formulaireRecherche.css';
import './d-formulaireRecherche.css';

const FormulaireRecherche = () => {
  const [operations, setOperations] = useState([]);
  const [selectAllOperations, setSelectAllOperations] = useState(false);

  const [typesBiens, setTypesBiens] = useState([]);
  const [selectAllTypesBiens, setSelectAllTypesBiens] = useState(false);

  const [nombrePieces, setNombrePieces] = useState([]);
  const [selectAllNombrePieces, setSelectAllNombrePieces] = useState(false);

  const [localisations, setLocalisations] = useState([]);
  const [selectAllLocalisations, setSelectAllLocalisations] = useState(false);

  const [prix, setPrix] = useState([]);
  const [selectAllPrix, setSelectAllPrix] = useState(false);

  const [openWindow, setOpenWindow] = useState(null);

  const operationsOptions = [
    'Vente',
    'Location',
    'Location saisonnière',
    'Programme',
    'Viager',
    'Enchère',
  ];

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
  ];

  const nombrePiecesOptions = [
    '1 pièce',
    '2 pièces',
    '3 pièces',
    '4 pièces',
    '5 pièces',
    '6+ pièces',
  ];

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
  ];

  const prixOptions = [
    '0-500',
    '500-1000',
    '1000-1500',
    '1500-2000',
    '2000-3000',
    '3000-4000',
    '4000-5000',
    '5000+',
  ];

 

  const handleToggleOperation = (operation) => {
    setOpenWindow('operations');
    if (operation === 'Tout sélectionner') {
      setSelectAllOperations(!selectAllOperations);
      setOperations(selectAllOperations ? [] : operationsOptions);
    } else {
      const updatedOperations = operations.includes(operation)
        ? operations.filter((selectedOperation) => selectedOperation !== operation)
        : [...operations, operation];

      setOperations(updatedOperations);
      setSelectAllOperations(updatedOperations.length === operationsOptions.length);
    }
  };

  const handleToggleTypeBien = (type) => {
    setOpenWindow('typesBiens');
    if (type === 'Tout sélectionner') {
      setSelectAllTypesBiens(!selectAllTypesBiens);
      setTypesBiens(selectAllTypesBiens ? [] : typesBiensOptions);
    } else {
      const updatedTypesBiens = typesBiens.includes(type)
        ? typesBiens.filter((selectedType) => selectedType !== type)
        : [...typesBiens, type];

      setTypesBiens(updatedTypesBiens);
      setSelectAllTypesBiens(updatedTypesBiens.length === typesBiensOptions.length);
    }
  };

  const handleToggleNombrePieces = (nombrePiece) => {
    setOpenWindow('nombrePieces');
    if (nombrePiece === 'Tout sélectionner') {
      setSelectAllNombrePieces(!selectAllNombrePieces);
      setNombrePieces(selectAllNombrePieces ? [] : nombrePiecesOptions);
    } else {
      const updatedNombrePieces = nombrePieces.includes(nombrePiece)
        ? nombrePieces.filter((selectedNombrePiece) => selectedNombrePiece !== nombrePiece)
        : [...nombrePieces, nombrePiece];

      setNombrePieces(updatedNombrePieces);
      setSelectAllNombrePieces(updatedNombrePieces.length === nombrePiecesOptions.length);
    }
  };

  const handleToggleLocalisations = (localisation) => {
    setOpenWindow('localisations');
    if (localisation === 'Tout sélectionner') {
      setSelectAllLocalisations(!selectAllLocalisations);
      setLocalisations(selectAllLocalisations ? [] : localisationsOptions);
    } else {
      const updatedLocalisations = localisations.includes(localisation)
        ? localisations.filter((selectedLocalisation) => selectedLocalisation !== localisation)
        : [...localisations, localisation];

      setLocalisations(updatedLocalisations);
      setSelectAllLocalisations(updatedLocalisations.length === localisationsOptions.length);
    }
  };

  const handleTogglePrix = (prixOption) => {
    setOpenWindow('prix');
    if (prixOption === 'Tout sélectionner') {
      setSelectAllPrix(!selectAllPrix);
      setPrix(selectAllPrix ? [] : prixOptions);
    } else {
      const updatedPrix = prix.includes(prixOption)
        ? prix.filter((selectedPrix) => selectedPrix !== prixOption)
        : [...prix, prixOption];

      setPrix(updatedPrix);
      setSelectAllPrix(updatedPrix.length === prixOptions.length);
    }
  };

  const calculateMatchingScore = (obj) => {
    const prixValue = obj.prix;
  
    const prixScore = (() => {
      if (prixValue <= 500) return 5;
      if (prixValue <= 1000) return 4;
      if (prixValue <= 1500) return 3;
      if (prixValue <= 2000) return 2;
      if (prixValue <= 3000) return 1;
      return 0;
    })();

    console.log(prixScore)
  
    const matchingCriteria = [
      { selected: operations.includes(obj.Opérations), weight: 1 },
      { selected: typesBiens.includes(obj.TypesB), weight: 1 },
      { selected: nombrePieces.includes(obj.NombreP), weight: 1 },
      { selected: localisations.includes(obj.Localisations), weight: 1 },
      { selected: prixScore > 0, weight: prixScore },
    ];

    console.log(matchingCriteria)
  
    const totalScore = matchingCriteria.reduce((accumulator, criterion) => {
      const criterionScore = criterion.selected ? criterion.weight : 0;
      console.log(`Criterion: ${criterion.selected}, Score: ${criterionScore}`);
      return accumulator + criterionScore;
    }, 0);

    console.log(totalScore)
  
    console.log(`Total Score: ${totalScore}`);
    return totalScore;
  };
  
  
  const sortObjectsBySelection = (objects) => {
    return objects.sort((a, b) => {
      const scoreDiff = calculateMatchingScore(b) - calculateMatchingScore(a);
  
      if (scoreDiff !== 0) {
        return scoreDiff; // Trie en fonction du score de correspondance
      } else {
        // Si le score est le même, trie par ordre d'origine
        return a.id - b.id;
      }
    });
  };
  

  const handleFilterSubmit = (event) => {
    event.preventDefault();
  
    const filteredObjects = selectionArray.filter(obj => (
      operations.includes(obj.Opérations) &&
      typesBiens.includes(obj.TypesB) &&
      nombrePieces.includes(obj.NombreP) &&
      localisations.includes(obj.Localisations) &&
      prix.includes(obj.Fourchette)
      // Ajoutez d'autres critères si nécessaire
    ));
    
  
    const sortedObjects = sortObjectsBySelection(filteredObjects);


    console.log(`
      Opérations : ${operations.join(', ')}
      TypesB : ${typesBiens.join(', ')}
      NombreP : ${nombrePieces.join(', ')}
      Localisations : ${localisations.join(', ')}
      Fourchette : ${prix.join(', ')}
      
      Résultats triés par sélection :
      ${sortedObjects.map(obj => `ID: ${obj.id}, Sélection: ${calculateMatchingScore(obj)}`).join('\n')}
    `);
  };
  

  return (
    <form onSubmit={handleFilterSubmit}>
      <div>
        <div className="dropdown">
          <div
            className="dropdown-header"
            onClick={() => setOpenWindow(openWindow === 'operations' ? null : 'operations')}
          >
            Types d'opération
            <div className="dropdown-chevron">
              { 
                openWindow === 'operations' ?
                  (<FontAwesomeIcon icon={faChevronUp} />) :
                  (<FontAwesomeIcon icon={faChevronDown} />)
              }
            </div>
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
            <div className="dropdown-chevron">
              { 
                openWindow === 'typesBiens' ?
                  (<FontAwesomeIcon icon={faChevronUp} />) :
                  (<FontAwesomeIcon icon={faChevronDown} />)
              }
            </div>
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
            <div className="dropdown-chevron">
              { 
                openWindow === 'nombrePieces' ?
                  (<FontAwesomeIcon icon={faChevronUp} />) :
                  (<FontAwesomeIcon icon={faChevronDown} />)
              }
            </div>
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
            <div className="dropdown-chevron">
              { 
                openWindow === 'localisations' ?
                  (<FontAwesomeIcon icon={faChevronUp} />) :
                  (<FontAwesomeIcon icon={faChevronDown} />)
              }
            </div>
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
            <div className="dropdown-chevron">
              { 
                openWindow === 'prix' ?
                  (<FontAwesomeIcon icon={faChevronUp} />) :
                  (<FontAwesomeIcon icon={faChevronDown} />)
              }
            </div>
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
  
        <button className='button-search'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
  
}

export default FormulaireRecherche
