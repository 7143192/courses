import React from 'react';
import '../css/FORGETPWD.css';
import ForgetPwdForm from '../components/AccountPart/ForgetPwdForm';

class ForgetPwdView extends React.Component{
    render(){
        return (
            <div className="PasswordPage">
                <div className="PasswordPageContents" id="contents">
                    <ForgetPwdForm/>
                </div>
            </div>
        );
    }
}

export default ForgetPwdView;
