import React from "react";
import {Layout, BackTop} from 'antd';
import {Card, Col, Row} from 'antd';
import {RightOutlined} from '@ant-design/icons';
import {Link} from 'umi';
import dept1 from '../asserts/MainImg/dep_1.jpg';
import dept2 from '../asserts/MainImg/dep_2.jpg';
import dept3 from '../asserts/MainImg/dep_3.jpg';
import dept4 from '../asserts/MainImg/dep_4.jpg';
import doc1 from '../asserts/MainImg/doc_1.jpg';
import doc2 from '../asserts/MainImg/doc_2.jpg';
import doc3 from '../asserts/MainImg/doc_3.jpg';
import doc4 from '../asserts/MainImg/doc_4.jpg';
import './MainPage.css';

const {Content} = Layout;
let docImg = [doc1, doc2, doc3, doc4];
let Imgs = [dept1, dept2, dept3, dept4];
let title = ["主任医师", "副主任医师", "主治医师", "医师"];
function voice(str){
  let url = "http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=5&text=" + encodeURI(str);
  let n = new Audio(url);
  n.src = url;
  n.play();
}
function reader(ss){
  if (localStorage.getItem('readable') === null)
    return;
  if (speechSynthesis.pending)
    speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(ss);
  speechSynthesis.speak(utterance);
}

class ShowPic extends React.Component {
  render() {
    return (
      <div id={'showPic'}>
        <img id={'mainPage'} src={require('../asserts/MainImg/homepage.jpg')} alt={""}/>
      </div>
    )
  }
}

class Guide extends React.Component {
  render() {
    return (
      <div id={'Guide'}>
        <p id={'guideTitle'} onMouseEnter={()=>{reader(document.elementFromPoint(event.clientX,event.clientY).innerHTML);}}>就医指南</p>
        <div className="site-card-wrapper">
          <Row gutter={16}>
            <Col span={6}>
              <Link to={'/patient'}>
                <Card title="信息查询" bordered={false} hoverable={true}>
                  <img className={'funcImg'} src={require('../asserts/MainImg/func_1.png')} alt={""}/>
                  <span className={'funcWord'} onMouseEnter={()=>{reader(document.elementFromPoint(event.clientX,event.clientY).innerHTML);}}>查询个人信息</span>
                </Card>
              </Link>
            </Col>
            <Col span={6}>
              <Link to={'/registration'}>
                <Card title="挂号预约" bordered={false} hoverable={true}>
                  <img className={'funcImg'} src={require('../asserts/MainImg/func_2.png')} alt={""}/>
                  <span className={'funcWord'} onMouseEnter={()=>{reader(document.elementFromPoint(event.clientX,event.clientY).innerHTML);}}>网上预约挂号</span>
                </Card>
              </Link>
            </Col>
            <Col span={6}>
              <Link to={'/location'}>
                <Card title="来院路线" bordered={false} hoverable={true}>
                  <img className={'funcImg'} src={require('../asserts/MainImg/func_3.png')} alt={""}/>
                  <span className={'funcWord'} onMouseEnter={()=>{reader(document.elementFromPoint(event.clientX,event.clientY).innerHTML);}}>线上来院导航</span>
                </Card>
              </Link>
            </Col>
            <Col span={6}>
              <Link to={'/question'}>
                <Card title="帮助中心" bordered={false} hoverable={true}>
                  <img className={'funcImg'} src={require('../asserts/MainImg/func_4.png')} alt={""}/>
                  <span className={'funcWord'} onMouseEnter={()=>{reader(document.elementFromPoint(event.clientX,event.clientY).innerHTML);}}>常见问题解答</span>
                </Card>
              </Link>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

class DepartItem extends React.Component{
  constructor(props) {
    super(props);
    this.getNameInfo.bind(this);
    this.getImgInfo.bind(this);
  }
  getNameInfo = () => {
    if(this.props.num % 2 === 0) return "paragraph fl_r";
    return "paragraph fl_l";
  }
  getImgInfo = () => {
    if(this.props.num % 2 === 1) return "paragraph fl_r";
    return "paragraph fl_l";
  }
  render = () => {
    return (
      <div className={"picAndWord"}>
        <div className={this.getImgInfo()}>
          <img src={Imgs[this.props.num]} alt={""} height = "350px" width = "600px"/>
        </div>
        <div className={this.getNameInfo()}>
          <h3>{this.props.info.deptName}</h3>
          <p>
            {this.props.info.description}
              <Link to={'./depart'}>
                <span className={'toMore'}><RightOutlined />查看更多</span>
              </Link>
          </p>
        </div>
      </div>
    );
  }
}

class Depart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departments : [],
    }
  }
  componentDidMount = () => {
    let url = "http://localhost:8080/getDepartments";
    let num = 0;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let newList = [];
        Object.keys(data).forEach((key) => {
          if(num !== 4){
            num++;
            newList.push(data[key]);
          }
        })
        console.log(newList);
        this.setState({departments : newList});
      })
  }

  render() {
    return (
      <div id={'Departs'}>
        <h2 id={'depart'}>科室介绍</h2>

        <div className={"picAndWord"}>
          {this.state.departments.map((item, index) => {
            return <div>
              <DepartItem info = {item} num = {index}/>
            </div>
          })}
        </div>
      </div>
    )
  }
}

