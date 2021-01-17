//import logo from './logo.svg';

import React from "react";
//import App from './App'
import Login from './Login'
import Messaging from './Messaging'
import About from './About'
import Landing from './Landing'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Nav(props) {
    var loggedIn = props.isLoggedIn;
    loggedIn = JSON.parse(window.sessionStorage.logStatus) === true;
    console.log(window.sessionStorage.logStatus)
    console.log(loggedIn);
    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-transparent">
                <div className="container">
                    <div className="navbar-translate">
                        <Link to="/" className="nav-link">Aortta</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="navbar-toggler-icon"/>
                            <span className="navbar-toggler-icon"/>
                            <span className="navbar-toggler-icon"/>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    <i className="material-icons">explore</i>
                                    About
                                    <div className="ripple-container"/>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Greeting isLoggedIn={loggedIn}/>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <Switch>
                <Route path="/login" exact component={ () => <Login />} />
                <Route path="/messaging" exact component={ () => <Messaging isLoggedIn={loggedIn}/>} />
                <Route path="/about" exact component={ () => <About />} />
                <Route path="/" exact component={ () => <Landing /> } />
            </Switch>

        </Router>
    );
}


function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function UserGreeting(){
    return (
        <Link to="/messaging" className="nav-item">
            <button className="btn btn-primary btn-round">
                <i className="material-icons">favorite</i> Welcome back!
            </button>
        </Link>
    );
}

function GuestGreeting(){
    return (
        <Link to="/login" className="nav-item">
            <button className="btn btn-primary btn-round">
                <i className="material-icons">favorite</i> Get started!
            </button>
        </Link>
    );
}

export default Nav;