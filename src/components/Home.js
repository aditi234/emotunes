import React, {useContext, useEffect, useState } from "react";
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
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
    const [numberOfSongs, setNumberOfSongs] = useState(0);
    const [likedSongs, setLikedSongs] = useState([]);

    const getSongs = async() => {
        await axios.get('/v1/songs/all/', {
            params: {
                user_id: user.sub,
                offset: numberOfSongs
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

    useEffect(() => {
        getSongs();
    }, [numberOfSongs]);

    const selectSong = (song) => {
        setSingleSong(() => song);
    }

    const handleInfiniteScroll =() => {
        let control = document.querySelector(".all-songs");
        try {
            if(control.scrollTop + control.clientHeight +1 > control.scrollHeight) {
                setNumberOfSongs((prev)=> prev+50);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(()=> {
        let control = document.querySelector(".all-songs");
        control.addEventListener("scroll", handleInfiniteScroll)
    }, [])

    const toggleLike = async (song_Id) => {
        await axios.post('/v1/song_player/toggle_like/', null ,{
            params: {
                user_id: user.sub,
                song_id: song_Id
            }
        })
        .then((res)=> {
            if(res.error) {
                alert(res.error)
            } else {
                const newData = songs.map(song => {
                    if(song.songId === song_Id) {
                        song.liked = !song.liked
                    }
                    return song;
                });
                setSongs(newData);
                const song = songs.map(item => {
                    if(item.songId === song_Id) {
                        return item;
                    }
                })
                setLikedSongs((prev) => [...prev, ...song]);
                getAllLikedSongs();
            }
        })
    }

    const getAllLikedSongs = async() => {
        axios.get('/v1/songs/liked/', {
            params: {
                user_id: user.sub,
                offset: 0,
            }
        })
        .then((res) => {
            if(res.error) {
                alert(res.error);
            } else {
                setLikedSongs(res.data);
            }
        });
    }

    useEffect(() => {
        getAllLikedSongs();
    }, [])
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
                    <SearchBar numberOfSongs={numberOfSongs} setNumberOfSongs={setNumberOfSongs} songs={songs} setSongs={setSongs}/>
                    <UserProfile user={user}/>
                </div>
                <h2>...</h2>
                <div className="song-list">
                    <div>
                        <img src={thumbnail} alt="react logo" className="thumbnail1"></img>
                    </div>
                    <div className="all-songs">
                        {
                            songs.map((song, index) => {
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
                <div className="liked-song-heading">
                    <h2>Liked Songs</h2>
                    <Link to='/fav' className="liked-song-link">view all</Link>
                </div>
                <div className="liked-songs">
                        {
                            likedSongs.slice(0,5).map((song, index) => {
                                return(
                                    <div className="liked-song-playlist"> 
                                        <img src={thumbnail} alt="react logo" className="thumbnail2"></img>
                                        <div className="song-info">
                                            <h4>{song.title}</h4>
                                            <h4 className="artist">{song.artist}</h4>
                                        </div>   
                                    </div>
                                )
                            })
                        }
                </div>
                
            </div>
           <AudioPlayer /> 
        </>
    );
}

export default Home;
