//import logo from './logo.svg';

import React from "react";
import Login from './Login'
import Messaging from './Messaging'
import About from './About'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function Nav(props) {
    const loggedIn = props.isLoggedIn;
    return (
        <Router>
        <nav className="navbar navbar-expand-lg navbar-transparent">
            <div className="container">
                <div className="navbar-translate">
                    <Link to="/">Aortta</Link>
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
                        <li className="active nav-item">
                            <Link to="/about" className="nav-link">
                                <i className="material-icons">explore</i>
                                About
                                <div className="ripple-container"/>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/login" className="nav-link">
                                <i className="material-icons">account_circle</i>
                                <Greeting isLoggedIn={loggedIn}/>
                                <div className="ripple-container"/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

            <Switch>
                <Route path={"/login"}>
                    <Login />
                </Route>
                <Route path={"/messaging"}>
                    <Messaging />
                </Route>
                <Route path={"/about"}>
                    <About />
                </Route>
            </Switch>

        </Router>
    );
}

//greetings stuff

function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

function UserGreeting(props){
    return "Logout"
}

function GuestGreeting(props){
    return "Login"
}

export default Nav;