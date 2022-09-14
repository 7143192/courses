import React from "react";
import {Layout, Select} from "antd";
import {getQandA} from "../../../services/HelperServices";
import {Input} from "antd";
import "../helper.css"

const {Option} = Select;
const {Content} = Layout;
export default class Question extends React.Component {
  constructor() {
    super();
    this.state = {
      select: 0,
      problems: []
    }
  }

  onChange = (value) => {
    if(value===undefined)this.setState({select:0})
    else this.setState({select: value})
    console.log(this.state.select)
  }

  onSearch = (value) => {
    console.log('search:', value)
  }

  onClear = () => {
    this.setState({select: 0})
    console.log(this.state.select)
  }

  componentDidMount() {
    this.setState(
      {problems: getQandA()}
    )
  }

  selectView = () => {
    let select = [];
    this.state.problems.forEach(element => {
        select.push(
          {
            num: element.num,
            problem: element.problem
          }
        )
      }
    )
    return <Select style={{width: '100%'}}
                   showSearch
                   placeholder="Select a problem"
                   optionFilterProp="children"
                   autoClearSearchValue
                   allowClear
                   size={"large"}
                   onChange={this.onChange}
                   onSearch={this.onSearch}
                   onClear={this.onClear}
                   filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
    >
      {
        select.map((element, index) => {
          return <Option value={element.num} key={index}>{element.problem}</Option>
        })
      }
    </Select>
  }

  findAnswer = (
    num
  ) => {
    let problem = this.state.problems.find(item =>
      item.num === num
    )
    return problem.answer;
  }
  answerView = () => {
    if (this.state.select === 0)
      return <p>请选择问题</p>
    else return <div style={{marginTop:20}}>
      <h3>解答:</h3>
      <p>{this.findAnswer(this.state.select)}</p>
    </div>

  }

  render() {
    return (
        <div style={{marginTop:20}}>
          <h1 align={"center"}>常见问题解答</h1>
          <div className={'helper'}>
            {this.selectView()}
            {this.answerView()}
          </div>
        </div>
    );
  }
}
