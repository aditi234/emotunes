import React, { useState, useContext } from 'react'
import {BiSearch} from 'react-icons/bi'
import '../css/SearchBar.css'
import axios from 'axios';

import { UserContext } from "./UserContext";


export default function SearchBar({numberOfSongs, setNumberOfSongs, songs, setSongs}) {
  const [searchInput, setSearchInput] = useState('');
  const {userValue, songId} = useContext(UserContext);
  const [user, setUser] = userValue;
  const search = async() => {
      await axios.get('/v1/songs/search', {
          params: {
             user_id: user.sub,
             prefix: searchInput,
             offset: numberOfSongs
          }
      })
      .then(res => {
        if(res.error){
            alert(res.error);
        } else {      
            setSongs(res.data);
        }
    })
  }
  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    setNumberOfSongs(0);
    search()
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
