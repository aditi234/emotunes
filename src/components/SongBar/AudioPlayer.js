import React, {useRef, useState} from 'react'

import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import Volume from './Volume';

import '../../css/SongBar.css';

export default function AudioPlayer({song}) {
  const audioRef = useRef();
  const progressBarRef = useRef();

  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  return (
    <>
      <div className='song-bar'>
        <div className='audio'>
          <DisplayTrack audioRef={audioRef} setDuration={setDuration} progressBarRef={progressBarRef}/>
          <Controls audioRef={audioRef} progressBarRef={progressBarRef} duration={duration} setTimeProgress={setTimeProgress} />
          <Volume audioRef={audioRef}/>
        </div>
        <ProgressBar progressBarRef={progressBarRef} audioRef={audioRef} timeProgress={timeProgress} duration={duration}/>
      </div>
    </>
  )
}
