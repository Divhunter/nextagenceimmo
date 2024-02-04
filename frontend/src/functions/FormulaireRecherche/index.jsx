import React, { useState } from 'react'
import Autosuggest from 'react-autosuggest'

import './m-formulaireRecherche.css'
import './d-formulaireRecherche.css'

const FormulaireRecherche = () => {
  /*const [categorie, setCategorie] = useState('');
  const [typesBiens, setTypesBiens] = useState([]);
  const [nombrePieces, setNombrePieces] = useState([]);
  const [localites, setLocalites] = useState([]);
  const [fourchettePrix, setFourchettePrix] = useState('');

  const handleChangeCategorie = (event) => {
    setCategorie(event.target.value);
  };

  const handleChangeTypesBiens = (event) => {
    const value = event.target.value;
    if (value === 'Tout sélectionner') {
      setTypesBiens(value === 'Tout sélectionner' ? ['Tout sélectionner'] : []);
    } else {
      setTypesBiens((types) => {
        return types.includes(value)
          ? types.filter((type) => type !== value && type !== 'Tout sélectionner')
          : [...types, value];
      });
    }
  };

  const handleChangeNombrePieces = (event) => {
    const value = event.target.value;
    if (value === 'Tout sélectionner') {
      setNombrePieces(value === 'Tout sélectionner' ? ['Tout sélectionner'] : []);
    } else {
      setNombrePieces((pieces) => {
        return pieces.includes(value)
          ? pieces.filter((piece) => piece !== value && piece !== 'Tout sélectionner')
          : [...pieces, value];
      });
    }
  };

  const handleChangeLocalites = (event) => {
    const value = event.target.value;
    if (value === 'Tout sélectionner') {
      setLocalites(value === 'Tout sélectionner' ? ['Tout sélectionner'] : []);
    } else {
      setLocalites((lieux) => {
        return lieux.includes(value)
          ? lieux.filter((lieu) => lieu !== value && lieu !== 'Tout sélectionner')
          : [...lieux, value];
      });
    }
  };
  
  const handleChangeFourchettePrix = (event) => {
    setFourchettePrix(event.target.value);
};
  

  const handleSubmit = (event) => {
    event.preventDefault();
    // Effectuez ici l'action de recherche en utilisant la catégorie, les types de biens, le nombre de pièces et les localités sélectionnés.
    console.log('Catégorie sélectionnée:', categorie);
    console.log('Types de biens sélectionnés:', typesBiens);
    console.log('Nombre de pièces sélectionné:', nombrePieces);
    console.log('Localités sélectionnées:', localites);
    console.log('Fourchette de prix sélectionnée:', fourchettePrix);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Catégorie :
        <select value={categorie} onChange={handleChangeCategorie}>
          <option value="">Sélectionnez une catégorie</option>
          <option value="Vente">Vente</option>
          <option value="Location">Location</option>
          <option value="Location saisonnière">Location saisonnière</option>
          <option value="Programme">Programme</option>
          <option value="Viager">Viager</option>
          <option value="Enchère">Enchère</option>
        </select>
      </label>

      <label>
        Types de biens :
        <select value={typesBiens} onChange={handleChangeTypesBiens} multiple>
          <option value="Tout sélectionner">Tout sélectionner</option>
          <option value="Appartement">Appartement</option>
          <option value="Maison">Maison</option>
          <option value="Terrain">Terrain</option>
          <option value="Commerce">Commerce</option>
          <option value="Garage / Parking">Garage / Parking</option>
          <option value="Immeuble">Immeuble</option>
          <option value="Bureau">Bureau</option>
          <option value="Bateau">Bateau</option>
          <option value="Locaux d'activité / Entrepôts">Locaux d'activité / Entrepôts</option>
          <option value="Cave / Box">Cave / Box</option>
        </select>
      </label>

      <label>
        Nombre de pièces :
        <select value={nombrePieces} onChange={handleChangeNombrePieces} multiple>
          <option value="Tout sélectionner">Tout sélectionner</option>
          <option value="1 pièce">1 pièce</option>
          <option value="2 pièces">2 pièces</option>
          <option value="3 pièces">3 pièces</option>
          <option value="4 pièces">4 pièces</option>
          <option value="5 pièces">5 pièces</option>
          <option value="6+ pièces">6+ pièces</option>
        </select>
      </label>

      <label>
        Localités :
        <select value={localites} onChange={handleChangeLocalites} multiple>
          <option value="Tout sélectionner">Tout sélectionner</option>
          <option value="Brignais">Brignais</option>
          <option value="Bron">Bron</option>
          <option value="Irigny">Irigny</option>
          <option value="La Mulatière">La Mulatière</option>
          <option value="Lyon 2ième">Lyon 2ième</option>
          <option value="Lyon 7ième">Lyon 7ième</option>
          <option value="Lyon 8ième">Lyon 8ième</option>
          <option value="Oullin">Oullin</option>
          <option value="Saint-Genis-Laval">Saint-Genis-Laval</option>
          <option value="Vénissieux">Vénissieux</option>
        </select>
      </label>

      <label>
        Fourchette de Prix :
        <select value={fourchettePrix} onChange={handleChangeFourchettePrix}>
          <option value="">Sélectionnez une fourchette de prix</option>
          <option value="0-500">0 à 500 €</option>
          <option value="500-1000">500 € à 1000 €</option>
          <option value="1000-1500">1000 € à 1500 €</option>
          <option value="1500-2000">1500 € à 2000 €</option>
          <option value="2000-3000">2000 € à 3000 €</option>
          <option value="3000-4000">3000 € à 4000 €</option>
          <option value="4000-5000">4000 € à 5000 €</option>
          <option value="5000+">Plus de 5000 €</option>
        </select>
      </label>

      <button type="submit">Rechercher</button>
    </form>
  )*/
  // Exemple de données pour l'auto-complétion

  // Exemple de données pour l'auto-complétion de l'adresse
  const addressSuggestions = [
    '123 Rue de la République',
    '456 Avenue des Champs-Élysées',
    '789 Boulevard Saint-Michel',
    '101 Place de la Concorde',
  ];

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [addressSuggestionsList, setAddressSuggestions] = useState([]);

  const getAddressSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    return addressSuggestions.filter(
      (addr) => addr.toLowerCase().includes(inputValueLowerCase)
    );
  };

  const onAddressSuggestionsFetchRequested = ({ value }) => {
    setAddressSuggestions(getAddressSuggestions(value));
  };

  const onAddressSuggestionsClearRequested = () => {
    setAddressSuggestions([]);
  };

  const onAddressChange = (_, { newValue }) => {
    setAddress(newValue);
  };

  const addressInputProps = {
    placeholder: 'Saisissez une adresse...',
    value: address,
    onChange: onAddressChange,
  };

  return (
    <form>
      <label>
        Prénom:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Nom:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Adresse:
        <Autosuggest
          suggestions={addressSuggestionsList}
          onSuggestionsFetchRequested={onAddressSuggestionsFetchRequested}
          onSuggestionsClearRequested={onAddressSuggestionsClearRequested}
          getSuggestionValue={(suggestion) => suggestion}
          renderSuggestion={(suggestion) => <div>{suggestion}</div>}
          inputProps={addressInputProps}
        />
      </label>
      <button type="submit">Envoyer</button>
    </form>
  );
};

export default FormulaireRecherche;
