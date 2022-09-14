import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
//import SvgUri from 'react-native-svg-uri';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/FontAwesome';
import menu10 from '../../res/menu_1_0.png';
import menu11 from '../../res/menu_1_1.png';
import menu20 from '../../res/menu_2_0.png';
import menu21 from '../../res/menu_2_1.png';
import menu30 from '../../res/menu_3_0.png';
import menu31 from '../../res/menu_3_1.png';
import menu40 from '../../res/menu_4_0.png';
import menu41 from '../../res/menu_4_1.png';
//import SvgData from './res/svg';
import HomePage from './deailpages/HomePart/HomePage';
import CirclePage from './deailpages/CirclePart/CirclePage';
import UserInfoPage from './deailpages/UserInfoPart/UserInfoPage';
import NoPlanPage from './deailpages/PlanPart/NoPlanPage';
import WorkingPlanPage from './deailpages/PlanPart/WorkingPlanPage';
import storage from '../../utils/Storage';
import BaseUrl from '../../utils/constants';
import moment from 'moment/moment';
import JPush from 'jpush-react-native';
import SyncStorage from '../../utils/syncStorage';
const today = moment().format('dddd');
//console.log('今天是：', today);
const time = '周' + today.toString().substring(2);
const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
//console.log(time);
const dataSource = [
  {
    icon: {name: 'home', color: '#999', size: 14},
    image: {normal: menu10, active: menu11},
    selectedIcon: {name: 'bullseye', color: '#36a476', size: 16},
    tabPage: 'Home',
    tabName: '首页',
    badge: 0,
    component: HomePage,
  },
  {
    image: {normal: menu20, active: menu21},
    icon: {name: 'circle-o-notch', color: '#999', size: 14},
    selectedIcon: {name: 'crosshairs', color: '#36a476', size: 16},
    tabPage: 'CirclePage',
    tabName: '社区',
    badge: 0,
    component: CirclePage,
  },
  {
    image: {normal: menu30, active: menu31},
    icon: {name: 'calendar-check-o', color: '#999', size: 14},
    selectedIcon: {name: 'rocket', color: '#36a476', size: 16},
    tabPage: 'Plan',
    tabName: '计划',
    badge: 0,
    component: NoPlanPage,
  },
  {
    image: {normal: menu40, active: menu41},
    icon: {name: 'user-o', color: '#999', size: 14},
    selectedIcon: {name: 'user-secret', color: '#36a476', size: 16},
    tabPage: 'My',
    tabName: '我的',
    badge: 0,
    component: UserInfoPage,
  },
];

class Index extends Component {
  state = {
    selectedTab: '',
    username: '',
    id: '',
    items: [],
    dataSource: [],
    del: 0,
    userData: [],
  };
  constructor(props) {
    super(props);
    let selectedTab = 'Home';
    if (this.props.route.params && this.props.route.params.pagename) {
      selectedTab = this.props.route.params.pagename;
    }
    this.state.selectedTab = selectedTab;
  }

  getDay = () => {
    if (time === '周一') {
      return 1;
    }
    if (time === '周二') {
      return 2;
    }
    if (time === '周三') {
      return 3;
    }
    if (time === '周四') {
      return 4;
    }
    if (time === '周五') {
      return 5;
    }
    if (time === '周六') {
      return 6;
    }
    if (time === '周日') {
      return 7;
    }
  };

  handlePlanDetailNote = () => {
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        console.log('存储信息为:', JSON.parse(ret));
        let ret1 = JSON.parse(ret);
        this.setState({userData: ret1});
        let id = ret1.user_id;
        let url = BaseUrl + '/getAUser?id=' + id;
        fetch(url, {
          headers: {
            token: SyncStorage.getValue('token'),
          },
        })
          .then(response => response.json())
          .then(data => {
            console.log('get a user 拿到的数据: ', data);
            let chosenPlan = data.chosenPlan;
            let workingPlan = [];
            if (chosenPlan !== undefined && chosenPlan.length !== 0) {
              //有计划
              Object.keys(chosenPlan).forEach(key => {
                if (chosenPlan[key].finish === 0) {
                  workingPlan.push(chosenPlan[key]);
                }
              });
              if (workingPlan.length !== 0) {
                Object.keys(workingPlan).forEach(key1 => {
                  let data0 = workingPlan[key1];
                  let url1 = BaseUrl + '/getAPlan?planId=' + data0.plan_id;
                  fetch(url1, {
                    headers: {
                      token: SyncStorage.getValue('token'),
                    },
                  })
                    .then(response => response.json())
                    .then(data1 => {
                      let chosenTime = data0.date_choose.toString();
                      let gotDay = this.getDay();
                      if (chosenTime.indexOf(gotDay.toString()) >= 0) {
                        let pos = chosenTime.indexOf(gotDay.toString());
                        let item = data1.items[pos];
                        JPush.addLocalNotification({
                          messageID: '3',
                          title: '今天您有训练计划',
                          content:
                            '尊敬的用户' +
                            this.state.userData.nickname +
                            ',您今天的训练内容为:' +
                            item.item_name,
                        });
                      }
                    });
                });
              }
            }
          });
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
  };

  componentDidMount = () => {
    JPush.init({
      appKey: 'c7f7eb0de56515f3f7613f70',
      channel: 'dev',
      production: 1,
    });
    //本地通知回调
    this.localNotificationListener = result => {
      console.log('localNotificationListener:' + JSON.stringify(result));
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    this.handlePlanDetailNote(); //检查今天是否有计划并推送
    let items = this.props.route.params;
    console.log('username=', items.username);
    this.setState({
      username: items.username,
      id: this.props.route.params.id,
      items: items,
      del: items.del,
    });
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        console.log('这是课程页面拿到的userInfo:', JSON.parse(ret));
        let data = JSON.parse(ret);
        this.setState({
          username: data.username,
          id: data.user_id,
          items: data,
          del: this.props.route.params.del,
        });
        if (data.chosenPlan !== undefined && data.chosenPlan.length === 0) {
          this.setState({dataSource: dataSource});
        } else {
          this.setState({dataSource: dataSource});
        }
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
  };

  handleNav = (e, params = null) => {
    console.log('进入了父组件的跳转函数!');
    //console.log(params);
    this.props.navigation.navigate(e, params);
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#F5FCFF'}}>
        <TabNavigator>
          {this.state.dataSource.map((v, i) => {
            return (
              <TabNavigator.Item
                key={i}
                selected={this.state.selectedTab === v.tabPage}
                title={v.tabName}
                tabStyle={stylesheet.tab}
                titleStyle={{color: '#999999', fontSize: 14}}
                selectedTitleStyle={{color: '#36a476', fontSize: 16}}
                renderIcon={() => {
                  return (
                    <Image
                      source={v.image.normal}
                      style={{width: 15, height: 14}}
                    />
                  );
                }}
                renderSelectedIcon={() => {
                  return (
                    <Image
                      source={v.image.active}
                      style={{width: 15, height: 14}}
                    />
                  );
                }}
                badgeText={v.badge}
                onPress={() => this.setState({selectedTab: v.tabPage})}>
                <v.component
                  handleNav={this.handleNav}
                  items={this.state.items}
                  id={this.state.id}
                  del={this.props.route.params.del}
                />
              </TabNavigator.Item>
            );
          })}
        </TabNavigator>
      </View>
    );
  }
}
const stylesheet = StyleSheet.create({
  tab: {
    justifyContent: 'center',
  },
  tabIcon: {
    color: '#999',
    width: 30,
    height: 30,
  },
});
export default Index;
