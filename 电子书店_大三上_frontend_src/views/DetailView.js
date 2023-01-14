import React from 'react';
import '../css/BOOKDETAIL.css';
import BookDetailInfo from '../components/MainPage/BookDetailInfo';
import HeadLine from '../components/BasicPart/HeadLine';
import SideBar from '../components/BasicPart/SideBar';
import {Link, withRouter} from "react-router-dom";
import {history} from "../utils/history";
import {BaseUrl} from "../utils/constants";

class DetailView extends React.Component{
    constructor(props) {
        super(props);
        this.AddCart.bind(this);
        this.BuyImmediately.bind(this);
        this.state = {id : 0, books:null, orderId : 0};
    }
    componentDidMount(){
        //let url = "http://localhost:8080/getBook?id=";
        let url = BaseUrl + "getBook?id=";
        //const urlParams = new URL(window.location.href);
        //console.log("url:", urlParams);
        //const pathname = urlParams?.pathname;
        //console.log("pathname:", pathname);
        const result = new URLSearchParams(this.props.location.search);
        const param = result.get("id");
        console.log(param);
        url = url + param.toString();
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    id : param,
                    bookInfo : data,
                })
            }).catch(function (ex) {
                console.log('parsing failed', ex)
            })
    }

    AddCart = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        //let url = "http://localhost:8080/addCart?bookId=" + this.state.bookInfo.bookId
         //+ "&userId=" + id + "&num=1";//在购物车中刚添加时默认为1本
        let url = BaseUrl + "addCart?bookId=" + this.state.bookInfo.bookId
            + "&userId=" + id + "&num=1";//在购物车中刚添加时默认为1本
        fetch(url).then(response => response.json());
    }

    BuyImmediately = () => {
        let bookId = this.state.id;
        let user = JSON.parse(localStorage.getItem("user"));
        let userId = user.userId;
        //let url = "http://localhost:8080/buyImmediately?bookId=" + bookId + "&userId=" + userId;
        let url = BaseUrl + "buyImmediately?bookId=" + bookId + "&userId=" + userId;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("创建订单成功！");
                this.setState({orderId : data.orderId});
                history.push({pathname : "/buy", search : "?id=" + this.state.orderId});//直接跳转到购买页面
            })
    }

    render(){
        return(
            <div className = "DetailPage">
                <div className = "HeaderPart2">
                    <HeadLine username = "ThunderBoy"/>
                </div>
                <div className = "SideBarPart2">
                    <SideBar/>
                </div>
                <div className = "DetailInfoPart">
                    <BookDetailInfo info = {this.state.bookInfo}/>
                </div>
                <div className="Clear"/>
                <button type="submit" className="cartbutton" onClick = {this.AddCart}>
                    加入购物车
                </button>
                <button type="submit" className="buybutton"
                        onClick = {this.BuyImmediately}>
                    立即购买
                </button>
            </div>
        );
    }
}

export default withRouter(DetailView);
