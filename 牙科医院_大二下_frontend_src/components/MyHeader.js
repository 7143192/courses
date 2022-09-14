import React from "react";
import {Breadcrumb, Col, Layout, Row,Popconfirm} from "antd";
import {EditFilled, HomeFilled, ToolFilled } from "@ant-design/icons";
import {Link} from 'umi';
import './header.css';
import {history} from "umi";

const {Header} = Layout;

export default class Index extends React.Component {

  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    localStorage.removeItem('order');
    localStorage.removeItem('readable');
  }
  handleRead = () => {
    localStorage.setItem('readable', "1");
    history.push('/')
  }

  handleReadOut = () => {
    localStorage.removeItem('readable');
    history.push('/')
  }

  confirm = () => {
    history.push("/login");
  }

  render() {
    return (
      <Header id={'myHeader'}>
        {/*<Breadcrumb style={{margin: '16px 0'}}>*/}
        {/*  <Breadcrumb.Item href="">*/}
        {/*    ><HomeOutlined/><span>Home</span>*/}
        {/*  </Breadcrumb.Item>*/}
        {/*</Breadcrumb>*/}
        <div id={'Logo'}>
          <Link to={'/'}>
            <div style={{width: "auto", float: 'left'}}>
              <img id={'logo'} src={require('../asserts/MainImg/icon_home.png')} alt={""}/>
              <h id={'name'}>上海市东川路牙科医院</h>
            </div>
          </Link>

          <div style={{float: 'right'}} id={'headBar'}>
            <ul id={'myUl'}>

              {localStorage.getItem('readable') === null ?
                <li onClick={()=>this.handleRead()}>
                  辅助朗读  <ToolFilled/>
                </li>:
                <li onClick={()=>this.handleReadOut()}>
                  退出辅助朗读<ToolFilled/>
                </li>
              }


              {localStorage.getItem('user') === null ?
                <li>
                  <Link to={'/login'}>
                    <div className={'Div'}>
                      登录<HomeFilled style={{marginLeft: '10px'}}/>
                    </div>
                  </Link>
                </li>:
                <li>
                  <Popconfirm style={{float:'right'}} title="确定退出？" okText="是" cancelText="否" onConfirm={()=>this.confirm()} >


                    <Link to={'/'} onClick={()=>this.handleLogout()}>
                      <div className={'Div'}>
                        退出登录<EditFilled style={{marginLeft: '10px'}}/>
                      </div>
                    </Link>
                  </Popconfirm>
                </li>}

            </ul>
          </div>
        </div>

      </Header>

    )
  }
}
