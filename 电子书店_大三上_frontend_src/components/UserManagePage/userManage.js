import React from 'react';
import {Link, withRouter} from "react-router-dom";
import User1 from "../../assets/user1.png";
import User2 from "../../assets/user2.png";
import {BaseUrl} from "../../utils/constants";

class UserManage extends React.Component
{
    constructor(props) {
        super(props);
        this.getSrc.bind(this);
        this.setAbility.bind(this);
        this.state = {
            userName : "",
            userId : 0,
            type : -1,
        };
    }
    componentDidMount = () => {
        const {info} = this.props;
        this.setState({
            userName : info.username,
            userId : info.userId,
            type : info.type,
        })
    }

    setAbility = () => {
        let {info} = this.props;
        //let url = "http://localhost:8080/setAbility?id=" + info.userId;
        let url = BaseUrl + "setAbility?id=" + info.userId;//
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("权限设置成功！");
                this.setState({type : data.type});
            })
    }

    getSrc = () => {
        let {info} = this.props;
        let s = (info.sex === "男") ? User1 : User2;
        return s;
    }

    render = () => {
        //const {info} = this.props;
        return (
            <div className = "userManage">
                <img alt = "adminUserImage" src = {this.getSrc()} className = "userManageImg"/>
                <br/>
                <span className = "usermanageId">
                    ID&nbsp;:&nbsp;{this.state.userId}
                </span>
                <br/>
                <span className = "usermanageName">
                    用户名&nbsp;:&nbsp;{this.state.userName}
                </span>
                <br/><br/>
                <button className = "userManageButton" onClick = {this.setAbility}>
                    {this.state.type === 2 ? "解禁此用户" : "禁用此用户"}
                </button>
            </div>
        )
    }
}

class UserList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            userList : [],
        }
    }

    componentDidMount = () => {
        //let url = "http://localhost:8080/getAllUser";
        let url = BaseUrl + "getAllUser";
        fetch(url)
            .then(response => response.json())
            .then(data => {
                localStorage.removeItem("AllUsers");
                localStorage.setItem("AllUsers", JSON.stringify(data));
                this.setState({userList : data});
            })
    }

    render = () => {
        return (
            <div className = "AdminUserList">
                <ul className = "AdminUsers" id = "adminUsers">
                    {
                        this.state.userList.map((item, index)=>{
                            if(item.type === 1) return null;
                            return < li key ={index}>
                                <UserManage info = {item}/>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default withRouter(UserList);
