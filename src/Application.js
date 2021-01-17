import React from 'react';



function Application(props){
    var appName = props.appName,
        appIcon = "";

    if( appName === "teams"){
        appIcon = "fab fa-group-friends"
    }

    return (
        <div className="col-lg-6 col-md-12">
            <div className="row">
                <div className="col-md-2">
                    <ul className="nav nav-pills nav-pills-icons flex-column" role="tablist">

                        <li className="nav-item">
                            <a className="nav-link" href="#dashboard-2" role="tab" data-toggle="tab"
                               aria-selected="false">
                                <i className="material-icons">dashboard</i>
                                microsoft teams
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active show" href="#schedule-2" role="tab" data-toggle="tab"
                               aria-selected="true">
                                <i className="fas fa-user-friends"/>
                                slack
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="col-md-8">
                    <div className="tab-content">
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Application;