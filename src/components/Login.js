import { React, useContext, useEffect, useState} from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { UserContext } from "./UserContext";
import logo from './../assets/images/logo.png';

import './../css/Login.css';

export default function Login() {
  const navigate = useNavigate();
  // const [user, setUser] = useContext(UserContext);
  const {userValue, songId} = useContext(UserContext);
  const [user, setUser] = userValue;

  const handleCallbackResponse = (response) => {
    const userObj=jwt_decode(response.credential);
    setUser(userObj);
    axios.post('/v1/admin/user/register/', {
            emailId: userObj.email,
            name: userObj.name,
            userId: userObj.sub
    })
    // .then(res => console.log(res));
    if(userObj) navigate('/home', {state: {user: userObj}});
  }
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "150770899843-mjhhvqcr9p67kt98pn1nbk870c3fmmv9.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large"}
    );
  }, [])
  return (
      <div className="Login">
        <div className="firstHalf">
          <div>
            <img src={logo} alt="react logo" height="110px" width="110px"></img>
            <h1>Emotunes</h1>
            <p>
              Emotunes analyze the listener's emotional state<br />
              and play music that is believed to match or complement that state. <br/>
              </p>
          </div>
        </div>
        <div className="secondHalf">
          <div className="box">
            <div>
              <h2>LogIn</h2>
              <div id="signInDiv"></div>
            </div>
          </div>
        </div>
      </div>        
  );
}

