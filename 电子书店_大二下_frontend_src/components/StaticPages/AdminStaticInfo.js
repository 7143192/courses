import React from 'react'
import '../../css/INDEX.css'
import AdminStaticBar from "./AdminStaticBar";
import TimeSelect from "../BasicPart/TimeSelect";
import {BaseUrl} from "../../utils/constants";
import AdminUser from "./AdminUser";
import FirstBook from "./FirstBook";

class AdminStaticInfo extends React.Component{
    constructor(props) {
        super(props);
        this.getFirstBooks.bind(this);
        this.state = {
            yearList: [],
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            selectYear: 2022, //选中的年份
            selectMonth: 1, //
            firstBooks : [],
            partBooks : [],
            Users : [],
            PartUser : [],
        };
        //this.dataInit = this.dataInit.bind(this);
    }
    componentDidMount() {
        //this.dataInit();
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
        //let month = e.target.value;
        let month = e;
        console.log("已经进入父类函数！");
        //console.log("原来的month：", this.state.selectMonth);
        console.log("选中的月份为：", month);
        if (!month) return;
        month = parseInt(month, 10);
        let d = new Date(this.state.selectYear, month, 0);
        //let url = "http://localhost:8080/getFirstBooks?month=" + month;
        //let url1 = "http://localhost:8080/getUserTotalPrice?month=" + month;
        let url = BaseUrl + "getFirstBooks?month=" + month + "&year=" + this.state.selectYear;
        console.log("获取某月销量的请求为：", url);
        let url1 = BaseUrl + "getUserTotalPrice?month=" + month + "&year=" + this.state.selectYear;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let partList = [];
                let num = 0;
                Object.keys(data).forEach((key) => {
                    console.log(data[key].key.bookName);
                    console.log(data[key].value);
                    if(num !== 3){
                        partList.push(data[key]);
                        num++;
                    }
                    this.setState({firstBooks : data, selectMonth : month, partBooks : partList});
                })
            })
            .finally(fetch(url1)
                .then(response1 => response1.json())
                .then(data1 => {
                    console.log(data1);
                    let UserList = [];
                    let num = 0;
                    Object.keys(data1).forEach((key) => {
                        console.log(data1[key].key.username);
                        console.log(data1[key].value);
                        if(num !== 3){
                            UserList.push(data1[key]);
                            num++;
                        }
                        this.setState({Users : data1, PartUser : UserList});
                    })
                }));
    }

    getFirstBooks = () => {

    }

    render = () => {
        return(
            <div className = "AdminStatic">

                <TimeSelect handleChange = {this.monthChange}
                handleYearChange = {this.yearChange}/>

                <div className = "firstBooks">
                    <span className = "rexiao">图书{this.state.selectYear}年
                        {this.state.selectMonth}月热销榜</span>
                    <ul className = "books" id = "books">
                        {
                            this.state.partBooks.map((item, index)=>{
                                if(this.state.partBooks.length === 0) return null;
                                return < li key ={index}>
                                    <FirstBook info = {item} num = {index}/>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <AdminStaticBar info = {this.state.firstBooks} type = {1}/>
                <div className = "firstBooks">
                    <span className = "rexiao">{this.state.selectYear}年
                        {this.state.selectMonth}月用户消费榜</span>
                    <ul className = "books" id = "books">
                        {
                            this.state.PartUser.map((item, index)=>{
                                if(this.state.PartUser.length === 0) return null;
                                return < li key ={index}>
                                    <AdminUser info = {item} num = {index}/>
                                </li>
                            })
                        }
                    </ul>
                </div>
                <AdminStaticBar info = {this.state.Users} type = {2}/>
            </div>
        );
    }
}

export default AdminStaticInfo;
