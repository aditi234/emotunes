import { React } from 'react';
import {ImHome} from 'react-icons/im';
import { FaHeart } from 'react-icons/fa';
import { RiBodyScanFill } from 'react-icons/ri';
import {Link} from 'react-router-dom';

import './../css/SideNav.css';

export default function SideNav(user) {
    return(
        <div className='sideNav'>
            <div>
                <img src={user.user.picture}></img>
                <h5 className='color-fill'>{user.user.name}</h5>
            </div>
            <div className='icon'>
                <Link to='/home'>
                    <ImHome size={20} className='color-fill'/>
                    Home
                </Link>
            </div>
            <div className='icon'>
                <Link to='/fav'>
                    <FaHeart size={20} className='color-fill'/>
                    Liked Songs
                </Link>
            </div>
            <div className='icon'>
                <Link to='/scan'>
                    <RiBodyScanFill size={20} className='color-fill'/>
                    Scan Emotion
                </Link>
            </div>
        </div>
    );
}