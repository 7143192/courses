import React from 'react'
import '../../css/INDEX.css'
import {Link, withRouter} from "react-router-dom";
import {history} from "../../utils/history";
import {BaseUrl} from "../../utils/constants";
import OrderRow2 from "./OrderRow2";

class OrderRow1 extends React.Component{
    render(){
        return (
            <div className="orderrow1">
                <div className="boxes">
                    <input type="checkbox" className="orderbox"/>
                </div>
                <br/>
                <div className="imgs">
                    <span>订单1</span>
                </div>
            </div>
        );
    }
}

class OrderRow3 extends React.Component{
    render(){
        return (
            <div className="orderrow3">
                <div className="orderstate">
                    ￥
                </div>
            </div>
        );
    }
}

class OrderRow4 extends React.Component{
    render(){
        return (
            <div className="orderrow4">
                <button type="button" className="orderbutton">
                    去结算!
                </button>
                <button type="button" className="orderbutton">
                    结束订单
                </button>
                <button type="button" className="orderbutton">
                    订单详情
                </button>
            </div>
        );
    }
}

class OrderInfo extends React.Component{
    constructor(props) {
        super(props);
        this.delOrderFromList.bind(this);
        this.getRow1Info.bind(this);
        this.getOrderButtonInfo.bind(this);
        this.clickBuyButton.bind(this);
        //this.searchOrders.bind(this);
        this.state = {
            OrderItems : [],
            deleted : 0,
            searched : 1,
            //total : 0.0,
        };
    }
    componentDidMount = () => {
        const {info} = this.props;
        /*const url = "http://localhost:8080/getOrderItem?id=" + info.orderId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //if(data.length === 0) return null;
                this.setState({OrderItems:data});
            });*/
        //const url = "http://localhost:8080/getAOrder?id=" + info.orderId;
        let url = BaseUrl + "getAOrder?id=" + info.orderId;//
        fetch(url)
            .then(response => response.json())
            .then(data => {
                //if(data.length === 0) return null;
                this.setState({OrderItems:data.orderItems});
            });
    }

    delOrderFromList = () => {
        const {info} = this.props;
        this.props.delOrder(info.orderId);
        alert("删除订单成功!");
    }

    getRow1Info = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let ans = "";
        if(User.type === 1){
            let {info} = this.props;
            ans = "用户" + info.userId;
        }
        else{
            let {info} = this.props;
            ans = "订单" + info.orderId;
        }
        return ans;
    }

    getOrderButtonInfo = () => {
        let ans = "";
        let User = JSON.parse(localStorage.getItem("user"));
        if(User.type === 1){
            ans = "订单详情";
        }
        else{
            let {info} = this.props;
            ans = (info.finish === 1) ? "已完成" : "去结算!";
        }
        return ans;
    }

    clickBuyButton = () => {
        let {info} = this.props;
        let user = JSON.parse(localStorage.getItem("user"));
        if(user.type === 1){
            history.push({pathname: "/buy", search: "?id=" + info.orderId});
        }
        else{
            if (info.finish !== 1) {
                history.push({pathname: "/buy", search: "?id=" + info.orderId});
            }
            else{
                alert("订单已经完成支付！");
            }
        }
    }


    render(){
        const {info} = this.props;
        if(this.state.searched === 0){
            return null;
        }
        return (
            <div className="detailinfo">
                <div className="orderrow1">
                    <div className="boxes">
                        <input type="checkbox" className="orderbox"/>
                    </div>
                    <br/>
                    <div className="imgs">
                        <span>{this.getRow1Info()}</span><br/>
                        <span>{info.date}</span>
                    </div>
                </div>

                <ul className = "order_item_list">
                    {
                        info.orderItems.map((item, index)=>{
                            return <li key = {index}>
                                <OrderRow2 info1 = {item}/>
                            </li>
                        })
                    }
                </ul>

                <div className="orderrow3">
                    <div className="orderstate">
                        {info.finish === 1 ? "已支付" : "未支付"}
                    </div>
                </div>

                <div className="orderrow4">
                    <button type="button" className="orderbutton" onClick = {this.clickBuyButton}>
                        {this.getOrderButtonInfo()}
                    </button>
                    <button type="button" className="orderbutton"
                    onClick = {this.delOrderFromList}>
                        删除订单
                    </button>

                </div>
            </div>
        );
    }
}

export default withRouter(OrderInfo);
