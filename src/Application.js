import React from 'react';

import './application.css';


function Application(props){
    var appName = props.appName,
        appIcon = "";

    if( appName === "teams"){
        appIcon = "fab fa-group-friends"
    }

    return (
        <div id="wrapper-app" className="col-md-4 col-md-12">
            <div id="inner-app" className="row">
                <div className="col-md-2">
                    <ul className="nav nav-pills nav-pills-icons flex-column" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" href="#teams" role="tab" data-toggle="tab"
                               aria-selected="false">
                                <i className="material-icons">dashboard</i>
                                microsoft teams
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active show" href="#slack" role="tab" data-toggle="tab"
                               aria-selected="true">
                                <i className="fas fa-user-friends"/>
                                slack
                            </a>
                        </li>
                    </ul>
                </div>

                <div id="messaging-panel" className="col-md-8">
                    <div className="tab-content">
                        <div className="tab-pane" id="teams">
                            Collaboratively administrate empowered markets via plug-and-play networks. Dynamically procrastinate
                            B2C users after installed base benefits.
                            <br/>
                            Dramatically visualize customer directed convergence without revolutionary ROI.
                            <input id="input-teams" type="text" className="form-control" placeholder="Send a message..."/>
                        </div>

                        <div className="tab-pane active show" id="slack">
                            Efficiently unleash cross-media information without cross-media value. Quickly maximize timely
                            deliverables for real-time schemas.
                            <br/>Dramatically maintain clicks-and-mortar solutions without functional solutions.
                            <input id="input-slack" type="text" className="form-control" placeholder="Send a message..."/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Application;