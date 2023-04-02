import { React, useContext } from "react";

import { UserContext } from "./UserContext";
import Error from "./Error";
import SideNav from './SideNav';

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
                <h1>Scan</h1>
            </div>
        </div>
    );
}

export default Scan;
