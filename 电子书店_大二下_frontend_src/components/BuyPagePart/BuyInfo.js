import React from "react";
import '../../css/INDEX.css';
import {withRouter} from "react-router-dom";
import {BaseUrl} from "../../utils/constants";
import BuyDetail from "./BuyDetail";

class Address extends React.Component{
    render(){
        let User = JSON.parse(localStorage.getItem("user"));
        return (
            <div className="addresspart">
                <ul>
                    <li>
                        <div className="addrinfo">
                            <p className="p1"><b>上海交通大学闵行校区菜鸟驿站</b></p>
                            <p className="p2">{User.username} Phone:188****6511</p>
                        </div>
                        <span> > </span>
                    </li>
                </ul>
            </div>
        );
    }
}

class Service extends React.Component{
    render(){
        return (
            <div className="way">
                <ul>
                    <li>
                        <div className="servename">
                            <b>配送服务</b>
                        </div>
                        <span>
                        >
                    </span>
                        <div className="service">
                            快递：免邮
                            <br/>送运费险<br/>
                            付款后七天内到货
                        </div>

                    </li>
                </ul>
            </div>
        );
    }
}

class PayPath extends React.Component{
    render(){
        return (
            <div className="pay">
                <ul>
                    <li>
                        <div className="payway">
                            <b>支付宝支付</b>
                        </div>
                        <input type="checkbox" className="paywaybox"/>
                    </li>
                </ul>

                <ul>
                    <li>
                        <div className="payway">
                            <b>微信零钱支付</b>
                        </div>
                        <input type="checkbox" className="paywaybox"/>
                    </li>
                </ul>

                <ul>
                    <li>
                        <div className="payway">
                            <b>朋友帮我付</b>
                        </div>
                        <input type="checkbox" className="paywaybox"/>
                    </li>
                </ul>
            </div>
        );
    }
}

class BuySubmit extends React.Component{
    render(){
        return(
            <div className="submitorder">
                <table className="submittable">
                    <tr>
                        <td className="buyrow1">
                            共1件
                        </td>
                        <td className="buyrow2">
                            合计：
                            <b className="submitval">$50.00</b>
                        </td>
                        <td className="buyrow3">
                            <button type="submit" className="buysubmitbutton">
                                提交订单
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
        );
    }
}

class OtherDetail extends React.Component{
    render(){
        return (
            <div className="way">
                <ul>
                    <li>
                        <div className="servename">
                            <b>订单备注</b>
                        </div>
                        <span> > </span>
                        <div className="service">
                            无备注
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

class BuyInfo extends React.Component{
    constructor(props) {
        super(props);
        this.EndOrder.bind(this);
        this.updateBuyNum.bind(this);
        this.getPayInfo.bind(this);
        this.state = {
            orderId : 0,
            OrderItemList : [],
            total : 0.0,
            totalNum : 0,
            buttonInfo : "",
        };
    }

    componentDidMount = () => {
        const result = new URLSearchParams(this.props.location.search);
        const param = result.get("id");
        console.log(param);
        let totalPrice = 0.0;
        let nums = 0;
        //let url = "http://localhost:8080/getAOrder?id=" + param.toString();
        let url = BaseUrl + "getAOrder?id=" + param.toString();//
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let books = JSON.parse(localStorage.getItem("books"));
                Object.keys(data.orderItems).forEach((key) => {
                    nums += data.orderItems[key].buyNum;//累加购买总数量
                    Object.keys(books).forEach((key1) => {
                        if(data.orderItems[key].bookId === books[key1].bookId){
                            totalPrice += data.orderItems[key].price * data.orderItems[key].buyNum;
                        }
                    });
                });
                this.setState({
                    orderId : param,
                    OrderItemList : data.orderItems,
                    total : totalPrice,
                    totalNum : nums,
                });
            })
    }

    EndOrder = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        if(user.type === 1){
            return ;
        }
        let orderId = this.state.orderId;
        //let url = "http://localhost:8080/endOrder?id=" + orderId.toString();
        let url = BaseUrl + "endOrder?id=" + orderId.toString();
        fetch(url)
            .then(response => response.json());
        alert("订单已完成！");
    };

    updateBuyNum = (e, id, num) => {
        let orderId = this.state.orderId;
        console.log('旧的数量为:', num);
        /*let url = "http://localhost:8080/updateItemNum?id=" + id.toString()
            + "&num=" + e;
        fetch(url)
            .then(response => response.json());*/
        let totalPrice = this.state.total;
        let nums = this.state.totalNum;
        //console.log(nums);
        nums -= num;
        nums += parseInt(e);
        console.log("新的数量为:", e);
        //let url = "http://localhost:8080/updateItemNum?id=" + id.toString()
          //  + "&num=" + e;
        let url = BaseUrl + "updateItemNum?id=" + id.toString()
         + "&num=" + e;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let books = JSON.parse(localStorage.getItem("books"));
                Object.keys(books).forEach((key1) => {
                    if(data.bookId === books[key1].bookId){
                        console.log("bookId", books[key1].bookId);
                        totalPrice -= parseInt(data.price) * num;
                        console.log(totalPrice);
                        totalPrice += parseInt(data.price) * parseInt(data.buyNum);
                        console.log(totalPrice);
                    }
                    this.setState({orderId : orderId, total : totalPrice, totalNum : nums});
                });
            })
        //console.log(totalPrice);
        //this.setState({orderId : orderId, total : totalPrice, totalNum : nums});
    }

    getPayInfo = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.userId;
        const result = new URLSearchParams(this.props.location.search);
        const param = result.get("id");
        console.log(param);
        let ans = "";
        //let url = "http://localhost:8080/getAOrder?id=" + param.toString();
        let url = BaseUrl + "getAOrder?id=" + param.toString();//
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(userId === 1){
                    if(data.finish === 1) ans = "已完成!";
                    else ans = "未完成!";
                }
                else{
                    if(data.finish === 1) ans = "已完成!";
                    else ans = "现在支付";
                }
                this.setState({buttonInfo : ans});
            })
        this.setState({buttonInfo : ans});
    }

    render(){
        let user = JSON.parse(localStorage.getItem("user"));
        return (
            <div>
                <Address/>
                <ul>
                    {
                        this.state.OrderItemList.map((item, index)=>{
                            return < li key ={index}>
                                <BuyDetail info = {item} updateBuyNum = {this.updateBuyNum.bind(this)}/>
                            </li>
                        })
                    }
                </ul>
                <Service/>
                <OtherDetail/>
                <PayPath/>

                <div className="submitorder">
                    <table className="submittable">
                        <tr>
                            <td className="buyrow1">
                                共{this.state.totalNum}件
                            </td>
                            <td className="buyrow2">
                                合计：
                                <b className="submitval">￥{this.state.total}</b>
                            </td>
                            <td className="buyrow3">
                                <button type="submit" className="buysubmitbutton"
                                onClick = {this.EndOrder}>
                                    {user.type === 1 ? "" : "现在支付"}
                                </button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default withRouter(BuyInfo);
