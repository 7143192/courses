import {Card, List, Descriptions, Input, Button} from 'antd';
import React from "react";
import {getRegByDocs, registrationFinish} from "../../services/dataService";
import {getPatients} from "../../services/dataService";


export default class Diagnose extends React.Component {
  constructor() {
    super();
    this.state = {
      regs:[],
      patients:[],
      curPatient:null
    }
  }
  init() {
    const callback = (val) =>{

      // console.log(val);
      let p;
      const callback1 = (v) => {
        p = v;
        // console.log(v);
        for (let valKey = 0; valKey < val.length; ++valKey) {
          console.log(valKey);
          let tmp = this.state.patients;
          let t1 = [];
          for (let key = 0; key < v.length; ++key) {
            // console.log(valKey, key);
            if (v[key].patientId ===val[valKey].patientId)
            {

              t1 = v[key];
              // console.log(p[key])
              t1.reg = val[valKey];
              // console.log(t1)
              // t1 = Object.defineProperty(t1, "reg", {value:val[valKey]});  // 万恶之源 引起不知名错误

              break;
            }
          }

          if (t1 && t1.reg.state === 0) {
            console.log(1);
            tmp.push(t1);
            this.setState({
              patients: tmp
            })
          }
        }
        // console.log(this.state.patients);
      }
      getPatients(callback1);
    }

    getRegByDocs(JSON.parse(localStorage.getItem('user')).doctorId,callback);
  }
  componentDidMount() {
    this.init();
  }

  onSelectOne = (item) => {
    this.setState({
      curPatient: item
    })
  }
  onFinish = () => {
    registrationFinish(this.state.curPatient.reg.registerId);

    console.log(this.state.curPatient.reg.registerId)
  }
  render() {
  return(
    <div>
      <h1>请选择要诊疗的病人</h1>
        <List
        grid={{
          gutter: 16,
          column: 8,
        }}
        dataSource={this.state.patients}
        renderItem={(item) => (
          <List.Item onClick={()=>this.onSelectOne(item)}>
            <Card title={item.name}>{item.reg.rsvTime}</Card>
          </List.Item>
        )}
      />
      {this.state.curPatient !== null?<div>
        <Descriptions
        title="详细信息"
        bordered
        column={{
          xxl: 4,
          xl: 3,
          lg: 3,
          md: 3,
          sm: 2,
          xs: 1,
        }}
      >
        <Descriptions.Item label="姓名">{this.state.curPatient.name}</Descriptions.Item>
        <Descriptions.Item label="年龄">{this.state.curPatient.age}</Descriptions.Item>
        <Descriptions.Item label="性别">{this.state.curPatient.sex}</Descriptions.Item>
        <Descriptions.Item label="挂号时间">{this.state.curPatient.reg.rsvTime}</Descriptions.Item>
        <Descriptions.Item label="当前就诊状态">{this.state.curPatient.reg.state}</Descriptions.Item>
      </Descriptions>
        <h2>诊疗意见</h2>
        <Input
          placeholder="请输入诊疗意见"
          autoSize={{
            width:0.2,
            minRows: 2,
            maxRows: 6,
          }}/>
        <h2>诊疗操作</h2>
        <Button type="primary" onClick={()=>this.onFinish()}>诊疗完成</Button>
        </div>:null}
    </div>
  )
}
}


