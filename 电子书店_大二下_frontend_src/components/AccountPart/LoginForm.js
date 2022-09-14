import React from 'react';
import '../../css/LOGIN.css';
//import {Link} from 'react-router-dom';
import {Button} from 'antd';
import {history} from '../../utils/history';
import {withRouter} from "react-router-dom";
import {BaseUrl} from "../../utils/constants";
//import * as userService from "../services/UserService";

class InputUserName extends React.Component{
    constructor(props) {
        super(props);
        this.UserNameVal = this.UserNameVal.bind(this);
        this.state = {
            username:"",
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    UserNameVal = (e) => {
        let input = e.target.value;
        if(input === ""){
            alert("请输入用户名！");
        }
        this.setState({
            username:input,
        });
    }

    render(){
        //const {getFieldDecorator} = this.props;
        return (
            <div className = "GetUserName">
                用户名:<br/>
                <input className="InputUserName" type="text" name="UserName"
                       required="required" placeholder={"用户名"}
                       onBlur = {(e) => {this.UserNameVal(e)}}/>
            </div>
        );
    }
}

class InputPwd extends React.Component{
    constructor(props) {
        super(props);
        this.PwdVal = this.PwdVal.bind(this);
        this.state = {
            pwd:"",
        }
    }

    componentDidMount() {
        this.props.onRef(this);
    }

    PwdVal = (e) => {
        let input = e.target.value;
        if(input === ""){
            alert("请输入密码！");
        }
        this.setState({
            pwd:input,
        });
    }

    render(){
        return (
            <div className = "GetPwd">
                密码:<br/>
                <input className="InputPassWord" type="password" name="PassWord" placeholder={"密码"}
                       required="required" onBlur = {(e) => this.PwdVal(e)}/>
            </div>
        );
    }
}

class Issues extends React.Component{
    render(){
        return (
            <div className = "SomeIssue">
                <input type="checkbox" name="Remember"/>
                记住此账号
                <a className="PassWordForget" href={'/forgetpwd'}>
                    忘记密码？
                </a>
                <br/>
            </div>
        );
    }
}

class RegisterInfo extends React.Component{
    render(){
        return (
            <div className = "registerrequest">
                还未拥有账号？
                <a className="Register" href={'/register'}>现在注册!</a>
            </div>
        );
    }
}

class SubmitForm extends React.Component{
    constructor(props) {
        super(props);
        this.CheckSubmit = this.CheckSubmit.bind(this);
        this.LogInFetchAsync.bind(this);
        //this.HandleSubmit = this.HandleSubmit.bind(this);
        this.state = {
            path:"/login"
        }
    }

    CheckSubmit = () => {
        let user = this.child1.state.username;
        console.log(user);
        let password = this.child2.state.pwd;
        console.log(password);
        if(user === "" || user === null){
            alert("未输入用户名！");
            return ;
        }
        if(password === "" || password === null){
            alert("未输入密码！");
            return ;
        }
        this.setState({
            path:"/"
        })
    }

    async LogInFetchAsync(){
        let user = this.child1.state.username;
        let password = this.child2.state.pwd;
        //let url = "http://localhost:8080/checkUser?username=" + user + "&password=" + password;
        let url = BaseUrl + "checkUser?username=" + user + "&password=" + password;
        let response = await fetch(url);
        let data = await response.json();
        return data;
    }

    Check = async () => {//转化为异步操作
        let user = this.child1.state.username;
        let password = this.child2.state.pwd;
        if (user == null || user === "" || password === "" || password == null) {
            alert("请输入用户名与密码！");
            return;
        }
        //let url = "http://localhost:8080/checkUser?username=" + user + "&password=" + password;
        let url = BaseUrl + "checkUser?username=" + user + "&password=" + password;
        console.log("登录使用的url=", url);
        await fetch(url)//转化为异步操作
            .then((response) => {
                return response.json();
            })
            .then(data => {
                console.log(data.userId);
                if (data.userId === -1) {
                    alert("用户名或密码错误！");
                    localStorage.removeItem("user");
                    history.push({pathname: "/", state: {isAuthed: false}});
                }
                if (data.userId !== -1) {
                    if (data.type === 2) {
                        alert("该用户已经被禁用！");
                        localStorage.removeItem("user");
                        history.push({pathname: "/", state: {isAuthed: false}});
                    } else {
                        console.log(data.username);
                        console.log(data.password);
                        localStorage.removeItem("user");
                        localStorage.setItem("user", JSON.stringify(data));//保存用户信息
                        const User = JSON.parse(localStorage.getItem("user"));
                        console.log("User Info", User.username);
                        console.log("User Id", User.userId);
                        if (data.type !== 1) history.push({pathname: "/", state: {isAuthed: true}});
                        else history.push({pathname: "/admin", state: {isAuthed: true}});
                    }
                }
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }

    render(){
        return (
            <form className="LoginForm" name="LoginForm" method="get">
                <InputUserName onRef={(ref)=>this.child1 = ref}/>
                <br/>
                <InputPwd onRef={(ref)=>this.child2 = ref}/>
                <Issues/>
                <Button type="submit" value="登录" className="LoginButton"
                onClick = {this.Check}>
                    <a>登录</a>
                </Button>
            </form>
        );
    }
}

class LoginForm extends React.Component{
    render(){
        return(
            <div className="LoginContent">
                <SubmitForm/>
                <br/><br/>
                <RegisterInfo/>
            </div>
        );
    }
}

export default withRouter(LoginForm);
