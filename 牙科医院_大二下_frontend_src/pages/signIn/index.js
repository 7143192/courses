import React, { useState } from "react";
import MyHeader from '../../components/MyHeader';
import MyFooter from '../../components/MyFooter';
import {Layout} from "antd";
import { Form, Input, Button, Checkbox,  Select, DatePicker } from 'antd';
import './signIn.css';
const {Content} = Layout;
const { Option } = Select;
import {message} from "antd";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 16,
    },
    sm: {
      span: 6,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();
  const handleFinish = () => {
    let realName = form.getFieldValue("name");
    let userName = form.getFieldValue("nickname");
    let password = form.getFieldValue("password");
    let cardNum = form.getFieldValue("IDNumber");
    let sex = (form.getFieldValue("gender") === "male") ? "男" : "女";
    console.log(sex);
    let url = "http://localhost:8080/regNewPatient?name=" + realName + "&username=" + userName
    + "&password=" + password + "&cardNum=" + cardNum + "&sex=" + sex;
    message.success("注册成功!");
    fetch(url)
      .then(response => response.json());
  }

  //formRef = React.createRef();
  //console.log("form=", form);
  return(
    <Form {...formItemLayout} form={form} name= 'register' scrollToFirstError
    onFinish={handleFinish}>
      <Form.Item
        name="name"
        label="姓名"
        rules={[{required: true, message: '请输入姓名',},]}
      >
        <Input placeholder="input your name" />
      </Form.Item>
      <Form.Item
        name="gender"
        label="性别"
        rules={[
          {
            required: true,
            message: '请选择性别',
          },
        ]}
      >
        <Select placeholder="select your gender">
          <Option value="male">男</Option>
          <Option value="female">女</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="birth"
        label="出生日期"
        rules={[
          {
            required: true,
            message: '请选择出生年月日',
          },
        ]}
        >
        <DatePicker placeholder="select birthday"/>
      </Form.Item>
      <Form.Item
        name="IDNumber"
        label="身份证号"
        rules={[
          {
            required: true,
            pattern: '^([1-6][1-9]|50)\\d{4}(18|19|20)\\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$',
            message: '请输入正确的身份证号!',
          },
        ]}
        hasFeedback
      >
        <Input placeholder="input your ID number"
               style={{
                 width: '100%',
               }}
        />
      </Form.Item>
      <Form.Item
        name="phone"
        label="电话号码"
        rules={[
          {
            required: true,
            pattern: '^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$',
            message: '请输入正确的手机号码!',
          },
        ]}
        hasFeedback
      >
        <Input placeholder="input your phone number"
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <Form.Item
        name="nickname"
        label="用户名"
        tooltip="The name needing input when sign in"
        rules={[
          {
            required: true,
            message: '请输入用户名!',
            whitespace: true,
          },
        ]}
      >
        <Input placeholder="input your username"/>
      </Form.Item>
      <Form.Item
        name="password"
        label="设置密码"
        rules={[
          {
            required: true,
            message: '请输入密码!',
          },
        ]}
        hasFeedback
      >
        <Input.Password placeholder="input your password"/>
      </Form.Item>
      <Form.Item
        name="confirm"
        label="确认密码"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入密码以确认',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('两次输入密码不一致!'));
            },
          }),
        ]}
      >
        <Input.Password placeholder="input your password again"/>
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value ? Promise.resolve() : Promise.reject(new Error('请同意注册协议')),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          我已阅读并同意 <a href="">注册协议</a>
        </Checkbox>
      </Form.Item>
      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
      </Form.Item>
    </Form>
  )
}


export default class SignIn extends React.Component{
  render() {
    return(
      <Layout>
        <MyHeader/>
        <Content style={{padding: '0 50px', marginTop: 64, height: "auto"}}>
          <div id={'register'}>
            <RegistrationForm/>
          </div>
        </Content>
        <MyFooter/>
      </Layout>
    )
  }
}
