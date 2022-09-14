import Question from "./component/question";
import {Layout, Menu} from "antd";
import {AppstoreOutlined, FieldTimeOutlined, SolutionOutlined, UserOutlined} from "@ant-design/icons";
import React from "react";
import MyFooter from "../../components/MyFooter";
import MyHeader from "../../components/MyHeader";
import {Content} from "antd/es/layout/layout";
import Notes from "./component/notes";
import Map from "./component/map";
import Feedback from "./component/feedback";

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      current: "question",
    };
  }

  handleClick(e) {
    this.setState({current: e.key});
  }

  contentView = () => {
    switch (this.state.current) {
      case 'question':
        return <Question/>
      case 'notes':
        return <Notes/>
      case 'map':
        return <Map/>
      case 'feedback':
        return <Feedback/>
    }
  }

  render() {
    return (
      <Layout>
        <MyHeader/>
        <Content style={{padding: '0 200px', marginTop: 64, height: "auto"}}>
          <Menu mode="horizontal" selectedKeys={[this.state.current]} onClick={this.handleClick.bind(this)}>
            <Menu.Item key="question">
              <SolutionOutlined/>常见问题
            </Menu.Item>
            <Menu.Item key="notes">
              <UserOutlined/>注意事项
            </Menu.Item>
            <Menu.Item key="map">
              <AppstoreOutlined/>医院地图
            </Menu.Item>
            <Menu.Item key="feedback">
              <FieldTimeOutlined/>意见反馈
            </Menu.Item>
          </Menu>
          {this.contentView()}
        </Content>
        <MyFooter/>
      </Layout>
    );
  };
}
