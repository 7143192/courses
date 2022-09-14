import React from 'react';
import LoginForm from '../components/AccountPart/LoginForm';
import '../css/LOGIN.css';
import {withRouter} from "react-router-dom";
//import {withRouter} from "react-router-dom";

class LoginView extends React.Component{
    render(){
        return (
            <div className="LoginPage">
                <div className="LoginContainer">
                    <div className="LoginBox">
                        <h1 className="LoginTitle">登&nbsp;&nbsp;录</h1>
                        <LoginForm/>
                    </div>
                </div>
            </div>
        );
    }
}
//export default withRouter(LoginView);

export default withRouter(LoginView);
