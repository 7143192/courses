import React from 'react';
import storeLogo from '../../assets/p4.png'
import '../../css/INDEX.css'
import {history} from "../../utils/history";
import {BaseUrl} from "../../utils/constants";

class HeadLine extends React.Component{
    constructor(props) {
        super(props);
        this.getImgLink.bind(this);
        this.logOut.bind(this);
        this.state = {
            showModal : false,
        };
    }

    getImgLink = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user.type === 1){//管理员
            return {pathname : "/admin", state : {isAuthed : true}};
        }
        return {pathname : "/", state : {isAuthed : true}};
    }
    logOut = () => {
        //alert("退出登录成功！");
        let url = BaseUrl + 'logout';
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.status >= 0) {
                    console.log('退出登录时data=', data);
                    alert('退出登陆成功，此次会话时长为' + data.data.time + 'ms!');
                    localStorage.removeItem("user");//消除登录记录
                    history.push({pathname : "/login"});//重新退回到登录页面
                }
            });
        //localStorage.removeItem("user");//消除登录记录
        //history.push({pathname : "/login"});//重新退回到登录页面
    }

    handleLogOut = () => {

    }

    render(){
        let user = JSON.parse(localStorage.getItem("user"));
        return (
            <div className = "Header">
                <div className = "HeaderInfo">
                    <img src = {storeLogo} alt = "logo" style = {{height:"80px",width:"180px"}}/>
                    <div className="UserName">
                        <h4 className="hi">Hi, {user.username}!</h4>
                        <button className = "LogoutButton"
                                onClick = {this.logOut}>
                            退出登录
                        </button>
                    </div>

                </div>
            </div>
        );
    }
}


export default HeadLine;
