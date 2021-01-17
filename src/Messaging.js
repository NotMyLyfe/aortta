import React from 'react';

function Messaging(props) {
    const loggedIn = props.isLoggedIn;
    if(loggedIn){
        //do shit
        console.log('gg you can see stuff')
    }
    console.log('fuck you bye')
    return <h1>yolo</h1>
}

export default Messaging;