import React from "react";
import user1 from "../../assets/user1.png";
import user2 from "../../assets/user2.png";
import ch1 from "../../assets/jiangzhang1.png";
import ch2 from "../../assets/jiangzhang2.png";
import ch3 from "../../assets/jiangzhang3.png";

export default class AdminUser extends React.Component{
    constructor(props) {
        super(props);
        this.getSrc1.bind(this);
        this.getSrc.bind(this);
    }
    getSrc1 = () => {
        let {info} = this.props;
        if(info.key.sex === "男") return user1;
        return user2;
    }
    getSrc = () => {
        let src;
        if(this.props.num === 0) src = ch1;
        else{
            if(this.props.num === 1) src = ch2;
            else src = ch3;
        }
        return src;
    }
    render = () => {
        let {info} = this.props;
        return (
            <div className = "aAdminUser">
                <img src = {this.getSrc1()} alt = "AdminUserImg" className = "AdminUserImg"/>
                <br/>
                <div className = "firstBookInfo">
                    <img src = {this.getSrc()} alt = "ch" height = "30px" width = "30px"/>
                    <span className = "firstBookName">{info.key.username}</span>
                    <br/>
                    <span className = "firstBookSold">消费金额：{info.value}</span>
                </div>
            </div>
        );
    }
}
