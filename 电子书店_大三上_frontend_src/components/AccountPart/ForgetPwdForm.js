import React from 'react';
import '../../css/FORGETPWD.css';
import {BaseUrl} from "../../utils/constants";

class EmailInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:"",
        }
    }

    componentDidMount() {
        this.props.onRef(this);
        this.CheckEmail = this.CheckEmail.bind(this);
    }

    CheckEmail = (e) => {
        let input = e.target.value;
        if(input === "" || input === null){
            alert("请输入邮箱信息！");
            return ;
        }
        if(!(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(input))) {
            alert("请输入正确格式的邮箱信息！");
        }
        this.setState({
            email:input,
        });
    }

    render(){
        return (
            <li className="li1">
                <div className="inputname">
                    邮箱：
                </div>
                <input type="text" className="input1" required="required"
                       onBlur = {(e) => this.CheckEmail(e)}/>
            </li>
        );
    }
}

class NewPwdInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            newpwd:"",
        }
    }

    componentDidMount() {
        this.CheckNewPwd = this.CheckNewPwd.bind(this);
        this.props.onRef(this);
    }

    CheckNewPwd = (e) => {
        let input = e.target.value;
        console.log(input);
        if(input === "" || input === null){
            alert("请输入新密码！");
            return ;
        }
        if(input.length < 8){
            alert("新密码的长度不应小于8位！");
            return ;
        }
        if(!(/^(?=.{8,16})(?=.*[0-9])(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?\{\}\\\/_\>\|.,:";'-=+])[\w!@#$%^&*?\{\}\\\/_\>\|.,:";'-=+]{8,16}$/)
            .test(input)){
            alert("新密码长度为8-16位且至少含有一个大小写字母与数字同时不应包含特殊字符！");
        }
        this.props.func(input);
        this.setState({
            newpwd:input,
        });
    };

    render(){
        return (
            <li className="li1">
                <div className="newpassword">
                    请输入新密码：
                </div>
                <input type="password" className="input2" required="required"
                       onBlur = {(e) => this.CheckNewPwd(e)}/>
            </li>
        );
    }
}

class ConfirmPwdInfo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            confirmpwd:"",
        };
    }

    componentDidMount() {
        this.CheckConfirmPwd = this.CheckConfirmPwd.bind(this);
        this.props.onRef(this);
        this.setState({
            confirmpwd : this.props.func1,
        });
    }

    CheckConfirmPwd = (e) => {
        let input = e.target.value;
        console.log(input);
        let ans = this.props.func1;
        console.log(ans);
        if(input === "" || input === null){
            alert("请再次输入新密码！");
            return ;
        }
        if(input !== ans){
            alert("两次输入的密码不符！");
            return ;
        }
        this.setState({
            confirmpwd:input,
        });
    };

    render(){
        return (
            <li className="li1">
                <div className="confirmpassword">
                    请确认新密码：
                </div>
                <input type="password" className="input3" required="required"
                       onBlur = {(e) => this.CheckConfirmPwd(e)}/>
            </li>
        );
    }
}

class ForgetPwdForm extends React.Component{
    constructor(props) {
        super(props);
        this.changePassword.bind(this);
        this.state = {
            pwd:"",
        }
    }

    GetNewPwd = (val) => {
        this.setState({
            pwd:val,
        });
    }

    componentDidMount() {
        //this.CheckSame = this.CheckSame.bind(this);
        this.GetNewPwd = this.GetNewPwd.bind(this);
    }

    changePassword = () => {
        let email = this.fchild1.state.email;
        let pwd = this.rchild2.state.newpwd;
        if(email === "" || email === null){
            alert("请输入邮箱！");
            return ;
        }
        if(pwd === "" || pwd === null){
            alert("未输入新密码！");
            return ;
        }
        console.log("输入的新密码：", pwd);
        console.log("输入的邮箱信息:", email);
        //let url = "http://localhost:8080/changePassword?newPassword=" + pwd + "&email=" + email;
        let url = BaseUrl + "changePassword?newPassword=" + pwd + "&email=" + email;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.userId === 0){
                    alert("输入的邮箱信息不正确！");
                    return ;
                }
                alert("修改密码成功！");
            })
    }

    render(){
        return (
            <ul className="PasswordList">
                <li className="li1">
                    <h2>找&nbsp;回&nbsp;密&nbsp;码</h2>
                </li>
                <EmailInfo onRef={(ref)=>this.fchild1 = ref}/>
                <br/>
                <NewPwdInfo onRef={(ref)=>this.rchild2 = ref} func = {(val) => this.GetNewPwd(val)}/>
                <br/>
                <ConfirmPwdInfo onRef={(ref)=>this.rchild3 = ref} func1 = {this.state.pwd}/>
                <br/>
                <li className="li1">
                    <button type="submit" className="Button" name="Button"
                    onClick = {this.changePassword}>
                        修改密码
                    </button>
                </li>
            </ul>
        );
    }
}

export default ForgetPwdForm;
