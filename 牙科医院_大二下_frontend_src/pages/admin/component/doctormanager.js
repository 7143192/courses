import React from "react";
import {getDoctor} from "../../../services/RegistrationServices";
import {Card, List, Descriptions, Form, Input, Button} from "antd";
import {history} from "../../../.umi/core/history";
import '../admin.css'

const {Meta} = Card
export default class Doctormanager extends React.Component {
  constructor() {
    super();
    this.state = {
      doctors: [],
      selectedDoc:null,
      chosenId : -1,
    };
  };

  formRef = React.createRef();

  componentDidMount() {
    this.setState({
      doctors: JSON.parse(localStorage.getItem("doctors")),
      selectedDoc:null,
      chosenId : -1,
      UserNameInput : 0,
      DeptInput : 0,
    })
    console.log(this.state.doctors);
  }

  handleModifyDoc = (item) => {
    this.setState({
      selectedDoc:item,
      chosenId : item.doctorId,
    })
  }

  inputUsername = () => {
    this.setState({UserNameInput : 1});
  }

  inputDept = () => {
    this.setState({DeptInput : 1});
  }

  onFinished = (values) =>{
    console.log(values);
    if(this.state.UserNameInput === 0 && this.state.DeptInput === 0){
      alert("请输入要修改的信息!");
      return ;
    }
    let url = "http://localhost:8080/updateDoctorInfo?id=";
    url += this.state.chosenId;
    if(this.state.UserNameInput === 1){
      url += "&username=";
      url += values.username;
      if(this.state.DeptInput === 1){
        url += "&title=";
        url += values.pass;
      }
    }
    else{
      if(this.state.DeptInput === 1){
        url += "&title=";
        url += values.pass;
      }
    }
    fetch(url)
      .then(response => response.json())
      .then(data => {
        alert("修改成功！");
        history.push("/admin");
        this.setState({UsernameInput : 0, DeptInput : 0,})
      })
  }

  render() {
    return (
      <div className={"admin-content"}>
        {this.state.selectedDoc === null?
          <List
            grid={{gutter: 5, column: 4}}
            dataSource={this.state.doctors}
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 16,
            }}

            renderItem={item => (
              <List.Item onClick={() => this.handleModifyDoc(item)}>
                <Card
                  hoverable
                  style={{width: 240}}
                  cover={<img alt="doctor" src={item.image} width={"100px"} height={"300px"}/>}>
                  <Meta title={item.name} description={item.deptName}/>
                </Card>
              </List.Item>
            )}
          />:
          <div>
            <Descriptions title="User Info">
              <Descriptions.Item label="UserName">{this.state.selectedDoc.name}</Descriptions.Item>
              <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
              <Descriptions.Item label="Department">{this.state.selectedDoc.deptName}</Descriptions.Item>
              <Descriptions.Item label="Remark">empty</Descriptions.Item>
            </Descriptions>
            <span style={{color:"red", marginBottom:"50px"}}>*只填写需要修改的信息</span>
            <Form
              name="wrap"
              labelCol={{ flex: '110px' }}
              labelAlign="left"
              labelWrap
              wrapperCol={{ flex: 1 }}
              colon={false}
              onFinish={this.onFinished}
              ref = {this.formRef}
            >
              <Form.Item label="username" name="username" onChange = {this.inputUsername.bind(this)}>
                <Input />
              </Form.Item>

              <Form.Item label="Title" name="pass" onChange = {this.inputDept.bind(this)}>
                <Input />
              </Form.Item>

              <Form.Item label=" ">
                <Button type="primary" htmlType="submit" >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        }
      </div>
    );
  }
}
