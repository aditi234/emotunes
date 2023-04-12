import { React, useContext } from "react";

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';
import UserProfile from "./UserProfile";

import './../css/Scan.css';

function Scan() {
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
            <div className='scan'>
                <div className='header'>
                    <h2>Scan</h2>
                    <UserProfile user={user} />
                </div>
            </div>
        </div>
    );
}

export default Scan;
