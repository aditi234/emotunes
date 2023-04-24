import React from 'react';
import {ImNeutral2, ImSad2, ImHappy2} from 'react-icons/im';

import '../css/EmotionTiles.css';

export default function EmotionTiles({emotion}) {
  const emojiFunc = () => {
    if (emotion === 'Happy') {
        return (<ImHappy2 size={30} />)
    } else if (emotion === 'Neutral') {
        return (<ImNeutral2 size={30} />)
    } else {
        return (<ImSad2 size={30}/>)
    }
  }
  return (
    <div className='outer-box'>
        <div className='emoji'>
            {
                emojiFunc()
            }
        </div>
        <h2>{emotion}</h2>
    </div>
  )
}
