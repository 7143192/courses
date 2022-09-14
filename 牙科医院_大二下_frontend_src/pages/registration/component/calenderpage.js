import React from "react";
import {history} from 'umi';
import {Calendar} from "antd";
import moment from 'moment';
import {getOrderByDoctorAndTime} from "../../../services/RegistrationServices";
import {Select} from "antd";
import {Button} from "antd";
import '../registration.css'
import {message} from "antd";
import {Option} from "antd/es/mentions";

//const {Option}=Select;
export default class CalenderPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderList: [],
      selectValue: moment('2022-05-02'),
      dateList:[],
      selectDate:-1
    }
  }

  onSelect = value => {
    this.setState({
      selectDate:-1,
      selectValue: value
    });
    console.log("选中的时间为：",this.state.selectValue)
  };

  onPanelChange = value => {
    this.setState({selectValue: value});
  };

  handleChange = (value) =>{
    /*this.setState({
      selectDate:value
    })
    console.log("选中的时间为：", this.state.selectDate);*/
    this.selected = value;
  }

  componentDidMount() {
    let orderData = [];
    /*getOrderByDoctorAndTime(history.location.state.doctorId, orderData);
    console.log("获取的排班信息:", orderData);
    this.setState({
      orderList: orderData,
    })*/
    let url = "http://localhost:8080/getDoctorOrder?id=" + history.location.state.doctorId;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        //let orderData = [];
        Object.keys(data).forEach((key) => {
          orderData.push({
            remain : data[key].orderNum,
            date : data[key].rsvTime,
          })
        })
        this.setState({orderList : orderData});
      })
  }

  handleClick = () => {
    // console.log(`you submit ${this.state.selectDate}`);
    /*if(this.state.selectDate!==-1){
      //加入registration表单 若当前医生当前时间段已经挂号 则不能挂号
      let order = {
        time: this.state.selectValue,
        state:'待就诊',
        dept:'口腔正畸科',
        doc:history.location.state.doctor
      }
      localStorage.setItem('order',  JSON.stringify(order));
      message.success('挂号成功');
      console.log(localStorage.getItem('order'));
    }
    else message.error('请选择时间')*/
    //let time = this.state.selectValue._i.toString();
    let selectedVal = this.selected ? this.selected : "2000-00-00 00:00:00余量0";
    //console.log("selectedVal = ", selectedVal);
    let time1 = selectedVal.toString().substring(0, 10);
    let time2 = selectedVal.toString().substring(11);
    //console.log("time1 = ", time1);
    //console.log("time2 = ", time2);
    let time = time1 + time2;
    console.log("选中的时间为：", time);
    let user = JSON.parse(localStorage.getItem("user"));
    let url = "http://localhost:8080/regRequest?doctorId=" + history.location.state.doctorId
      + "&patientId=" + user.patientId + "&time=" + time;
    console.log(url);
    let url1 = "http://localhost:8080/getDoctorOrder?id=" + history.location.state.doctorId;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.registerId === -2) {
          alert("余下号数量不足，无法挂号！");
        } else {
          if (data.registerId === -3) {
            alert("您在此时段内已经挂过号，无法再挂号！");
          }
          else{
            alert("挂号成功！");
          }
        }
        //history.push("/registration/doctor/calendar");
      })
      .finally(
        (url1 |> fetch)
          .then(response => response.json())
          .then(data => {
            let orderData = [];
            Object.keys(data).forEach((key) => {
              orderData.push({
                remain: data[key].orderNum,
                date: data[key].rsvTime,
              })
            })
            console.log("SUCCESS!");
            this.setState({orderList: orderData});
            console.log("RERENDER!");
            this.selectView();
          })
      )
  }

  selectView = () => {
    let select = [];
    this.state.orderList.forEach(element => {
      let dateymd = element.date.substring(0, 10);
      if (dateymd === this.state.selectValue.format('YYYY-MM-DD')) {
        select.push({
          sdate:element.date,
          sremain:element.remain
        })
      }
    })
    if (select.length === 0) return <div className={"order-select"}>当前时间无诊号</div>
    else return <div className={"order-select"}>
      <Select style={{width: 240}} onChange={this.handleChange}>
        {
          select.map((element,index)=>{
            return (
              <Select.Option value={element.sdate} key={index}>{element.sdate}余量{element.sremain}</Select.Option>
            )
          })
        }
      </Select>
      <Button onClick={this.handleClick}>预约</Button>
    </div>
  }

  render() {
    const {value} = this.state.selectValue;
    return (
      <div>
        <center>
          <h>请选择时间</h>
        </center>
        <div className="site-calendar-demo-card">
          <Calendar fullscreen={false} value={value} onSelect={this.onSelect}
                    onPanelChange={this.onPanelChange}/>
        </div>
        {this.selectView()}
      </div>
    )
  }
}
