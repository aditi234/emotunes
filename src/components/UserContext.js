import React, {createContext, useState} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
    const [user, setUser] = useState('');
    const [song, setSong] = useState('');
    return (
        <UserContext.Provider value={{userValue: [user, setUser], songId: [song, setSong]}}>
            {props.children}
        </UserContext.Provider>
    )
}