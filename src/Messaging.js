import React from 'react';
import Application from './Application'


function Messaging(props) {

    const loggedIn = props.isLoggedIn;
    if(loggedIn){
        //do shit
        return <Application appName={"teams"}/>
    } else {
        console.log('fuck you bye')
    }

    return <h1>yolo</h1>
}

//
// function showMessage(props){
//     var user = props.username,
//         content = props.message;
//     return (
//         <div>
//             <h5>{user}</h5>
//             <p>{content}</p>
//         </div>
//     );
// }

export default Messaging;