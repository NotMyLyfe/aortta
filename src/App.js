import logo from './logo.svg';
import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Nav from './Nav'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


function App(props) {
    const loggedIn = props.loggedIn;
    return (
        <div className="App">
            <Nav isLoggedIn={loggedIn}/>
            <header className="App-header">
                <h1>Aortta</h1>
                <h3 className="aortta-tagline">Getting to the heart of things</h3>
                <Router>
                    <Link to="/login">
                        <button className="btn btn-primary btn-round" data-toggle="modal" data-target="#loginModal">
                            <i className="material-icons">favorite</i> <Greeting isLoggedIn={loggedIn}/>
                        </button>
                    </Link>

                </Router>
            </header>
        </div>
    );
}


function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function UserGreeting(props){
    return "Welcome back"
}

function GuestGreeting(props){
    return "Get started"
}

export default App;
