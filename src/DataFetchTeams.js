import React, {useState, useEffect} from 'react';

const userID = window.sessionStorage.teamsUserID;

var getTeamsID = "/api/msal/getTeams?homeAccountId=" + userID,
    getChannelID = "/api/msal/getChannels?homeAccountId=" + userID + "&teamId=" + getTeamsID,
    getMessagesID = "/api/msal/getMessages?homeAccountId=" + userID + "&teamId=" + getTeamsID + "&channelId=" + getChannelID,
    getRepliesID = "/api/msal/getReplies?homeAccountId=" + userID + "&teamId=" + getTeamsID + "&channelId=" + getChannelID + "&messageId=" + getMessagesID,
    postMessagesID = "/api/msal/postMessages?homeAccountId=" + + userID + "&teamId=" + getTeamsID + "&channelId=" + getChannelID; // requires body w json - post request
// body : { content : "" }}


function DataFetchTeams(){

    var getTeams = fetch(getTeamsID)
        .then((res) => res.json())
        .then((data) => {
            console.log(data.results);
        });


    console.log(
        fetch(getMessagesID).then(response => response.json())
    )
}

class TeamsList extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            teams: [],
        };


    }
}

async function getTeams(){
    const res = await fetch(getTeamsID);
    const data = await res.json();
    return data.results;
}

async function getChannels(){
    const res = await fetch(getChannelID);
    const data = await res.json();
    return data.results;
}

async function getMessages(){
    const res = await fetch(getMessagesID);
    const data = await res.json();
    return data.results;
}

export default DataFetchTeams;
