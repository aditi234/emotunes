import { React } from 'react';
import {ImHome} from 'react-icons/im';
import { FaHeart } from 'react-icons/fa';
import { RiBodyScanFill } from 'react-icons/ri';
import {Link} from 'react-router-dom';
import {MdEmojiEmotions} from 'react-icons/md';

import logo from '../assets/images/logo.png';

import './../css/SideNav.css';

export default function SideNav() {
    return(
        <div className='sideNav'>
            <div className='logo'>
                <img src={logo} alt='logo' />
                <h4>Emotunes</h4>
            </div>
            <div className='icon'>
                <Link to='/home'>
                    <ImHome size={25} className='color-fill'/>
                    Home
                </Link>
            </div>
            <div className='icon'>
                <Link to='/fav'>
                    <FaHeart size={25} className='color-fill'/>
                    Liked Songs
                </Link>
            </div>
            <div className='icon'>
                <Link to='/scan'>
                    <RiBodyScanFill size={25} className='color-fill'/>
                    Scan Emotion
                </Link>
            </div>
            <div className='icon'>
                <Link to='/sentimental'>
                    <MdEmojiEmotions size={25} className='color-fill'/>
                    Sentimental Song
                </Link>
            </div>
        </div>
    );
}