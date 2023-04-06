import React from 'react'
import song from '../../assets/audio/bookmark-in-a-book-140930.mp3';
import thumbnail from '../../assets/images/thumbnail.jpg';

export default function DisplayTrack({audioRef, setDuration, progressBarRef}) {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  return (
    <div className='display'>
        <div className='song-info'>
          <img src={thumbnail} alt="react logo" height="50px" width="50px"></img>
          <div>
            <h4>Gimme A Sign</h4>
            <h4 className='artist'>CLNGR</h4>
          </div>
        </div>
        <audio 
          src={song} 
          ref={audioRef}
          onLoadedMetadata={onLoadedMetadata} />
    </div>
  )
}
