import React from 'react';
import './App.css';
import Nav from './Nav'


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
