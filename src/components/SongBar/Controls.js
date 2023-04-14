import React, { useEffect, useState, useCallback, useRef } from 'react'
import { BsPlayCircle, BsPauseCircle } from 'react-icons/bs';
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from 'react-icons/md';

export default function Controls({ audioRef, progressBarRef, duration, setTimeProgress }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] =useState(0);
  const [totalTime, setTotalTime] = useState(0);
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

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (
    <>
        <div className='controls'>
          <h5>{audioRef && audioRef.current ? formatTime(audioRef.current.currentTime) : "0:00"}</h5>
          <button>
            <MdOutlineSkipPrevious size={30} className='color-fill'/>
          </button>
          <button onClick={togglePlayPause}>
            {isPlaying ? <BsPauseCircle size={30} className='color-fill'/> : <BsPlayCircle size={30} className='color-fill'/>}
          </button>
          <button>
            <MdOutlineSkipNext size={30} className='color-fill'/>
          </button>
          <h5>{audioRef && audioRef.current ? formatTime(audioRef.current.duration) : ""}</h5>
        </div>
    </>
  )
}
