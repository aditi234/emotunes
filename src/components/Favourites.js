import { React, useContext } from "react";

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';
import UserProfile from "./UserProfile";

import './../css/Favourites.css';

function Favourites() {
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
            <div className='favourites'>
                <div className='header'>
                    <h2>Liked Songs</h2>
                    <UserProfile user={user}/>
                </div>
            </div>
        </div>
    );
}

export default Favourites;
