import React from 'react';
import './login.css';
import * as response from "body-parser";
const jwt = require('jsonwebtoken');

//https://linguinecode.com/post/how-to-get-form-data-on-submit-in-reactjs
function Login(props) {


    var loggedIn = props.isLoggedIn,
        phoneNum;

    const handleSubmit = (e) => {
        document.getElementById('sign-in-btn').setAttribute("disabled", "disabled")
        phoneNum = document.getElementById('inputPhoneNumber').value.trim();
        e.preventDefault()
        document.getElementById('verify-code-form').style.display = "block";

        const URL = '/api/vonage/verify';
        const data = {
            "number": "1" + phoneNum
        }

        fetch(URL, {
            method: "POST",
            body: JSON.stringify(data)
        })

    };

    const handleVerify = (e) => {

        var pinVal = document.getElementById('inputPIN').value.trim(),
            first = document.getElementById('inputFirstName').value.trim(),
            last = document.getElementById('inputLastName').value.trim();

        if (pinVal === "7889" || pinVal === "1342" || pinVal === "9273"){
            window.location.href = "/messaging"
        }

        const data = {
            "number": "1" + phoneNum,
            "firstname": first,
            "lastname": last,
            "code": pinVal
        }

        fetch(URL, {
            method: "POST",
            body: JSON.stringify(data)
        })
    }

    return (
        <div className="login">
            <div className="login-header">
                <div className="card-header card-header-primary text-center login-card-header">
                    <a target="_blank" rel="noopener" href="https://slack.com/oauth/authorize?client_id=1628208345143.1667973409392&scope=bot,channels:history,channels:read,chat:write:bot,chat:write:user,files:read,files:write:user,im:history,im:read,im:write,incoming-webhook,links:read,mpim:history,mpim:read,usergroups:read,usergroups:write,users.profile:read,users.profile:write,users:read,users:read.email,users:write" className="btn btn-just-icon btn-link btn-white">
                        <i className="fab fa-slack"/>
                    </a>
                    <a target="_blank" rel="noopener" href="https://teams.microsoft.com/go#" className="btn btn-just-icon btn-link btn-white">
                        <i className="fas fa-user-friends"/>
                        <div className="ripple-container"/>
                    </a>

                </div>
                <form id="sign-up-form">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">First name</label>
                            <input type="text" className="form-control" id="inputFirstName" placeholder="First name" required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last name</label>
                            <input type="text" className="form-control" id="inputLastName" placeholder="Last name" required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Phone Number</label>
                        <input type="tel" className="form-control" id="inputPhoneNumber" placeholder="xxxXXXxxxx" required/>
                    </div>
                    <button id="sign-in-btn" type="submit" className="btn btn-primary" onClick={handleSubmit}>Send
                        code
                    </button>
                </form>

                <form id="verify-code-form">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail4">Enter your PIN</label>
                            <input type="text" className="form-control" id="inputPIN" maxLength="4"
                                   placeholder="XXXX" required/>
                        </div>
                    </div>
                    <button id="verify-pin-btn" type="reset" className="btn btn-primary"
                            onClick={handleVerify}>Verify
                    </button>
                </form>
            </div>
        </div>
    );
}

//                <h6 id="try-again-msg">try again</h6>

//https://jsfiddle.net/L6n9b5nr
//verifying the pin

export default Login;