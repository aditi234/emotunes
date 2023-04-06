import React, {useEffect, useState} from 'react'
import { HiVolumeUp } from 'react-icons/hi'; 
import {AiOutlineHeart } from 'react-icons/ai';

export default function Volume({ audioRef}) {
  const [volume, setVolume] = useState(60);
  useEffect(() => {
    if (audioRef) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume, audioRef]);
  return (
    <div className="volume">
        <HiVolumeUp size={25} className='color-fill'/>
        <input
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={(e) => setVolume(e.target.value)}
            className='volume-bar'
        />
        <AiOutlineHeart className="color-fill" size={25}/> 
    </div>
  )
}
