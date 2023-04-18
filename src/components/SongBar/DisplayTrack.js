import React, {useContext} from 'react'

import song from '../../assets/audio/bookmark-in-a-book-140930.mp3';
import thumbnail from '../../assets/images/thumbnail.jpg';
import { UserContext } from "./../UserContext"


export default function DisplayTrack({audioRef, setDuration, progressBarRef}) {
  const {userValue, songId} = useContext(UserContext);
  const [singleSong, setSingleSong] = songId;

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  return (
    <div className='display'>
        <div className='song-info'>
          <img src={thumbnail} alt="react logo" height="50px" width="50px"></img>
          <div className='songName'>
            <h5>{singleSong.title}</h5>
            <h5 className='artist'>{singleSong.artist}</h5>
          </div>
        </div>
        <audio 
          src={song} 
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata} />
    </div>
  )
}
