import React from 'react';
import '../../css/REGISTER.css';
import {BaseUrl} from "../../utils/constants";
import {history} from "../../utils/history";

class UserName extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            username:"",
        }
    }

    componentDidMount() {
        this.CheckUserName = this.CheckUserName.bind(this);
        this.props.onRef(this);
    }

    CheckUserName = (e) => {
        let input = e.target.value;
        if(input === "" || input === null){
            alert("请输入用户名！");
            return ;
        }
        //let url = "http://localhost:8080/checkUserName?username=" + input;
        /*let url = BaseUrl + "checkUserName?username=" + input;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("检查结果为：", data.userId);
                if(data.userId !== 0){
                    alert("用户名已经存在！");
                }
            })*/
        this.setState({
            username:input,
        });
    };

    render(){
        return (
            <li className="li1">
                <div className="inputname1">
                    请输入用户名：
                </div>
                <input type="text" className="input1" required="required"
                onBlur = {(e) => this.CheckUserName(e)}/>
            </li>
        );
    }
}

class NewPwd extends React.Component{
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
            return ;
        }
        this.props.func(input);
        this.setState({
            newpwd:input,
        });
    };

    render(){
        return (
            <li className="li1">
                <div className="inputname1">
                    请输入新密码：
                </div>
                <input type="password" className="input2" required="required"
                       onBlur = {(e) => this.CheckNewPwd(e)}/>
            </li>
        );
    }
}

class ConfirmPwd extends React.Component{
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
        console.log("二次输入的密码：",input);
        let ans = this.props.func1;
        console.log("输入的新密码：",ans);
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
                <div className="inputname1">
                    请再次输入密码：
                </div>
                <input type="password" className="input3" required="required"
                       onBlur = {(e) => this.CheckConfirmPwd(e)}/>
            </li>
        );
    }
}

class Email extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            email:"",
        };
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
                <div className="inputname1">
                    请输入邮箱：
                </div>
                <input type="text" className="input4" required="required"
                       onBlur = {(e) => this.CheckEmail(e)}/>
            </li>
        );
    }
}

class RegisterSubmitForm extends React.Component{
    constructor(props) {
        super(props);
        this.registerUser.bind(this);
        this.state = {
            pwd:"",
        };
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

    registerUser = () => {
        let username = this.rchild1.state.username;
        let password = this.rchild2.state.newpwd;
        let email = this.rchild4.state.email;
        if(username === "" || username === null){
            alert("请填写用户名！");
            return ;
        }
        if(password === "" || password === null){
            alert("请填写密码！");
            return ;
        }
        if(email === "" || email === null){
            alert("请输入邮箱信息！");
            return ;
        }
        console.log(username);
        console.log(password);
        console.log(email);
        //alert("注册成功！");//注册成功！
        //let url = "http://localhost:8080/registerUser?username=" + username + "&password=" + password
        //+ "&email=" + email;
        let url = BaseUrl + "registerUser?username=" + username + "&password=" + password
        + "&email=" + email;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.userId === -1){
                    alert("用户名已经存在！");
                }
                else{
                    history.push('/login');
                    alert("注册成功！");
                }
            })

    };

    /*CheckSame = () => {
        let newinput = this.rchild2.state.newpwd;
        let confirminput = this.rchild3.state.confirmpwd;
        if(newinput !== "" && confirminput !== "" && newinput !== confirminput){
            alert("两次输入的密码不符！");
        }
    };*/
    render(){
        return (
            <div className = "REGISTER">
                <ul className="RegisterList">
                    <li className="li1">
                        <h2>账&nbsp;号&nbsp;注&nbsp;册</h2>
                    </li>
                    <UserName onRef={(ref)=>this.rchild1 = ref}/>
                    <NewPwd onRef={(ref)=>this.rchild2 = ref} func = {(val) => this.GetNewPwd(val)}/>
                    <ConfirmPwd onRef={(ref)=>this.rchild3 = ref} func1 = {this.state.pwd}/>
                    <Email onRef={(ref)=>this.rchild4 = ref}/>
                    <br/>
                    <li className="li1">
                        <button type="submit" className="button" name="button"
                        onClick = {this.registerUser}>
                            立即注册
                        </button>
                    </li>
                </ul>
            </div>
        );
    }
}

class RegisterForm extends React.Component{
    render(){
        return (
            <RegisterSubmitForm/>
        );
    }
}

export default RegisterForm;
