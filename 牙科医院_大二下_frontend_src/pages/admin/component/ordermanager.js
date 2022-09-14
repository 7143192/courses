import React from "react";
import {Button, Calendar, message, Modal} from "antd";
import {Select} from "antd";
import {getDept} from "../../../services/RegistrationServices";
import {getDoctorByDept} from "../../../services/RegistrationServices";
import {addOrder} from "../../../services/dataService";
import dayjs from "dayjs";
import moment from "moment";
import {getOrderByTime} from "../../../services/RegistrationServices";

const {Option} =Select

const order=[
  10,
  20,
  30,
  40,
  50
]

const date = dayjs();

const day = date.format("YYYY-MM-DD");//获取当天的日期

console.log(day);
const time=[
  day + " 07:00:00",
  day + " 08:00:00",
  day + " 09:00:00",
  day + " 10:00:00",
  day + " 13:00:00",
  day + " 14:00:00",
  day + " 15:00:00",
]
export default class Ordermanager extends React.Component{
  constructor() {
    super();
    this.state={
      depts:[],
      doctors:[],
      selectDate:0,
      selectDept:0,
      selectDoctor:0,
      selectNum:0,
      selectDoctorId : 0,
      isModalVisible: false,
      selectValue: moment().format("YYYY-MM-DD"),
      orderList: []
    }
  }

  handleSubmitClick=()=>{
    message.success('发放诊号成功');
    let values = {
      name:this.state.selectDoctor,
      num:this.state.selectNum,
      date:this.state.selectDate,
      id : this.state.selectDoctorId,
    }
    console.log(values);
    addOrder(values);
  }

  onSelect = value => {
    let url = "http://localhost:8080/getOrderByTime?time="
      + value.format("YYYY-MM-DD").toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let orderData = [];
        let doctors = JSON.parse(localStorage.getItem("doctors"));
        Object.keys(data).forEach((key) => {
          let name = "";
          let dept = "";
          Object.keys(doctors).forEach((key1) => {
            if(doctors[key1].doctorId === data[key].doctorId){
              name = doctors[key1].name;
              dept = doctors[key1].deptName;
            }
          })
          orderData.push(
            {
              dept:dept,
              name:name,
              remain:data[key].orderNum,
              date:data[key].rsvTime,
            }
          )
        })
        this.setState({
          selectValue: value.format("YYYY-MM-DD"),
          isModalVisible: true,
          orderList : orderData,
          //orderList: getOrderByTime(value.format("YYYY-MM-DD"))
        })
      })

  }

  handleOK = () => {
    this.setState({isModalVisible: false})
  }

  componentDidMount() {
    this.setState({
      depts:getDept()
    })
  }

  handleChangeDept=value=>{
    console.log("选择的科室为：", value);
    let url = "http://localhost:8080/getDoctorsByDept?dept=" + value.toString();
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          selectDept:value,
          doctors:data,
        })
      })

  }

  handleChangeDoctor=value=>{
    console.log(value);
    let id = 0;
    Object.keys(this.state.doctors).forEach((key) => {
      if(this.state.doctors[key].name === value) id = this.state.doctors[key].doctorId;
    })
    this.setState({
      selectDoctor: value,
      selectDoctorId : id,
    })
  }

  handleChangeDate=value=>{
    console.log("选中的日期为：", value);
    this.setState({
      selectDate: value
    })
  }

  handleChangeNum=value=>{
    this.setState({
      selectNum: value
    })
  }

  renderContent = () => {
    if (this.state.orderList.length===0) {
      return <div>当日无诊号</div>
    } else return <div>
      {
        this.state.orderList.map((element,index)=>{
          return <div key={index}>科室:{element.dept} 医生:{element.name} 余量:{element.remain} 时间:{element.date}</div>
        })
      }
    </div>
  }

  render() {

    return (
      <div className={"admin-content"}>
        <div>
          <Select style={{width: 180}} onChange={this.handleChangeDept}>
            {
              this.state.depts.map((element, index) => {
                return (
                  <Option value={element.name} key={index}>{element.name}</Option>
                )
              })
            }
          </Select>
          <Select style={{width: 180}} onChange={this.handleChangeDoctor}>
            {
              this.state.doctors.map((element, index) => {
                return (
                  <Option value={element.name} key={index}>{element.name}</Option>
                )
              })
            }
          </Select>
          <Select style={{width: 180}} onChange={this.handleChangeDate}>
            {
              time.map((element, index) => {
                return (
                  <Option value={element} key={index}>{element}</Option>
                )
              })
            }
          </Select>
          <Select style={{width: 180}} onChange={this.handleChangeNum}>
            {
              order.map((element, index) => {
                return (
                  <Option value={element} key={index}>{element}</Option>
                )
              })
            }
          </Select>
          <Button onClick = {this.handleSubmitClick.bind(this)}>
            发放诊号
          </Button>
        </div>
        <div>
          <br/>
          <center>当前诊号信息</center>
          <Calendar onSelect={this.onSelect} />
          <Modal title={this.state.selectValue} visible={this.state.isModalVisible} onOk={this.handleOK}
                 onCancel={this.handleOK}>
            {this.renderContent()}
          </Modal>
        </div>
      </div>
    );
  }
}