class SingleDoc extends React.Component{
  render = () => {
    return (
      <Col span={6}>
        <Link to={'/'}>
          <Card title={this.props.info.deptName + title[this.props.num]} bordered={false}>
            <img className={'docImg'} src={docImg[this.props.num]} alt={""}/>
            <div className={'fl_r docWordDiv'}>
              <p>
                <span className={'docName'}>{this.props.info.name}</span>
                <br/>
                顶尖医学人才
                <br/>
                著名医科大学毕业
                <br/>
                专业知识丰富
              </p>
            </div>
          </Card>
        </Link>
      </Col>
    );
  }
}

class Doctors extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      doctors : [],
      partDoctors : [],
    }
  }
  componentDidMount = () => {
    let url = "http://localhost:8080/getDoctors";
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let num = 0;
        let part = [];
        Object.keys(data).forEach((key) => {
          if(num !== 4){
            num++;
            part.push(data[key]);
          }
        })
        this.setState({doctors : data, partDoctors : part});
      })
  }

  render() {
    return(
      <div id={'div1'}>
        <h2 id={'doctors'}>主治医师介绍</h2>
        <Row>
          <Col span={24}>
            <Link to={''}>
              <Card title={'东川路牙科医院院长'} bordered={true} >
                <div id={'div2'}>
                  <img id={'docImgYZ'} src={require('../asserts/MainImg/yuanzhang.png')} alt={""}/>
                  <div id={'docWordDivYZ'} className={'fl_r'}>
                    <p>
                      <span id={'docNameYZ'}>臧滨雨</span>
                      <br/>
                      个人简介
                      主任医师，教授，上海交通大学医学院附属第九人民医院口腔综合科主任，博士学位，博士研究生导师。2005-2006年为美国密歇根大学
                      牙医学院访问学者。曾获“医苑新星”“启明星”人才培养计划。
                      <br/>
                      社会任职
                      中华口腔医学会全科口腔医学专委会副主任委员
                      上海市口腔医学会全科口腔医学专业委员会主任委员
                      <br/>
                      科研成果
                      已发表论文100余篇，其中SCI收录论文17篇。
                      主编和参编《现代根管治疗学》、《老年口腔医学》、《保存牙科学》、《口腔医学（综合）精选模拟习题集》等11部专著。
                      作为主要负责人获国家自然科学基金1项，市局级以上课题8项。在九院口腔综合科工作二十年，具备口腔全科广角与微创诊疗技术，为
                      患者提供个性化最优诊疗方案。
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </Col>
        </Row>
        <div style={{marginTop: '15px'}}>
          <Row gutter={8}>
            {this.state.partDoctors.map((item, index) => {
              return <SingleDoc info = {item} num = {index}/>
            })}
          </Row>
        </div>
      </div>
    )
  }
}
class Sidebar extends React.Component{
  render() {
    return(
      <div id={'sideBar'}>
        <div className={'piece'}>
          <a href={'#Guide'}>就医指南</a>
        </div>
        <div className={'piece'}>
          <a href={'#Departs'}>科室介绍</a>
        </div>
        <div className={'piece'}>
          <a href={'#div1'}>医生介绍</a>
        </div>
      </div>
    )
  }
}
export default class MainPage extends React.Component {
  render() {
    return (
      <Content style={{padding: '0 50px', marginTop: 64, height: "auto"}}>
        <ShowPic/>
        <Guide/>
        <hr className={'myHr'}/>
        <Depart/>
        <Doctors/>
        <Sidebar/>
      </Content>
    )
  }
}
