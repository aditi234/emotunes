import React, { useState, useContext } from 'react'
import {BiSearch} from 'react-icons/bi'
import axios from 'axios';

import { UserContext } from './UserContext';

import '../css/SearchBar.css'

export default function SearchBar({songs, setSongs}) {
  const [searchInput, setSearchInput] = useState('');
  const {userValue, songId} = useContext(UserContext);
  const [user, setUser] = userValue;

  const getSongs = async() => {
      await axios.get('/v1/songs/all/', {
          params: {
              user_id: user.sub,
              offset: 0
          }
      })
      .then(res => {
          if(res.error){
              alert(res.error);
          } else {      
              setSongs((prev) => [...prev, ...res.data]);
          }
      })
  }

  const handleChange = (value) => {
    setSearchInput(value);
    if(value.length>=3) {
      axios.get('/v1/songs/search', {
        params: {
          user_id: user.sub,
          prefix: value
        }
      })
      .then(res => {
        if(res.error) {
          alert(res.error);
        } else {
          setSongs(()=>[...res.data]);
        }
      })
    } else if(value.length===0) {
        getSongs();
    }
  };
  
  return (
    <div className='search-bar'>
        <BiSearch />
        <input
            type="text"
            placeholder="Search here"
            onChange={(e)=>handleChange(e.target.value)}
            value={searchInput} 
        />
    </div>
  )
}
