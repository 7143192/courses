import React from "react";
import { Card, Col, Row } from 'antd';
import './guahao.css';

class OrderItem extends React.Component{
  render = () => {
    let {info} = this.props;
    return (
      <Col span={8}>
        <Card title="2022年5月4日" bordered={false}>
          <div className={'numberCard'}>
            时间：
            {info.time}
            <br/>
            诊号状态：<span className={'stateNofinish'}>{info.regState}</span>
            <br/>
            科室：{info.dept}
            <br/>
            医生：{info.chosenDoc}
          </div>
        </Card>
      </Col>
    );
  }
}

export default class Guahao extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      orderList : [],
    }
  }
  componentDidMount = () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let url = "http://localhost:8080/patientOrders?name=" + user.name;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let List = [];//记录信息，用于更新state中的list
        Object.keys(data).forEach((key) => {
          let doctorId = data[key].doctorId;
          let doctors = JSON.parse(localStorage.getItem("doctors"));
          let doctorName = "";
          let doctorDept = "";
          let state = "";
          Object.keys(doctors).forEach((key1) => {
            if(doctors[key1].doctorId === doctorId){
              doctorName = doctors[key1].name;
              doctorDept = doctors[key1].deptName;
            }
          })
          if(data[key].state === 0) state = "待就诊";
          else{
            if(data[key].state === 1) state = "诊疗中";
            else{
              if(data[key].state === 2) state = "就诊前退号";
              else{
                if(data[key].state === 3) state = "被惩罚";
                else state = "已结束";
              }
            }
          }
          List.push({
            time : data[key].rsvTime,
            regState : state,
            dept : doctorDept,
            chosenDoc : doctorName,
          })
        })
        this.setState({orderList : List});
      })
  }


  render() {
    return(
      <div className="wrapper">
        <center><h2>挂号信息</h2></center>
        {this.state.orderList.length === 0?
          <center><h4>无</h4></center>:
          <Row gutter={16}>
            {
              this.state.orderList.map((item, index) => {
                return <OrderItem info = {item}/>
              })
            }
          </Row>
        }
      </div>
    )
  }
}
