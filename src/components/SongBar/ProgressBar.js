import React from 'react'

export default function ProgressBar({ progressBarRef, audioRef, timeProgress, duration}) {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  return (
    <>
        <input 
          type="range" 
          ref={progressBarRef}
          defaultValue="0"
          onChange={handleProgressChange} 
          className='progress-bar' />
    </>
  )
}
