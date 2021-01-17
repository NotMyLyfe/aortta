
import './login.css';

function Login() {
    return (
        <div className="modal fade" id="loginModal" tabIndex="-1" role="">
            <div className="modal-dialog modal-login" role="document">
                <div className="modal-content">
                    <div className="card card-signup card-plain">
                        <div className="modal-header">
                            <div className="card-header card-header-primary text-center">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                    <i className="material-icons">clear</i>
                                </button>

                                <h4 className="card-title">Log in</h4>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form className="form" method="" action="">
                                <div className="card-body">

                                    <div className="form-group bmd-form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="material-icons">face</i>
                                                </div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="First Name..."/>
                                        </div>
                                    </div>

                                    <div className="form-group bmd-form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i className="material-icons">face</i>
                                                </div>
                                            </div>
                                            <input type="text" className="form-control" placeholder="Last Name..."/>
                                        </div>
                                    </div>

                                    <div className="form-group bmd-form-group">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <div className="input-group-text"><i
                                                    className="material-icons">phone</i></div>
                                            </div>
                                            <input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" className="form-control" placeholder="(555) 555-5555"/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <a href="#pablo" className="btn btn-primary btn-link btn-wd btn-lg">Get Started</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;