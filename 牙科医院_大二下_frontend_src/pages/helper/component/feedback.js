import React from "react";
import {Input} from "antd";
import "../helper.css"
import {Button} from "antd";

const {TextArea} = Input;
export default class Feedback extends React.Component {
  render() {
    return (
      <div className={"feedback"}>
        <TextArea rows={6} placeholder={"在这里写下您的建议..."}/>
        <Button className={"fdbutton"} type="primary" htmlType="submit">
          提交
        </Button>
      </div>
    )
  }
}
