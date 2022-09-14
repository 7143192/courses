import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import sport from '../../../../res/sportClass2.jpg';
import left from '../../../../res/leftArrow1.png';
import share from '../../../../res/share.png';
import SAButton from '../../../../components/SAButton';
import storage from '../../../../utils/Storage';
import BaseUrl from '../../../../utils/constants';
import JPush from 'jpush-react-native';
import SyncStorage from '../../../../utils/syncStorage';

var datas = [
  ['周一', '1公里慢跑', 0],
  ['周二', '休息', 1],
  ['周三', '腿部练习', 0],
  ['周四', '休息', 1],
  ['周五', '核心力量练习', 0],
  ['周六', '休息', 1],
  ['周日', '1公里慢跑', 0],
];

class TimeLine extends React.Component {
  render() {
    return (
      <View style={this.props.rest ? styles.style1 : styles.style2}>
        <View style={styles.time1}>
          <Text
            style={{
              color: '#050505',
              fontSize: 17,
              marginLeft: '20%',
              marginTop: 10,
            }}>
            {this.props.time}
          </Text>
        </View>
        <View style={styles.text}>
          <Text
            style={{
              color: '#050505',
              fontSize: 17,
              marginLeft: '20%',
              marginTop: 10,
            }}>
            {this.props.info === '' ? '休息' : this.props.info}
          </Text>
        </View>
      </View>
    );
  }
}

class TimeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selected: [], items: []};
  }
  componentDidMount = () => {
    let chosen = this.props.selected;
    let data = this.props.data;
    let times = [0, 0, 0, 0, 0, 0, 0];
    let items = ['', '', '', '', '', '', ''];
    console.log('chosen:', chosen);
    console.log('TimeLine:', data);
    let s = chosen.toString();
    let t1 = parseInt(s[0], 10) - 1;
    times[t1] = 1;
    items[t1] = data.items[0].item_name;
    let t2 = parseInt(s[1], 10) - 1;
    times[t2] = 1;
    items[t2] = data.items[1].item_name;
    let t3 = parseInt(s[2], 10) - 1;
    times[t3] = 1;
    items[t3] = data.items[2].item_name;
    if (data.days === 4) {
      let t4 = parseInt(s[3], 10) - 1;
      times[t4] = 1;
      items[t4] = data.items[3].item_name;
    }
    this.setState({selected: times, items: items}); //设为1位索引加1表示对应的星期被选中
  };
  render() {
    return this.state.selected.map((item, index) => {
      return (
        <View style={{height: '10%', width: '90%'}}>
          <TimeLine
            time={datas[index][0]}
            info={this.state.items[index]}
            rest={datas[index][2]}
          />
        </View>
      );
    });
  }
}

