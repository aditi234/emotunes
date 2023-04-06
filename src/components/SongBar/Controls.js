import React, { useEffect, useState, useCallback, useRef } from 'react'
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

export default function Controls({ audioRef, progressBarRef, duration, setTimeProgress }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const playAnimationRef = useRef();

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const repeat = useCallback(() => {
    const currentTime = audioRef.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      '--range-progress',
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    if(currentTime===audioRef.current.duration) {
      setIsPlaying(false);
    }

    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioRef, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, audioRef, repeat]);

  return (
    <>
        <div className='controls'>
          <button>
            <MdOutlineSkipPrevious size={30} className='color-fill'/>
          </button>
          <button onClick={togglePlayPause}>
            {isPlaying ? <BsPauseCircle size={30} className='color-fill'/> : <BsPlayCircle size={30} className='color-fill'/>}
          </button>
          <button>
            <MdOutlineSkipNext size={30} className='color-fill'/>
          </button>
        </div>
    </>
  )
}
