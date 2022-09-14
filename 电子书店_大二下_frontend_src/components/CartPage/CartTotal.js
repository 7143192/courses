import React from 'react';
import '../../css/INDEX.css';
import {withRouter} from "react-router-dom";

class CartTotal extends React.Component{
    constructor(props) {
        super(props);
        this.MakeOrder.bind(this);
        this.delAllCart.bind(this);
        this.state = {
            total : 0.0,
        };
    }

    /*MakeOrder = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        let url = "http://localhost:8080/addOrder?id=" + id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.orderId === -1){//说明没有选择商品
                    alert("请先选择要购买的商品！");//失败提示信息
                }
                else{
                    alert("订单创建成功！");//成功提示信息
                }
            })
    }

    delAllCart = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        let url = "http://localhost:8080/delAllCart?id=" + id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("清空成功！");

            })
    }*/

    render(){
        return (
            <div className = "total">
                <div className = "rightpart">
                    <a className="total_btn"
                       id="checkout_btn" onClick = {this.MakeOrder}>
                        结&nbsp;算
                    </a>
                    <div className = "subtotal">
                        <p>
                        <span className = "cartsum">
                            总计(不计运费):
                        </span>
                            <span className="rob">
                                    <span className="sign">￥</span>
                                    <span className="cartrobnum">
                                        <b>0</b>
                                    </span>
                                </span>
                    </p>
                </div>

                <div className = "left">
                    <input type = "checkbox" className = "chooseall"
                           onClick = {'/'}/>
                        全选
                        <button className = "deleteall" type = "button"
                                onClick = {this.delAllCart}>
                            删除所有商品
                        </button>
                        <span>
                            已选择&nbsp;
                            <span className = "chosennum">
                                0
                            </span>
                            <span className = "after">
                                &nbsp;件商品
                            </span>
                        </span>
                </div>
            </div>
    </div>
        );
    }
}

export default withRouter(CartTotal);
