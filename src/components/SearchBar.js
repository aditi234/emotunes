import React, { useState } from 'react'
import {BiSearch} from 'react-icons/bi'
import '../css/SearchBar.css'

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  
  return (
    <div className='search-bar'>
        <BiSearch />
        <input
            type="text"
            placeholder="Search here"
            onChange={handleChange}
            value={searchInput} 
        />
    </div>
  )
}
