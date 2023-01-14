import React from 'react'
import '../../css/INDEX.css'

export default class TimeSelect extends React.Component{
    constructor(props) {
        super(props);
        this.dataInit = this.dataInit.bind(this);
        this.state = {
            yearList: [],
            monthList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            selectYear: 2022, //选中的年份
            selectMonth: 1, //选中的月份
        }
    }
    componentDidMount() {
        this.dataInit();
        //this.props.onRef(this);
    }
    dataInit() {
        let date = new Date();
        let current_year = date.getFullYear();
        let yearList = [];
        for(let i = 0;i < 100;++i){
            let y = current_year - i;
            yearList.push(y);
        }
        this.setState({yearList : yearList});
    }
    yearChange(e) {
        let year = e.target.value;
        console.log("选中的年份是：", year);
        if (!year) return;
        this.setState({
            selectYear: year,
            selectMonth: 1,
        });
        this.props.handleYearChange(year);
        /*if (this.props.onChange) {
            this.props.onChange(new Date(`${year}/1/1 00:00:00`));
        }*/
    }

    monthChange(e) {
        let month = e.target.value;
        console.log("原来的month：", this.state.selectMonth);
        console.log("选中的月份为：", month);
        if (!month) return;
        month = parseInt(month, 10);
        //let d = new Date(this.state.selectYear, month, 0);
        //let url = "http://localhost:8080/getFirstBooks?month=" + month;
        //let url1 = "http://localhost:8080/getUserTotalPrice?month=" + month;
        this.setState({selectMonth : month});
        this.props.handleChange(month);//调用父类函数
    }

    render = () => {
        return (
            <div className = "select-time-box">
                <span>请选择时间：</span>
                <span className="item">
                    <select onChange={this.yearChange.bind(this)} className="select-time-main"
                            value={this.state.selectYear}>
                    <option className="li-item">- 年 -</option>
                        {this.state.yearList
                            ? this.state.yearList.map((item, index) => (
                                <option value={item} key={index} className="li-item">
                                    {item}年
                                </option>
                            ))
                            : ''}
                    </select>
                </span>
                <span>
                    <select id= 'select-month' onChange={this.monthChange.bind(this)}
                            className="select-time-main" value={this.state.selectMonth}>
                        <option className="li-item">- 月 -</option>
                        {this.state.monthList ? this.state.monthList.map((item, index) => (
                                <option value={item} key={index} className="li-item">
                                    {item}月
                                </option>
                            ))
                            : ''}
                    </select>
                </span>
            </div>
        );
    }
}
