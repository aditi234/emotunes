import { React, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import axios from 'axios';

import SideNav from './SideNav';
import Error from "./Error";
import SongBar from "./SongBar";

import { UserContext } from "./UserContext";
import thumbnail from './../assets/images/images.jfif';

import './../css/Home.css';

function Home() {
    // const [user, setUser] = useContext(UserContext);
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
        <div>
            <SideNav user={user}/>
            <Error />
        </div>
    ) : (
        <div>
            <SideNav user={user}/>
            <div className='home'>
                <h1>Home</h1>
                {
                    songs.map((song, index) => {
                        return(
                            <div className="song-playlist">       
                                <div className="song-name">
                                    <button onClick={()=>selectSong(song.title)}>{index}</button>
                                    <img src={thumbnail} alt="react logo" height="50px" width="50px"></img>
                                    <h4>{song.title}</h4>
                                </div>
                                {/* <h4>Dreamland</h4> */}
                                <BsSuitHeart className="like-icon" size={25}/>
                            </div>
                        )
                    })
                }
            </div>
            <SongBar songName={singleSong}/>
        </div>
    );
}

export default Home;
