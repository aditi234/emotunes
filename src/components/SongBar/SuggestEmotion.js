import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';
import {BsEmojiSmileFill} from 'react-icons/bs';

import { UserContext } from '../UserContext';

export default function SuggestEmotion() {
    const [menuState, setMenuState] = useState('true');
    const [ emotions, setEmotions] = useState([
        {value: "HAPPY"}, {value: "SAD"}, {value: "NEUTRAL"}, {value: "ANGRY"}, {value: "FEAR"}, {value: "SURPRISE"}
    ]);
    const {userValue, songId} = useContext(UserContext);
    const [user, setUser] = userValue;
    const [singleSong, setSingleSong] = songId;

    const selectEmotion = async (emotion) => {
        await axios.post('/v1/song_player/user_song_emotion_preference',null, {
            params: {
                user_id: user.sub,
                song_id: singleSong.songId,
                correct_emotion: emotion
            }
        })
    } 
    
  return (
    <div className='drop-down'>
        <button ><BsEmojiSmileFill size={20}/></button>
        <div className='dropdown-content'>
            {
                emotions.map(item => {
                    return(
                        <a><button onClick={() => selectEmotion(item.value)}>{item.value}</button></a>
                    )
                })
            }
        </div>
    </div>
  )
}
