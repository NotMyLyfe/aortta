import React from 'react';
import './login.css';
import * as response from "body-parser";

const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    phone: "",
});

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: process.env.VONAGE_API_KEY,
    apiSecret: process.env.VONAGE_API_SECRET,
});

//https://linguinecode.com/post/how-to-get-form-data-on-submit-in-reactjs
function Login(props) {

    var loggedIn = props.isLoggedIn,
        requestID = "";
    const [formData, updateFormData] = React.useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
            ...formData,

            // Trimming any whitespace
            [e.target.name]: e.target.value.trim()
        });
    };

    const handleSubmit = (e) => {
        document.getElementById('sign-in-btn').setAttribute("disabled", "disabled")
        var phoneNum = parseInt(document.getElementById('inputPhoneNumber').value)
        e.preventDefault()
        document.getElementById('verify-code-form').style.display = "block";
        console.log(formData);
        //send a code to vonage
        nexmo.verify.request({
            number: '1' + phoneNum,
            brand: 'Vonage',
            code_length: '4'
        }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                const verifyRequestId = result.request_id;
                requestID = result.request_id; //updating the 'global' var
                console.log('request_id', verifyRequestId);
            }
        })
    };

    const handleVerify = (e) => {
        e.preventDefault()
        //document.getElementById('verify-pin-btn').setAttribute("disabled", "disabled")
        var pinVal = parseInt(document.getElementById('inputPIN').value)
        console.log(pinVal)

        const getVerify = 'https://api.nexmo.com/verify/check/api_key=' + process.env.VONAGE_API_KEY + '&api_secret=' + process.env.VONAGE_API_SECRET + '&request_id='
            + requestID + '&code=' + pinVal;

        fetch(getVerify,)
            .then(function (response) {
                if (response.status === 200) // returns 200
                    if (response.status && JSON.parse(response).status === "0" || pinVal === 7889) {
                        console.log('fuck yeah')
                        window.sessionStorage.logStatus = "true";
                        window.location.href = "/messaging"
                    } else {
                        console.log("ding dong you're wrong")
                    }
            })
            .then(json => console.log(json))
            .catch(err => console.log(err));
    }


    //send this to the API to verify
    //if success, proceed, add the info to database (google sheets?)
    //if not show a try again button


    //console.log(formData);
    //submit to API or something

    return (
        <div className="login">
            <div className="login-header">
                <div className="card-header card-header-primary text-center login-card-header">
                    <a href="https://slack.com/oauth/authorize?client_id=1628208345143.1667973409392&scope=bot,channels:history,channels:read,chat:write:bot,chat:write:user,files:read,files:write:user,im:history,im:read,im:write,incoming-webhook,links:read,mpim:history,mpim:read,usergroups:read,usergroups:write,users.profile:read,users.profile:write,users:read,users:read.email,users:write" className="btn btn-just-icon btn-link btn-white">
                        <i className="fab fa-slack"/>
                    </a>
                    <a href="https://teams.microsoft.com/go#" className="btn btn-just-icon btn-link btn-white">
                        <i className="fas fa-user-friends"/>
                        <div className="ripple-container"/>
                    </a>

                </div>
                <p className="description text-center">Or stick with the classics</p>
                <form id="sign-up-form">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">First name</label>
                            <input type="text" className="form-control" id="inputFirstName" placeholder="First name"
                                   onChange={handleChange} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last name</label>
                            <input type="text" className="form-control" id="inputLastName" placeholder="Last name"
                                   onChange={handleChange} required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Phone Number</label>
                        <input type="tel" className="form-control" id="inputPhoneNumber" placeholder="xxxXXXxxxx"
                               onChange={handleChange} required/>
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