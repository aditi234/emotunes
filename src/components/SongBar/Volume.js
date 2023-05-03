import React, {useEffect, useState, useContext} from 'react'
import { HiVolumeUp } from 'react-icons/hi'; 
import {AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

import { UserContext } from "./../UserContext"
import SuggestEmotion from './SuggestEmotion';

export default function Volume({ audioRef}) {
  const [volume, setVolume] = useState(60);
  const {userValue, songId} = useContext(UserContext);
  const [singleSong, setSingleSong] = songId;

  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);
  return (
    <div className="volume">
        {singleSong ? <SuggestEmotion /> : null }
        <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className='volume-bar'
        />
        <HiVolumeUp size={25} className='color-fill'/>
    </div>
  )
}
