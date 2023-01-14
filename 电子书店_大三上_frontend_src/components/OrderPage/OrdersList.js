import React from "react";
import {BaseUrl} from "../../utils/constants";
import OrderInfo from "./OrderInfo";

export default class OrdersList extends React.Component{
    constructor(props) {
        super(props);
        this.searchOrders.bind(this);
        this.delOneOrder.bind(this);
        //this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.state = {
            prevOrderList : [],
            orderList:[],
        };
    }
    componentDidMount = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        if(User.type !== 1){
            //let url = "http://localhost:8080/getOrders?id=";
            let url = BaseUrl + "getOrders?id=";
            url += User.userId;
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    //localStorage.setItem()
                    this.setState({orderList:data, prevOrderList : data});//获取所有的订单信息
                })
        }
        else{
            //let url = "http://localhost:8080/getAdminOrders";
            let url = BaseUrl + "getAdminOrders";
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    //localStorage.setItem()
                    this.setState({orderList:data, prevOrderList : data});//获取所有的订单信息
                })
        }
    }
    searchOrders = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let id = user.userId;
        let books = JSON.parse(localStorage.getItem("books"));
        let searchedList = [];
        if(user.type !== 1){//不是管理员
        }
        else{}
        Object.keys(this.state.prevOrderList).forEach((key) => {
            let items = this.state.prevOrderList[key].orderItems;
            let times = 0;
            Object.keys(items).forEach((key1) => {
                let name = "";
                Object.keys(books).forEach((key2) => {
                    if(books[key2].bookId === items[key1].bookId) name = books[key2].bookName;
                })
                if((name.toLowerCase().toString().indexOf(this.props.filterText.toString().toLowerCase()) >= 0)
                    && times !== 1){
                    times++;
                    searchedList.push(this.state.prevOrderList[key]);
                }
            })
        })
        this.setState({orderList: searchedList});
    }

    delOneOrder = (id) => {
        //let url = "http://localhost:8080/delOrder?id=" + id.toString();
        let url = BaseUrl + "delOrder?id=" + id.toString(); //
        fetch(url)
            .then(response => response.json());
        let oldList = this.state.orderList;
        Object.keys(oldList).forEach((key) => {
            if(oldList[key].orderId === id){
                oldList[key].finish = 2;
            }
        });
        this.setState({orderList : oldList, prevOrderList : oldList});
    }

    componentDidUpdate(preProps) {
        if(preProps.filterText !== this.props.filterText){
            this.searchOrders();
        }
    }
    render = () => {
        return(
            <div>
                <ul>
                    {
                        this.state.orderList.map((item, index)=>{
                            if(this.state.orderList.length === 0) return null;
                            if(item.orderItems.length === 0) return null;//不在考虑那些
                            // 要购买的内容已经被管理员删除的订单
                            if(item.finish !== 2){
                                return <li key = {index}>
                                    <OrderInfo info = {item} delOrder = {this.delOneOrder.bind(this)}/>
                                </li>
                            }
                            return null;
                        })
                    }
                </ul>
            </div>
        );
    }
}
