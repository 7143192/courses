import React from 'react';
import '../css/REGISTER.css';
import RegisterForm from '../components/AccountPart/RegisterForm';

class RegisterView extends React.Component{
    render(){
        return (
            <div className="RegisterPage">
                <div className="RegisterContents" id="contents">
                    <RegisterForm/>
                </div>
            </div>
        );
    }
}

export default RegisterView;
