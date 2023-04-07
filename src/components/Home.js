import { React, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import {AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import {Link} from 'react-router-dom';

import SideNav from './SideNav';
import Error from "./Error";
import SearchBar from "./SearchBar";
import AudioPlayer from "./SongBar/AudioPlayer";
import UserProfile from "./UserProfile";

import { UserContext } from "./UserContext";
import thumbnail from './../assets/images/thumbnail.jpg';

import './../css/Home.css';

function Home() {
    const {userValue, songId} = useContext(UserContext);
    const [user, setUser] = userValue;
    const [singleSong, setSingleSong] = songId;
    const [songs, setSongs] = useState([]);
    useEffect(()=> {
        fetch('/v1/songs/all?user_id='+user.sub, {
            method: "get",
        })
        .then(res =>res.json())
        .then(result => {
            if(result.error){
                alert(result.error);
            } else {
                // console.log(result);
                setSongs(result)
            }
        })

    }, [])
    const selectSong = (song) => {
        console.log(song)
        setSingleSong(song);
    }
    return !user ? (
        <>
            <SideNav user={user}/>
            <Error />
        </>
    ) : (
        <>
            <SideNav />
            <div className='home'>
                <div className="header">
                    <SearchBar />
                    <UserProfile user={user}/>
                </div>
                <h2>...</h2>
                <div className="song-list">
                    <div>
                        <img src={thumbnail} alt="react logo" className="thumbnail1"></img>
                    </div>
                    <div>
                        {
                            songs.map((song, index) => {
                                return(
                                    <div className="song-playlist"> 
                                        <AiOutlineHeart className="like-icon" size={25}/> 
                                        <div className="song-info">
                                            <h4>{song.title}</h4>
                                            <h4 className="artist">Selena Gomez</h4>
                                        </div>    
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="liked-song-heading">
                    <h2>Liked Songs</h2>
                    <Link to='/fav' className="liked-song-link">view all</Link>
                </div>
                <div className="liked-songs">
                        {
                            songs.slice(0,5).map((song, index) => {
                                return(
                                    <div className="liked-song-playlist"> 
                                        <img src={thumbnail} alt="react logo" className="thumbnail2"></img>
                                        <div className="song-info">
                                            <h4>{song.title}</h4>
                                            <h4 className="artist">Selena Gomez</h4>
                                        </div>   
                                    </div>
                                )
                            })
                        }
                </div>
                
            </div>
            <AudioPlayer songName={singleSong}/>
        </>
    );
}

export default Home;
