import { React, useContext } from "react";

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';

import './../css/Favourites.css';

function Favourites() {
    const [user, setUser] = useContext(UserContext);

    return !user ? (
        <div>
            <SideNav user={user}/>
            <Error />
        </div>
    ) : (
        <div>
            <SideNav user={user}/>
            <div className='favourites'>
                <h1>Favourites</h1>
            </div>
        </div>
    );
}

export default Favourites;
