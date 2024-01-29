import React, { useState, useEffect } from 'react';
import './search.css';
import { FaSearch } from 'react-icons/fa';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = ({ projets, setData }) => {
  const [termeSearch, setTermeSearch] = useState('');

  const handleSearch = (e) => {
    setTermeSearch(e.target.value);
  }

  useEffect(() => {
      const searchLower = termeSearch.toLowerCase();
    if (termeSearch.length !== 0) {
      const dataSearched = projets.filter((projet) => {
        return projet.firstName.toLowerCase().includes(searchLower);
      });
  
      // Triez les résultats en fonction de la pertinence du prénom
      dataSearched.sort((a, b) => {
        const aFirstName = a.firstName.toLowerCase();
        const bFirstName = b.firstName.toLowerCase();
  
        if (aFirstName === bFirstName) {
          return 0; // Les prénoms sont identiques.
        } else if (aFirstName.startsWith(searchLower) && !bFirstName.startsWith(searchLower)) {
          return -1; // a est plus pertinent que b.
        } else if (!aFirstName.startsWith(searchLower) && bFirstName.startsWith(searchLower)) {
          return 1; // b est plus pertinent que a.
        } else {
          return aFirstName.localeCompare(bFirstName); // Tri par ordre alphabétique.
        }
      });
      if(dataSearched.length!==0){
          setData(dataSearched);
      }
  
    } else {
      // Réinitialisez les données si la recherche est vide
      setData(projets);
    }
  }, [termeSearch, projets, setData]);
  

  return (
    <div className='search'>
      {termeSearch.length === 0 ? (
        <FaSearch className='icon-search' />
      ) : (
        <FontAwesomeIcon
          className='icon-search'
          icon={faXmark}
          onClick={() => setTermeSearch('')}
        />
      )}
      <input
        placeholder='Search ...'
        className='input-search'
        onChange={handleSearch}
        value={termeSearch}
      />
    </div>
  );
};

export default Search;
