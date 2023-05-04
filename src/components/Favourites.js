import { React, useContext, useEffect, useState } from "react";
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import {GoPlay} from 'react-icons/go';
import axios from 'axios';

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';
import UserProfile from "./UserProfile";
import AudioPlayer from "./SongBar/AudioPlayer";
import image from './../assets/images/likedSong.avif';

import './../css/Favourites.css';

function Favourites() {
    const {userValue, songId} = useContext(UserContext);
    const [user, setUser] = userValue;
    const [singleSong, setSingleSong] = songId;
    const [likedSongs, setLikedSongs] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(0);

    const getAllLikedSongs = async() => {
        axios.get('/v1/songs/liked/', {
            params: {
                user_id: user.sub,
                offset: numberOfSongs,
            }
        })
        .then((res) => {
            if(res.error) {
                alert(res.error);
            } else {
                setLikedSongs((prev) => [...prev, ...res.data]);
            }
        });
    }

    const handleInfiniteScroll =() => {
        let control = document.querySelector(".favourites");
        try {
            if(control.scrollTop + control.clientHeight +1 > control.scrollHeight) {
                setNumberOfSongs((prev)=> prev+50);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllLikedSongs();
    }, [numberOfSongs]);

    useEffect(() => {
        let control = document.querySelector(".favourites");
        control.addEventListener("scroll", handleInfiniteScroll)
    }, [])

    const selectSong = (song) => {
        setSingleSong(() => song);
    }
    
    const toggleLike = async (song_Id) => {
        await axios.post('/v1/song_player/toggle_like', null ,{
            params: {
                user_id: user.sub,
                song_id: song_Id
            }
        })
        .then((res)=> {
            if(res.error) {
                alert(res.error)
            } else {
                const newData = likedSongs.map(song => {
                    if(song.songId === song_Id) {
                        song.liked = !song.liked
                    }
                    return song;
                });
                setLikedSongs(newData);
            }
        })
    }

    return !user ? (
        <div>
            <SideNav user={user}/>
            <Error />
        </div>
    ) : (
        <div>
            <SideNav user={user}/>
            <div className='favourites'>
                <div className="upper">
                    <UserProfile className="user-profile" user={user}/>
                    <img className="like-page" src={image} alt="liked-song"/>
                    <div className="text-portion">
                        <div className="text-first">
                            <GoPlay size={30}/>
                            <h4>Playlist</h4>
                        </div>
                        <h1>Liked Songs</h1>
                    </div>
                </div>
                <div className="all-liked-songs">
                    {
                        likedSongs.map((song, index) => {
                            return(
                                <div className="song-playlist">
                                    <button onClick={()=> toggleLike(song.songId)}>
                                        {
                                            song.liked ? <AiFillHeart className="like-icon" size={25}/> :
                                            <AiOutlineHeart className="like-icon" size={25}/> 
                                        }
                                    </button>
                                    <button className="song-name" onClick={() => selectSong(song)}>
                                        <div className="song-info">
                                            <h4>{song.title}</h4>
                                            <h4 className="artist">{song.artist}</h4>
                                        </div> 
                                    </button> 
                                </div>   
                            )
                        })
                    }
                </div>
            </div>
            <AudioPlayer />
        </div>
    );
}

export default Favourites;
