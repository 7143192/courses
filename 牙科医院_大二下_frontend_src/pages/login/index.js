import React from "react";
import MyHeader from '../../components/MyHeader';
import MyFooter from '../../components/MyFooter';
import {Layout} from "antd";
import { Form, Input, Button, Checkbox,  Select } from 'antd';
import {Link} from 'umi';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import  {login} from "../../services/userService";
import  {getDoctorAndDept} from "../../services/dataService";
import {history} from "umi";
import './login.css';

const {Content} = Layout;
const { Option } = Select;

class SignInForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFinish.bind(this);
    this.onFinishFailed.bind(this);
    this.onReset.bind(this);
    this.onIdentityChange.bind(this);
    this.onClickSubmit.bind(this);
  }
  formRef = React.createRef();

  onFinish = (values) => {
    //values.preventDefault();
    console.log('Success:', values);
    console.log(values.identity);
    login(values);
    /*if(localStorage.getItem('userType') === '2')
      history.push('/doctorHome');
    else if(localStorage.getItem('userType') === '1')
      history.push('/');
    else if(localStorage.getItem('userType') === '3')
      history.push('/admin');*/
    getDoctorAndDept();
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  onReset = () => {
    this.formRef.current.resetFields();
  };

  onIdentityChange = (value) => {
    switch (value) {
      case '患者':
        this.formRef.current.setFieldsValue({
          note: 'Get well soon!',
        });
        return;

      case '医生':
        this.formRef.current.setFieldsValue({
          note: 'Welcome, doctor!',
        });
        return;

      case '管理员':
        this.formRef.current.setFieldsValue({
          note: 'Hi, administrator!',
        });
    }
  };

  onClickSubmit = e => {
    e.preventDefault();
    let data = this.formRef.current.getFieldValue("identity");
    console.log("chosen identity = ", data);
    let username = this.formRef.current.getFieldValue("username");
    console.log("input username = ", username);
    let pwd = this.formRef.current.getFieldValue("password");
    console.log("input pwd = ", pwd);
    let url = "http://localhost:8080/";
    if(data === "医生"){
      url += "checkDoctor?username=" + username + "&password=" + pwd;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          if(data.doctorId === -1){
            alert("用户名或密码错误！");
          }
          else{
            history.push('/doctorHome');
          }
        })
    }
    else{
      if(data === "患者"){
        url += "checkPatient?username=" + username + "&password=" + pwd;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if(data.patientId === -1){
              alert("用户名或密码错误！");
            }
            else{
              history.push('/');
            }
          })
      }
      else{
        url += "checkAdmin?username=" + username + "&password=" + pwd;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if(data.adminId === -1){
              alert("用户名或密码错误！");
            }
            else{
              history.push('/admin');
            }
          })
      }
    }
  }

  render() {
    return (
      <Form
        name="basic"
        labelCol={{span: 8,}}
        wrapperCol={{span: 8,}}
        initialValues={{remember: true,}}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
        ref={this.formRef}
        size={"large"}
        //onSubmitCapture={this.onClickSubmit}
      >
        <Form.Item
          name="identity"
          label="身份选择"
          rules={[{required: true,},]}
        >
          <Select
            placeholder="请选择你的身份"
            onChange={this.onIdentityChange}
            allowClear
            defaultValue={"请选择身份信息"}
          >
            <Option value="患者">患者</Option>
            <Option value="医生">医生</Option>
            <Option value="管理员">管理员</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="用户名" name="username" rules={[{required: true, message: 'Please input your username!',},]}>
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
        </Form.Item>

        <Form.Item
          label="登录密码" name="password" rules={[{required: true, message: 'Please input your password!',},]}>
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" wrapperCol={{offset: 13, span: 16,}}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 8, span: 16,}}>
          <Button htmlType="button" onClick={this.onReset} style={{width: '15%'}}>
            清空
          </Button>
          <Button type="primary" htmlType="submit" style={{width: '15%', marginLeft: '115px'}}>
            登陆
          </Button>
        </Form.Item>
        <Form.Item wrapperCol={{offset: 10, span: 10,}}>
          <span style={{color: 'gray', letterSpacing: '2px'}}>
            如果还没有账户，点此<Link to={'/signIn'}>注册</Link>
          </span>
        </Form.Item>
      </Form>
    )
  }
};

export default class Login extends React.Component{
  render() {
    return(
      <Layout>
        <MyHeader/>
        <Content style={{padding: '0 50px', marginTop: 64, height: "auto"}}>
          <div id={'loginForm'}>
            <SignInForm/>
          </div>
        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}
