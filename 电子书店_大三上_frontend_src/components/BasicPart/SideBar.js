import React from 'react'
import { Menu,Layout, Icon} from 'antd'
import '../../css/INDEX.css'
import {Link} from "react-router-dom";

class SideBar extends React.Component{
    constructor(props) {
        super(props);
        this.getInfo1.bind(this);
        this.getLink1.bind(this);
        this.getInfo2.bind(this);
        this.getLink2.bind(this);
        this.getInfo3.bind(this);
        this.getInfo4.bind(this);
        this.getLink4.bind(this);
    }

    getInfo1 = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let s = "";
        s = (user.type === 0) ? "购物车" : "用户管理";
        return s;
    }

    getLink1 = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let s = "";
        s = (user.type === 0) ? "/cart" : "/userManage";
        return s;
    }

    getLink2 = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user.type === 0) return {pathname : "/", state : {isAuthed : true}};
        return {pathname : "/admin", state : {isAuthed : true}};
    }

    getInfo2 = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let s = "";
        s = (user.type === 0) ? "图书" : "图书管理";
        return s;
    }

    getInfo3 = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let s = "";
        s = (user.type === 0) ? "订单" : "订单信息";
        return s;
    }

    getInfo4 = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let s = "";
        s = (user.type === 0) ? "消费情况" : "销售统计";
        return s;
    }

    getLink4 = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let s = "";
        s = (user.type === 0) ? "/UserStatic" : "/AdminStatic";
        return s;
    }

    render(){
        return (
            <div className="SideBar">
                <ul>
                    <li>
                        <Link to = {this.getLink2()}>
                            <a href={'/'} className="sideref">{this.getInfo2()}</a>
                        </Link>
                        <span>></span>
                    </li>
                    <li>
                        <a href={this.getLink1()} className="sideref">{this.getInfo1()}</a>
                        <span>></span>
                    </li>
                    <li>
                        <a href={'/myorder'} className="sideref">{this.getInfo3()}</a>
                        <span>></span>
                    </li>
                    <li>
                        <a href={this.getLink4()} className="sideref">{this.getInfo4()}</a>
                        <span>></span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default SideBar;
