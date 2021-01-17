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
                    <button id="verify-pin-btn" type="submit" className="btn btn-primary"
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