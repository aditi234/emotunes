import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';
import UserProfile from './UserProfile';
import EmotionTiles from './EmotionTiles';
import AudioPlayer from "./SongBar/AudioPlayer";

import './../css/Sentimental.css';

export default function Sentimental() {
    const {userValue, songId} = useContext(UserContext);
    const [user, setUser] = userValue;
    const [singleSong, setSingleSong] = songId;
    const [songs, setSongs] = useState([]);
    const [numberOfSongs, setNumberOfSongs] = useState(0);
    const [emotion, setEmotion] = useState('HAPPY');

    const selectSong = (song) => {
        setSingleSong(() => song);
    }

    const getSongsByEmotion = () =>{
        axios.get('/v1/songs/emotion', {
            params: {
                user_id: user.sub,
                emotion: emotion,
                offset: numberOfSongs
            }
        })
        .then(res => {
            if(res.error) {
                alert(res.error);
            } else {
                setSongs((prev) => [...prev, ...res.data]);
            }
        })
    }

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
            }
        })
    }

    useEffect(() => {
        getSongsByEmotion();
    }, [numberOfSongs, emotion])

    const handleInfiniteScroll =() => {
        let control = document.querySelector(".sentimental");
        try {
            if(control.scrollTop + control.clientHeight +1 > control.scrollHeight) {
                setNumberOfSongs((prev)=> prev+10);
            }
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        let control = document.querySelector(".sentimental");
        control.addEventListener("scroll", handleInfiniteScroll)
    }, [])

    const getSongs = (emotion) => {
        setEmotion(() => emotion);
        setNumberOfSongs(0);
        setSongs([]);
    }

    return !user ? (
        <div>
            <SideNav user={user}/>
            <Error />
        </div>
    ) : (
        <div>
            <SideNav user={user}/>
            <div className='sentimental'>
                <div className='header'>
                    <h2>Sentimental Song</h2>
                    <UserProfile user={user} />
                </div>
                <div className='select-emotion'>
                    <button onClick={() => getSongs("HAPPY")}><EmotionTiles emotion={'Happy'}/></button>
                    <button onClick={() => getSongs("NEUTRAL")}><EmotionTiles emotion={'Neutral'}/></button>
                    <button onClick={() => getSongs("SAD")}><EmotionTiles emotion={'Sad'}/></button>
                </div>
                <div className='songs-by-emotion'>
                    {
                        songs.map((song, index) =>{
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
