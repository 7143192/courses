import React from 'react';
import '../../css/INDEX.css';
import {withRouter} from "react-router-dom";
import {BaseUrl, WsUrl} from "../../utils/constants";

class CartProduct extends React.Component{
    constructor(props){
        super(props);
        const {info} = this.props;
        this.updateChosen.bind(this);
        this.AddCount.bind(this);
        this.SubCount.bind(this);
        this.DelCart.bind(this);
        this.getBookInfo.bind(this);
        this.getACart.bind(this);
        //console.log("Cart Item Chosen : ",info.chosen);
        this.state = {
            image : "",
            nowPrice : 0,
            bookAuthor : "",
            bookName : "",
            num : 0,
            maxNum : 0,
            chosen : info.chosen,
        }
    }

    componentDidMount = () => {
        this.props.onRef(this);
        const {info} = this.props;
        console.log("left carts:", info.cartId);
        let books = JSON.parse(localStorage.getItem("books"));
        Object.keys(books).forEach((key) => {
            //console.log(books[key].storeNum);
            if(books[key].bookId === info.bookId){
                this.setState({
                    image : books[key].image,
                    nowPrice : books[key].nowPrice,
                    bookAuthor : books[key].bookAuthor,
                    bookName : books[key].bookName,
                    num : info.buyNum,
                    maxNum : books[key].storeNum,
                    chosen : info.chosen,
                });
            }
        });
    }

    updateChosen = () => {
        let a = this.state.chosen;
        const {info} = this.props;
        let id = info.cartId;
        //let url = "http://localhost:8080/updateChosen?id=" + id.toString();
        let url = BaseUrl + "updateChosen?id=" + id.toString();//
        fetch(url).then(response => response.json());
        info.chosen = 1 - info.chosen;
        this.setState({chosen : (1 - a)});
    }

    AddCount = () => {
        let {info} = this.props;
        let id = info.cartId;
        let Num = info.buyNum;
        Num++;
        if(Num > this.state.maxNum){
            alert("待购买数量超过该书籍的库存量！");
            return ;
        }
        /*let url = "http://localhost:8080/updateNum?id=" + id + "&num=" + Num;
        fetch(url).then(response => response.json());
        this.setState({
            num : Num,
        })*/
        this.props.Add(id, Num);
    }

    SubCount = () => {
        const {info} = this.props;
        let id = info.cartId;
        let Num = info.buyNum;
        Num--;
        if(Num === 0){
            //let Url = "http://localhost:8080/delCart?id=" + id;
            let Url = BaseUrl + "delCart?id=" + id;//
            fetch(Url).then(response => response.json());
            this.setState({
                num : 0,
            })
            return ;
        }
        /*let url = "http://localhost:8080/updateNum?id=" + id + "&num=" + Num;
        fetch(url).then(response => response.json());
        this.setState({
            num : Num,
        })*/
        this.props.Del(id, Num);
    }

    DelCart = () => {
        const {info} = this.props;
        let id = info.cartId;
        //let Url = "http://localhost:8080/delCart?id=" + id;
        let Url = BaseUrl + "delCart?id=" + id;
        fetch(Url).then(response => response.json());
        this.setState({
            num : 0,
        })
    }

    getBookInfo = () => {
        const {info} = this.props;
        let book;
        let books = JSON.parse(localStorage.getItem("books"));
        Object.keys(books).forEach((key) => {
            if(info.bookId === books[key].bookId){
                book = books[key];
            }
        });
        return book;
    }

    getACart = () => {
        let {info} = this.props;
        let id = info.cartId;
        let cartItem;
        //let url = "http://localhost:8080/getACart?id=" + id;
        let url = BaseUrl + "getACart?id=" + id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                cartItem = data.buyNum;
                console.log(cartItem);
                return cartItem;
            });
        //return cartItem.buyNum;
    }

    render(){
        const {info} = this.props;
        if(this.state.num === 0){
            return null;
        }
        return(
            <div className="cartproducts">
                <table className="carttable">
                    <tr>
                        <td className="row1">
                            <input type="checkbox" className="productbox"
                                   checked={info.chosen === 1 /*|| this.props.allChosen === 1*/}
                                   defaultChecked={info.chosen === 1}
                                   onClick={this.updateChosen}/>
                        </td>
                        <td className="row2">
                            <img alt="cartbook1" src = {this.getBookInfo().image} height="120px" width="96px"/>
                        </td>
                        <td className="row3">
                            <div className="cartbookname">
                                <a href={'/'} className="nameref">{this.getBookInfo().bookName}</a>
                            </div>
                            <br/>
                                <div className="cartbookauthor">
                                    作者：{this.getBookInfo().bookAuthor}
                                </div>
                        </td>
                        <td className="row4">
                            <div className="cartprice">
                                <span className="rob">
                                    <span className="sign">￥</span>
                                    <span className="cartrobnum">
                                        <b>{this.getBookInfo().nowPrice}</b>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td className="row5">
                            <span className="amount" data-value="1">
                                <a title="商品数量减1" href={void(0)}
                                   onClick={this.SubCount}>
                                    -
                                </a>
                                <input data-value={info.buyNum} value={info.buyNum}
                                       type="text" title="商品数量文本输入框"/>
                                <a title="商品数量加1" href={void(0)}
                                   onClick={this.AddCount}>
                                    +
                                </a>
                            </span>
                        </td>
                        <td className="row6">
                            <div className="totalprice">
                                <span className="rob">
                                    <span className="sign">￥</span>
                                    <span className="cartrobnum">
                                        <b>{(this.getBookInfo().nowPrice) * (info.buyNum)}</b>
                                    </span>
                                </span>
                            </div>
                        </td>
                        <td className="row7">
                            <button className="options" type="button">
                                添加到收藏
                            </button>
                            <button className="options" type="button"
                                    onClick={this.DelCart}>
                                删除此商品
                            </button>
                        </td>
                    </tr>
                </table>
            </div>
    );
    }
}

