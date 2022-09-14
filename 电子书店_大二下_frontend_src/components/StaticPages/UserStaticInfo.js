import React from 'react';
import '../../css/INDEX.css';
import UserStaticBar from "./UserStaticBar";
import TimeSelect from "../BasicPart/TimeSelect";
import {BaseUrl} from "../../utils/constants";

class UserStaticInfo extends React.Component{
    constructor(props) {
        super(props);
        //this.getFirstBooks.bind(this);
        this.state = {
            yearList: [],
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            selectYear: 2022, //选中的年份
            selectMonth: 1, //选中的月份
            TotalBuyNum : 0,
            TotalBuyPrice : 0,
            TotalPairs : [],
        };
    }
    componentDidMount() {
    }
    yearChange = (e) => {
        let year = e;
        console.log("选中的年份是：", year);
        if (!year) return;
        this.setState({
            selectYear: year,
            selectMonth: 1,
        });
    }

    monthChange = (e) => {
        console.log("已经进入父类函数!");
        //let month = e.target.value;
        let month = e;
        let user = JSON.parse(localStorage.getItem("user"));
        let id = user.userId;
        console.log(id);
        console.log("原来的month：", this.state.selectMonth);
        console.log("选中的月份为：", month);
        if (!month) return;
        month = parseInt(month, 10);
        //let url = "http://localhost:8080/CountUserBuy?month=" + month + "&id=" + id;
        let url = BaseUrl + "CountUserBuy?month=" + month + "&id=" + id + "&year=" + this.state.selectYear;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let totalNum = 0;
                let totalPrice = 0;
                Object.keys(data).forEach((key) => {
                    totalNum += data[key].value;
                    totalPrice += data[key].key.nowPrice * data[key].value;
                })
                this.setState({
                    TotalPairs : data,
                    TotalBuyNum : totalNum,
                    TotalBuyPrice : totalPrice,
                    selectMonth : month,
                });
            })
    }

    render = () => {
        let user = JSON.parse(localStorage.getItem("user"));
        return (
            <div className = "AdminStatic">

                <TimeSelect handleChange = {this.monthChange}
                handleYearChange = {this.yearChange}/>

                <div className = "UserTotalInfo">
                    <h2 className = "userLine1">尊敬的用户{user.username}:</h2>
                    <br/>
                    <h3 className = "userLine2">您在{this.state.selectYear}年{this.state.selectMonth}月
                        共购买&nbsp;
                        <p className = "totalBuyNum1">{this.state.TotalBuyNum}</p>
                        &nbsp;本书;总计消费&nbsp;
                        <p className = "totalBuyNum1">{this.state.TotalBuyPrice}</p>
                        &nbsp;元!</h3>
                </div>
                <UserStaticBar info1 = {this.state.TotalPairs} info2 = {this.state.TotalBuyNum}
                info3 = {this.state.TotalBuyPrice}/>
            </div>
        );
    }
}

export default UserStaticInfo;
