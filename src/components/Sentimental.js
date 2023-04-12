import React, {useContext} from 'react'

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';
import UserProfile from './UserProfile';

import './../css/Sentimental.css';

export default function Sentimental() {
    const {userValue, songId} = useContext(UserContext);
    const [user, setUser] = userValue;

    return !user ? (
        <div>
            <SideNav user={user}/>
            <Error />
        </div>
    ) : (
        <div>
            <SideNav user={user}/>
            <div className='sentimental'>
                <div className='header'>
                    <h2>Sentimental Song</h2>
                    <UserProfile user={user} />
                </div>
            </div>
        </div>
    );
}