let socket;

class CartInfo extends React.Component
{
    constructor(props) {
        super(props);
        this.countNum.bind(this);
        this.MakeOrder.bind(this);
        this.delAllCart.bind(this);
        this.chooseAll.bind(this);
        this.MakeOrder1.bind(this);
        //this.countTotal.bind(this);
        this.state = {
            cartList : [],
            chosenNum : 0,
            total : 0.0,
            cleared:0,
            allChosen : 0,
        }
    }
    componentDidMount = () => {
        //let user = JSON.parse(localStorage.getItem("user"));
        //console.log(user.userId);
        this.time_count = 0;
        let User = JSON.parse(localStorage.getItem("user"));
        //let url = "http://localhost:8080/getCart?id=" + User.userId;
        let url = BaseUrl + "getCart?id=" + User.userId;
        //let data = [];
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                localStorage.setItem("carts", JSON.stringify(data));
                this.setState({cartList:data});
            })
    }

    countNum = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        //let url = "http://localhost:8080/getCart?id=" + User.userId;
        let url = BaseUrl + "getCart?id=" + User.userId;//
        let num = 0;
        let totalPrice = 0.0;
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                Object.keys(data).forEach((key) => {
                    let books = JSON.parse(localStorage.getItem("books"));
                    let price = 0.0;
                    Object.keys(books).forEach((key1) => {
                        if(books[key1].bookId === data[key].bookId){
                            price = books[key1].nowPrice;
                        }
                    })
                    if(data[key].chosen === 1){
                        num += data[key].buyNum;
                        totalPrice += data[key].buyNum * price;
                    }
                });
            })
        this.setState({chosenNum : num, total : totalPrice});
    }

    MakeOrder = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        //let url = BaseUrl + "addOrder?id=" + id;
        let url = BaseUrl + "KafkaAddOrder?id=" + id;
        let url1 = BaseUrl + "getCart?id=" + id.toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if(data.orderId === -1){//说明没有选择商品
                    alert("请先选择要购买的商品！");//失败提示信息
                }
                else{
                    fetch(url1)
                        .then(response1 => response1.json())
                        .then(data1 => {
                            console.log("重新获取购物车内容！");
                            console.log(data1);
                            alert("订单创建成功！");//成功提示信息
                            this.setState({cartList : data1});//重绘
                        })

                }
            });
    }

    delAllCart = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        //let url = "http://localhost:8080/delAllCart?id=" + id;
        let url = BaseUrl + "delAllCart?id=" + id;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                alert("清空成功！");
                this.setState({cleared:1});
            })
    }

    chooseAll = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        let id = user.userId;
        //let url = "http://localhost:8080/chooseAll?id=" + id.toString();
        let url = BaseUrl + "chooseAll?id=" + id.toString();
        let data1 = [];
        //let url1 = "http://localhost:8080/getCart?id=" + id.toString();
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data1 = JSON.stringify(data);
                this.setState({cartList : JSON.parse(data1)});
                //console.log(this.state.cartList);
            })
        /*console.log("进入子组件的函数");
        //let data = this.props.chooseAll;
        let data = [];
        try{
            this.props.chooseAll();
        }finally {
            data = JSON.parse(localStorage.getItem("chosenAll"));
            console.log(data);
        }
        this.setState({cartList : data, allChosen : 1 - this.state.allChosen});*/
    }

    Add = (id, num) => {
        //let url = "http://localhost:8080/updateNum?id=" + id + "&num=" + num;
        let url = BaseUrl + "updateNum?id=" + id + "&num=" + num;//
        fetch(url).then(response => response.json())
            .then(data => {
                let user = JSON.parse(localStorage.getItem("user"));
                //let url1 = "http://localhost:8080/getCart?id=" + user.userId;
                let url1 = BaseUrl + "getCart?id=" + user.userId;//
                fetch(url1)
                    .then(response => response.json())
                    .then(data1 => {
                        this.setState({cartList : data1});
                    })
            })
    }

    checkSuccess = (max) => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        console.log("max=", max);
        let url2 = BaseUrl + "getCart?id=" + id;
        let url1 = BaseUrl + "getAOrder?id=" + max;
        fetch(url1)
            .then(response1 => response1.json())
            .then(data1 => {
                if(data1.orderId === -1) {
                    alert("订单正在处理...");
                }
                else {
                    fetch(url2)
                        .then(response2 => response2.json())
                        .then(data2 => {
                            console.log("重新获取购物车内容！");
                            console.log(data2);
                            alert("订单处理完成！");//成功提示信息
                            //若订单已经创建成功，则更新购物车状态,并删除计时器
                            clearInterval(this.timer);
                            this.setState({cartList : data2});//重绘
                        })
                }
            })
        //return 1;
    }

    ShowMakeOrderRes = (message) => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        if(message === "Done") {
            alert("订单处理成功!!!!!");
            let url2 = BaseUrl + "getCart?id=" + id;
            fetch(url2)
                .then(response2 => response2.json())
                .then(data2 => {
                    console.log("重新获取购物车内容！");
                    console.log(data2);
                    //alert("订单处理完成！");//成功提示信息
                    //若订单已经创建成功，则更新购物车状态,并删除计时器
                    //clearInterval(this.timer);
                    this.setState({cartList : data2});//重绘
                })
        }
        if(message === "Error") {
            alert("订单处理失败!");
        }
        this.closeSocket();
    }

    OnOpen = () => {
        console.log('ws链接已经确立!');
    }

    OnMessage = (msg) => {
        let serverMsg = "收到ws服务端信息：" + msg.data;
        console.log(serverMsg);
        //发现消息进入,开始处理前端触发逻辑
        this.ShowMakeOrderRes(msg.data);
    }

    OnClose = () => {
        console.log("ws连接已经断开!");
    }

    OnError = () => {
        console.log("ws连接出现异常!");
    }

    OpenSocket = () => {
        if (typeof (WebSocket) == "undefined") {
            alert("您的浏览器不支持WebSocket");
        } else {
            if (socket != null) {
                return;
            }
            //实现化WebSocket对象，指定要连接的服务器地址与端口建立连接
            let User = JSON.parse(localStorage.getItem("user"));
            let userId = User.userId;
            let socketUrl = WsUrl + "getMakeOrderRes/" + userId;
            console.log(socketUrl);
            socket = new WebSocket(socketUrl);
            //打开事件
            socket.onopen = this.OnOpen;
            //获得消息事件
            socket.onmessage = ((msg) => this.OnMessage(msg));
            //关闭事件
            socket.onclose = this.OnClose;
            //发生了错误事件
            socket.onerror = this.OnError;
        }
    }

    closeSocket = () => {
        if (socket === undefined || socket === null) {
            alert("请先连接");
            return;
        }
        socket.close();
        socket = null;
    }

    MakeOrder1 = () => {
        let User = JSON.parse(localStorage.getItem("user"));
        let id = User.userId;
        //let url0 = BaseUrl + "getLastOrder";
        //let cur_max = 0;
        let url1 = BaseUrl + "KafkaAddOrder?id=" + id;
        this.OpenSocket();//先打开新的ws连接
        fetch(url1);//在发送用于创建订单的请求.
        //let url2 = BaseUrl + "getCart?id=" + id.toString();
        /*fetch(url0)
            .then(response0 => response0.json())
            .then(data => {
                cur_max = data.orderId;//记录未创建新订单之前的最大订单编号
                cur_max++;
                //添加计时器来每过一个固定的时间来检查一次订单是否创建成功
                this.timer = setInterval(() => this.checkSuccess(cur_max), 500);
                fetch(url1);
                //setInterval(this.checkSuccess(cur_max), 500);
            })*/

    }

    render = () => {
        return (
            <div className = "Products">
                <ul>
                    {
                        this.state.cartList.map((item)=>{
                            if(this.state.cleared === 1){
                                return null;
                            }
                            return < li>
                                <CartProduct info = {item} onRef={(ref)=>this.child1 = ref}
                                Add = {this.Add.bind(this)}
                                Del = {this.Add.bind(this)}/>
                            </li>
                        })
                    }
                </ul>

                <div className = "total">
                    <div className = "rightpart">
                        <a className="total_btn"
                           id="checkout_btn" onClick = {this.MakeOrder1}>
                            结&nbsp;算
                        </a>

                        <div className = "left">
                            <input type = "checkbox" className = "chooseall"
                            onClick = {this.chooseAll}/>
                            全选
                            <button className = "deleteall" type = "button"
                                    onClick = {this.delAllCart}>
                                删除所有商品
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(CartInfo);