export default class PlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeChosen: 0,
      info: [],
      selected: 0,
    };
  }
  componentDidMount = () => {
    JPush.init({
      //初始化JPush
      appKey: 'c7f7eb0de56515f3f7613f70',
      channel: 'dev',
      production: 1,
    });
    //本地通知回调
    this.localNotificationListener = result => {
      console.log('localNotificationListener:' + JSON.stringify(result));
    };
    JPush.addLocalNotificationListener(this.localNotificationListener);
    let items = this.props.route.params;
    //console.log('items.data = ', items.data);
    let s = 0;
    if (
      this.props.route.params.data.days === 3 &&
      this.props.route.params.timeChosen === 0
    ) {
      s = 135;
    } else {
      if (
        this.props.route.params.data.days === 4 &&
        this.props.route.params.timeChosen === 0
      ) {
        s = 1357;
      } else {
        s = this.props.route.params.selected;
      }
    }
    this.setState({
      info: items.data,
      timeChosen: this.props.route.params.timeChosen,
      selected: s,
    });
  };

  handleSelect = () => {
    let selected = this.props.route.params.selected;
    let s = 0;
    if (selected === 0 && this.props.route.params.data.days === 3) {
      s = 135;
    } else {
      if (selected === 0 && this.props.route.params.data.days === 4) {
        s = 1357;
      }
      if (selected !== 0) {
        s = selected;
      }
    }
    return s;
  };
  handleGoBack = () => {
    this.props.navigation.goBack();
  };
  handleButtonPress = () => {
    this.props.navigation.push('WorkingPlanPage');
  };
  getDest = () => {
    if (this.props.route.params.selected === 0) {
      return 'PlanStart';
    }
    return 'WorkingPlanPage';
  };
  getButtonWord = () => {
    if (this.props.route.params.selected === 0) {
      return '选择时间';
    }
    return '使用计划';
  };
  handleMakePlanNote = nickname => {
    let planName = this.props.route.params.data.plan_name;
    let chosen = this.props.route.params.selected;
    let ans = '';
    let s = chosen.toString();
    ans += datas[parseInt(s[0], 10) - 1][0] + ',';
    ans += datas[parseInt(s[1], 10) - 1][0] + ',';
    ans += datas[parseInt(s[2], 10) - 1][0];
    if (s.length === 4) {
      ans += ',';
      ans += datas[parseInt(s[3], 10) - 1][0];
    }
    let days = this.props.route.params.data.days;
    let title = '创建计划成功';
    let content =
      '尊敬的用户' +
      nickname +
      ',您成功创建了计划:' +
      planName +
      ',计划周练' +
      days +
      '天,' +
      '要坚持锻炼哦!';
    JPush.addLocalNotification({
      messageID: '1',
      title: title,
      content: content,
      //extras: {key1: 'value1', key2: 'value2'}, // extra 字段 就是我们需要传递的参数
    });
  };
  handleNextButtonPress = () => {
    if (this.props.route.params.selected !== 0) {
      storage
        .load({
          key: 'userInfo',
          autoSync: true,
          syncInBackground: true,
        })
        .then(ret => {
          //console.log('存储信息为:', JSON.parse(ret));
          this.handleMakePlanNote(JSON.parse(ret).nickname);
          let url =
            BaseUrl +
            '/addUserPlan?userId=' +
            JSON.parse(ret).user_id +
            '&planId=' +
            this.props.route.params.data.plan_id +
            '&chooseTime=' +
            this.props.route.params.selected;
          fetch(url, {
            headers: {
              token: SyncStorage.getValue('token'),
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log('保存成功!');
              console.log('userPlan=', data);
              this.props.navigation.navigate(this.getDest(), {
                data: this.props.route.params.data,
                selected: this.props.route.params.selected,
                id: data.user_id,
              });
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
    }
    let chosenTime = [0, 0, 0, 0, 0, 0, 0];
    this.props.navigation.navigate(this.getDest(), {
      data: this.props.route.params.data,
      selected: this.props.route.params.selected,
      chosen: chosenTime,
    });
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ImageBackground
          source={{uri: this.state.info.img}}
          style={{flex: 3, flexDirection: 'column'}}
          imageStyle={{opacity: 0.7}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 15,
              paddingLeft: 10,
              paddingRight: 10,
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity onPress={this.handleGoBack}>
              <Image
                source={left}
                style={{width: 40, height: 40}}
                testID={'backImage'}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={share} style={{width: 40, height: 40}} />
            </TouchableOpacity>
          </View>
          <View
            style={{flexDirection: 'column', marginTop: '30%', marginLeft: 20}}>
            <Text style={{color: '#ffffff', fontSize: 26}}>
              {this.state.info.plan_name}
            </Text>
            <Text style={{color: '#ffffff', fontSize: 15}}>
              <Text>2022-06-25</Text>&nbsp;-&nbsp;<Text>2022-07-05</Text>
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 7, flexDirection: 'column', padding: 5}}>
          <View
            style={{
              height: 30,
              width: 90,
              borderBottomColor: '#ccc',
              borderBottomWidth: 4,
              borderStyle: 'solid',
              marginLeft: '5%',
            }}>
            <Text style={{color: '#050505'}}>周计划预览</Text>
          </View>
          <View style={{marginTop: 5, height: '90%', alignItems: 'center'}}>
            <TimeTable
              data={this.props.route.params.data}
              selected={this.handleSelect()}
            />
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
            }}>
            <SAButton
              style={{
                marginTop: -50,
                height: 60,
                width: '90%',
                borderRadius: 30,
              }}
              onPress={this.handleNextButtonPress}>
              {this.getButtonWord()}
            </SAButton>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  time1: {
    borderRightWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'solid',
    flex: 2,
  },
  text: {
    flex: 6,
  },
  style1: {
    width: '100%',
    height: 50,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    backgroundColor: '#ffffff',
  },
  style2: {
    width: '100%',
    height: 50,
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderStyle: 'solid',
    borderBottomColor: '#ccc',
    backgroundColor: 'rgba(28,148,234,0.8)',
  },
});
