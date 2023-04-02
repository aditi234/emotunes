import { React, useState } from 'react';
import {BsSuitHeart, BsSuitHeartFill} from 'react-icons/bs';
import {VscDebugStart} from 'react-icons/vsc';
import {IoPauseSharp} from 'react-icons/io5';
import {MdSkipPrevious, MdSkipNext} from 'react-icons/md'

import thumbnail from './../assets/images/thumbnail.jpg';
import song from './../assets/audio/bookmark-in-a-book-140930.mp3';


import './../css/SongBar.css';

export default function SongBar({songName}) {
    const [status, setStatus] = useState(0);
    return(
        <div className="song-bar">
            <img src={thumbnail} alt="react logo" height="50px" width="50px"></img>
            <div className="song-title">
                <h4>{songName}</h4>
                {/* <h4>Glass Animals</h4> */}
            </div>
            <BsSuitHeart className="like" size={25}/>
            <div className='song-status'>
                <audio src={song} controls />
                {/* <MdSkipPrevious className="like" size={25} />
                {
                    status===0 ? <VscDebugStart size={25}/> :
                    <IoPauseSharp size={25}/>
                }
                <MdSkipNext className="like" size={25} /> */}
            </div>
        </div>
    );
}