import React from 'react'
import '../css/ORDERS.css'
import OrderInfo from '../components/OrderPage/OrderInfo'
import HeadLine from '../components/BasicPart/HeadLine';
import SideBar from '../components/BasicPart/SideBar';
import SearchBar from '../components/BasicPart/SearchBar';
import {BaseUrl} from "../utils/constants";
import OrdersList from "../components/OrderPage/OrdersList";

class OrdersView extends React.Component{
    constructor(props) {
        super(props);
        this.searchOrders.bind(this);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.state = {
            orderList:[],
            filterText : "",
        };
    }

    handleFilterTextChange(filterText) {
        /*console.log("要查找的内容是:", filterText);
        let user = JSON.parse(localStorage.getItem("user"));
        let id = user.userId;
        let url = "http://localhost:8080/getSearchedOrders?searchInfo=" + filterText
        + "&id=" + id.toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);

            })*/
        this.setState({filterText : filterText});//获取返回回来的满足查找条件的订单信息
    };

    searchOrders = () => {
        /*let input = e.target.value;//获取输入内容
        console.log("要查找的内容是:", input);
        let url = "http://localhost:8080/getSearchedOrders?searchInfo=" + input;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({orderList : data});//获取返回回来的满足查找条件的订单信息
            })*/
    }

    DeleteOrder = (id) => {
        //let url = "http://localhost:8080/delOrder?id=" + id.toString();
        //let url1 = "http://localhost:8080/getOrders?id=";
        let url = BaseUrl + "delOrder?id=" + id.toString(); //
        let url1 = BaseUrl + "getOrders?id="; //
        let User = JSON.parse(localStorage.getItem("user"));
        url1 += User.userId;
        fetch(url)
            .then(response => response.json())
            .then(
                fetch(url1)
                    .then(response => response.json())
                    .then(data => {
                        this.setState({orderList: data});
                        alert("删除订单成功！");
                    })
            )
    }

    render(){
        return (
            <div className = "OrdersPage">
                <div className = "HeaderPart">
                    <HeadLine username = "ThunderBoy"/>
                </div>
                <div className = "SideBarPart">
                    <SideBar/>
                </div>
                <div className = "detailorderpart">
                    <SearchBar filterText={this.state.filterText}
                               onFilterTextChange={this.handleFilterTextChange}/>
                    <div className="order_detail">
                        <span className="order_detail0">订单编号</span>
                        <span className="order_detail1">订单明细</span>
                        <span className="order_detail2">订单状态</span>
                        <span className="order_detail3">操作</span>
                    </div>

                    <OrdersList filterText = {this.state.filterText}/>

                </div>
            </div>
        );
    }
}

export default OrdersView;
