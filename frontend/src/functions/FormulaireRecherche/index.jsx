import { useState } from 'react';
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

  const compareByMatchCount = (selectedOptionsArray, selectionArray) => {
    const sortedIDs = selectionArray.map(item => item.Id);
  
    if (selectedOptionsArray) {
      selectedOptionsArray.forEach((selectedOption, index) => {
        const property = Object.keys(selectedOption)[0];
        const selectedValues = selectedOption[property];
  
        if (selectedValues.length > 0) {
          // Filtrez les éléments de selectionArray qui ont des valeurs correspondantes
          const filteredArray = selectionArray.filter(item => {
            const itemValue = item[property];
  
            // Vérifiez si la valeur de l'élément correspond à l'une des valeurs sélectionnées
            return selectedValues.includes(itemValue);
          });
  
          // Triez sortedIDs en fonction du nombre d'éléments correspondants
          sortedIDs.sort((a, b) => {
            const countA = filteredArray.filter(item => item.Id === a).length;
            const countB = filteredArray.filter(item => item.Id === b).length;
  
            return countB - countA;
          });
        }
      });
    }
  
    return sortedIDs;
  };
    
  const handleFilterSubmit = (event) => {
    event.preventDefault();
  
    const selectedOptions = [
      {"Opérations": operations},
      {"TypesB": typesBiens},
      {"NombreP": nombrePieces},
      {"Localisations": localisations},
      {"Fourchette": prix},
    ];
  
    // Enregistrez le nouveau tableau dans le localStorage, écrasant l'ancien
    localStorage.setItem('selectedOptionsArray', JSON.stringify(selectedOptions));
  
    console.log(selectedOptions);
  
    setOpenWindow(false);
  
    const resetSelection = (state, setFunction, selectAllState, setSelectAllFunction, initialValues) => {
      setFunction([]);
      setSelectAllFunction(false);
      // Vous pouvez également réinitialiser d'autres états selon les besoins
    };
  
    // Utilisation de la fonction pour réinitialiser les différentes sélections
    resetSelection(operations, setOperations, selectAllOperations, setSelectAllOperations, []);
    resetSelection(typesBiens, setTypesBiens, selectAllTypesBiens, setSelectAllTypesBiens, []);
    resetSelection(nombrePieces, setNombrePieces, selectAllNombrePieces, setSelectAllNombrePieces, []);
    resetSelection(localisations, setLocalisations, selectAllLocalisations, setSelectAllLocalisations, []);
    resetSelection(prix, setPrix, selectAllPrix, setSelectAllPrix, []);
  
    // Récupérer le tableau depuis le localStorage
    const selectionArray = require('../../public/datas/biensArray.json');
    const selectedOptionsArray = JSON.parse(localStorage.getItem('selectedOptionsArray'));
  
    // Obtenez les IDs triés en fonction du nombre de correspondances
    const sortedIDs = compareByMatchCount(selectedOptionsArray, selectionArray);
  
    // Affichez les IDs triés
    alert("Matching IDs: " + sortedIDs.join(", "));
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
