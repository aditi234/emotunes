import { React, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './components/Login';
import Home from './components/Home';
import Favourites from "./components/Favourites";
import Scan from "./components/Scan";
import { UserProvider } from "./components/UserContext";

import './App.css';

function App() {
  
  return (
      <div className="App">
        <BrowserRouter>
          <UserProvider>
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/home"
              element={<Home />}
            />
            <Route
              path="/fav"
              element={<Favourites />}
            />
            <Route
              path="/scan"
              element={<Scan />}
            />
          </Routes>
          </UserProvider>
        </BrowserRouter>
      </div>        
  );
}

export default App;
