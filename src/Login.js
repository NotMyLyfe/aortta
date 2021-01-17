import React from 'react';
import './login.css';

const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    phone: "",
});

//https://linguinecode.com/post/how-to-get-form-data-on-submit-in-reactjs
function Login(props) {

    var loggedIn = props.isLoggedIn;
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
        e.preventDefault()
        document.getElementById('verify-code-form').style.display = "block";
        console.log(formData);
        //send a code to vonage

    };

    const handleVerify = (e) => {
        e.preventDefault()
        //document.getElementById('verify-pin-btn').setAttribute("disabled", "disabled")
        var pinVal = parseInt(document.getElementById('inputPIN').value)
        console.log(pinVal)
        if (pinVal !== 7889) {
            console.log("ding dong you're wrong")

            // $("#try-again-msg").show();
            // setTimeout(function () {
            //     $("#try-again-msg").hide();
            // }, 2000);
            //

        } else {
            window.sessionStorage.logStatus = "true";
            window.location.href = "/messaging"
        }
        //send this to the API to verify
        //if success, proceed, add the info to database (google sheets?)
        //if not show a try again button


        //console.log(formData);
        //submit to API or something

    }

    return (
        <div className="login">
            <div className="login-header">
                <form id="sign-up-form">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="inputEmail4">First name</label>
                            <input type="text" className="form-control" id="inputFirstName" placeholder="First name" onChange={handleChange} required/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="inputPassword4">Last name</label>
                            <input type="text" className="form-control" id="inputLastName" placeholder="Last name" onChange={handleChange}  required/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Phone Number</label>
                        <input type="tel" className="form-control" id="inputPhoneNumber" placeholder="xxxXXXxxxx" onChange={handleChange} required/>
                    </div>
                    <button id="sign-in-btn" type="submit" className="btn btn-primary" onClick={handleSubmit}>Send code</button>
                </form>

                <form id="verify-code-form">
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <label htmlFor="inputEmail4">Enter your PIN</label>
                            <input type="text" className="form-control" id="inputPIN" maxLength="4" placeholder="XXXX" required />
                        </div>
                    </div>
                    <button id="verify-pin-btn" type="submit" className="btn btn-primary" onClick={handleVerify}>Verify</button>
                </form>
            </div>
        </div>
    );
}

//                <h6 id="try-again-msg">try again</h6>

//https://jsfiddle.net/L6n9b5nr
//verifying the pin

export default Login;