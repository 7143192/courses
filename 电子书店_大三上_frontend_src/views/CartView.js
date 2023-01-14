import React from 'react';
import CartInfo from '../components/CartPage/CartProduct';
import HeadLine from '../components/BasicPart/HeadLine';
import SideBar from '../components/BasicPart/SideBar';
import {history} from "../utils/history";
import '../css/CART.css';
import {withRouter} from "react-router-dom";
import {BaseUrl} from "../utils/constants";

class CartView extends React.Component{
    constructor(props) {
        super(props);
        //this.ClickChooseAll.bind(this);
        this.state = {
            cartList : [],
            chooseAll : 0,
        }
    }

    ClickChooseAll = () => {
        console.log("全选！");
        let user = JSON.parse(localStorage.getItem("user"));
        let id = user.userId;
        //let ans = [];
        //let url = "http://localhost:8080/chooseAll?id=" + id.toString();
        let url = BaseUrl + 'chooseAll?id=' + id.toString(); //
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({cartList : data, chooseAll : 1 - this.state.chooseAll});
                //e = data;
                if(localStorage.getItem("chosenAll") === null)
                    localStorage.setItem("chosenAll", JSON.stringify(data));
                localStorage.removeItem("chosenAll");
                localStorage.setItem("chosenAll", JSON.stringify(data));
                //return e;
                //console.log(this.state.cartList);
                //console.log(this.state.chooseAll);
            })
    }

    SaveOrder = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        //let url = "http://localhost:8080/addOrder?id=" + id;
        //let url1 = "http://localhost:8080/getCart?id=" + User.userId;
        let url = BaseUrl + "addOrder?id=" + id;
        let url1 = BaseUrl + "getCart?id=" + User.userId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.orderId === -1){//说明没有选择商品
                    alert("请先选择要购买的商品！");//失败提示信息
                }
            })
            .finally(
                fetch(url1)
                    .then(response1 => response1.json())
                    .then(data1 => {
                        localStorage.setItem("deletedCart", JSON.stringify(data1));
                        //this.setState({cartList : data1});
                        alert("订单创建成功！");
                    })
            )
    }

    /*Add = (id, num) => {
        let url = "http://localhost:8080/updateNum?id=" + id + "&num=" + num;
        fetch(url).then(response => response.json())
            .then(data => {
                let user = JSON.parse(localStorage.getItem("user"));
                let url1 = "http://localhost:8080/getCart?id=" + user.userId;
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({cartList : data1});
                    })
            })
    }*/

    Sub = () => {

    }

    render = () => {
        return (
            <div className = "CartPage">
                <div className = "HeaderPart1">
                    <HeadLine username =  "ThunderBoy"/>
                </div>
                <div className = "SideBarPart1">
                    <SideBar/>
                </div>
                <ul className = "shopping_title">
                    <li className="f1">
                        <input type = "checkbox" name = "全选"/>
                        全选
                    </li>
                    <li className = "f2">商品信息</li>
                    <li className = "f3">单价（元）</li>
                    <li className = "f4">数量</li>
                    <li className = "f4">金额（元）</li>
                    <li className = "f5">操作</li>
                </ul>

                <CartInfo chooseAll = {this.ClickChooseAll.bind(this)} AllChosen = {this.state.chooseAll}
                cartItems = {this.state.cartList} deleteOrder = {this.SaveOrder.bind(this)}/>

            </div>
        );
    }
}

export default withRouter(CartView);
