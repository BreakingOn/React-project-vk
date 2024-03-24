import React, { useState } from 'react';

import './ProductTable.css';

const SearchBar = ({ onAddNewClick, onSearchButtonClick }) => {
    const [searchQuery, setSearchQuery] = useState('');
   
    
    const handleChange = (event) => {
        setSearchQuery(event.target.value);
    };
    const handleSearch = () => {
        const query = searchQuery.toLowerCase(); 
        onSearchButtonClick(query); 
    };

  return (
    <div className='search-bar'>
    <input 
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleChange} 
    /> 
     <div className="btn-container">
        <button className='btn1' onClick={handleSearch}>Искать</button>
        <button className='btn2' onClick={onAddNewClick}>Добавить новую</button>
    </div>
    </div>
  );
};

export default SearchBar;