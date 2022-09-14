import React from "react";
import MyHeader from '../../components/MyHeader';
import MyFooter from '../../components/MyFooter';
import {Layout,Tabs} from "antd";
import './doctorHome.css';
import MyCalendar from "./calendar";
import Diagnose from "./diagnose";
const {Content} = Layout;

const { TabPane } = Tabs;

export default class Index extends React.Component {
  render() {
    let user = JSON.parse(localStorage.getItem("user"));
    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '30px 50px', marginTop: 64, height: "auto"}}>

          <Tabs defaultActiveKey="2" centered>
            <TabPane tab="排班信息" key="1">
              <div id={'title'}>
                <center><h >{user.name}医生--排班信息</h></center>
              </div>
              <MyCalendar/>
            </TabPane>
            <TabPane tab="诊疗界面" key="2">
              <Diagnose/>
            </TabPane>
          </Tabs>
        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}
