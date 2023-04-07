import React from 'react'

import '../css/UserProfile.css'

export default function UserProfile({user}) {
  return (
    <div className='user-profile'>
        <img src={user.picture} alt="user-pic" />
        <h4 className='color-fill'>Hello, {user.name}</h4>
    </div>
  )
}
