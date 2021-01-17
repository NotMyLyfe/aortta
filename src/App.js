import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Nav from './Nav'
import Landing from './Landing'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Login from "./Login";
import Messaging from "./Messaging";
import About from "./About";


function App(props) {
    const loggedIn = props.loggedIn;
    window.sessionStorage.logStatus = loggedIn;
    return (
        <div className="App">
            <Nav isLoggedIn={loggedIn}/>
        </div>
    );
}



export default App;
