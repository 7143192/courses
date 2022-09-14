import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import Svg, {Circle} from 'react-native-svg';
import {SceneMap, TabView} from 'react-native-tab-view';
import SAButton from '../../../../components/SAButton';
import moment from 'moment/moment';
import share from '../../../../res/share1.png';
import storage from '../../../../utils/Storage';
import BaseUrl from '../../../../utils/constants';
import JPush from 'jpush-react-native';
import SyncStorage from '../../../../utils/syncStorage';
import BackButton from '../../../../res/leftArrow3.png';

var days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

var titles = [
  '核心训练',
  '今日休息',
  '10公里慢跑',
  '今日休息',
  '核心训练',
  '今日休息',
  '10公里慢跑',
];

var info = [
  '核心训练2轮，每轮每个动作重复20次。每轮包括：平板摸肩、超人起飞、俯卧撑。',
  '无',
  '跑前准备活动2组，加10公里慢跑',
  '无',
  '核心训练2轮，每轮每个动作重复20次。每轮包括：平板摸肩、超人起飞、俯卧撑。',
  '无',
  '跑前准备活动2组，加10公里慢跑',
];

function TabView1(props) {
  const layout = useWindowDimensions();
  const {handleNav, data, selected, handleDel} = props;
  let item_title = ['', '', '', '', '', '', ''];
  let item_info = ['', '', '', '', '', '', ''];
  let chosen = selected.toString();
  console.log('传递过来的data=', data);
  let t1 = parseInt(chosen[0], 10) - 1;
  item_title[t1] = data.items[0].item_name;
  item_info[t1] = data.items[0].description;
  let t2 = parseInt(chosen[1], 10) - 1;
  item_title[t2] = data.items[1].item_name;
  item_info[t2] = data.items[1].description;
  let t3 = parseInt(chosen[2], 10) - 1;
  item_title[t3] = data.items[2].item_name;
  item_info[t3] = data.items[2].description;
  if (data.days === 4) {
    let t4 = parseInt(chosen[3], 10) - 1;
    item_title[t4] = data.items[3].item_name;
    item_info[t4] = data.items[3].description;
  }
  const FirstRoute = () => {
    return (
      <WorkRoute
        Index={0}
        title={item_title[0]}
        info={item_info[0]}
        handleDel={handleDel}
      />
    );
  };
  const SecondRoute = () => {
    return (
      <WorkRoute
        Index={1}
        title={item_title[1]}
        info={item_info[1]}
        handleDel={handleDel}
      />
    );
  };
  const ThirdRoute = () => {
    return (
      <WorkRoute
        Index={2}
        title={item_title[2]}
        info={item_info[2]}
        handleDel={handleDel}
      />
    );
  };
  const ForthRoute = () => {
    return (
      <WorkRoute
        Index={3}
        title={item_title[3]}
        info={item_info[3]}
        handleDel={handleDel}
      />
    );
  };
  const FifthRoute = () => {
    return (
      <WorkRoute
        Index={4}
        title={item_title[4]}
        info={item_info[4]}
        handleDel={handleDel}
      />
    );
  };
  const SixthRoute = () => {
    return (
      <WorkRoute
        Index={5}
        title={item_title[5]}
        info={item_info[5]}
        handleDel={handleDel}
      />
    );
  };
  const SeventhRoute = () => {
    return (
      <WorkRoute
        Index={6}
        title={item_title[6]}
        info={item_info[6]}
        handleDel={handleDel}
      />
    );
  };
  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    forth: ForthRoute,
    fifth: FifthRoute,
    sixth: SixthRoute,
    seventh: SeventhRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '周一'},
    {key: 'second', title: '周二'},
    {key: 'third', title: '周三'},
    {key: 'forth', title: '周四'},
    {key: 'fifth', title: '周五'},
    {key: 'sixth', title: '周六'},
    {key: 'seventh', title: '周日'},
  ]);

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
    />
  );
}

const today = moment().format('dddd');
console.log('今天是：', today);
const time = '周' + today.toString().substring(2);
console.log(time);

class WorkRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      rest: false,
      correct: true,
    };
  }
  componentDidMount = () => {
    if (days[this.props.Index] === time) {
      this.setState({disabled: false, correct: true});
    } else {
      this.setState({disabled: true, correct: false});
    }
  };
  handleDel = () => {
    this.props.handleDel();
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.title1}>
            {this.props.title === '' ? '休息' : this.props.title}
          </Text>
          <Text style={styles.subTitle}>训练内容</Text>
          <Text style={styles.info}>
            {this.props.info === '' ? '今日休息' : this.props.info}
          </Text>
          <Text style={styles.subTitle}>预计时长</Text>
          <Text style={styles.info}>
            <Text>20</Text>分钟
          </Text>
          <Text style={styles.subTitle}>预计耗能</Text>
          <Text style={styles.info}>
            <Text>100</Text>千卡
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <SAButton
            style={{
              height: '40%',
              width: '33%',
              marginLeft: '4%',
              marginTop: '5%',
              borderRadius: 20,
            }}
            disabled={this.state.disabled}>
            {this.state.correct ? '开始训练' : '非本日计划'}
          </SAButton>
          <SAButton
            style={{
              height: '40%',
              width: '33%',
              marginLeft: '25%',
              marginTop: '5%',
              borderRadius: 20,
            }}
            disabled={this.state.disabled}>
            {this.state.correct ? '跟着练习' : '非本日计划'}
          </SAButton>
        </View>
        <View>
          <SAButton
            style={{
              height: '40%',
              width: '90%',
              marginLeft: '5%',
              //marginTop: '5%',
              borderRadius: 40,
            }}
            onPress={this.handleDel}>
            结束计划
          </SAButton>
        </View>
      </View>
    );
  }
}

class PlanTitle extends React.Component {
  handleGoToNoPlan = () => {
    this.props.handleGoToNoPlan();
  };
  render() {
    return (
      <View style={styles.PlanTitle}>
        <TouchableOpacity onPress={this.handleGoToNoPlan}>
          <Image source={BackButton} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#050505',
            marginRight: 5,
          }}>
          {this.props.title}
        </Text>
        <TouchableOpacity>
          <Image source={share} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default class WorkingPlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: 0.0,
      data: [],
      selected: 0,
    };
    /*let id = this.props.id;
    let url = BaseUrl + '/getAUser?id=' + id;
    console.log('url=', url);
    let url1 = BaseUrl + '/getAPlan?planId=';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('获取的用户信息为:', data);
        let planId = data.chosenPlan[0].plan_id;
        url1 += planId.toString();
      })
      .finally(data => {
        fetch(url1)
          .then(response1 => response1.json())
          .then(data1 => {
            console.log('获取的计划信息为:', data1);
            this.setState({
              data: data1,
              selected: data.chosenPlan[0].date_choose,
            });
          });
      });*/
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
  };

  PressGoBack = () => {
    this.props.navigation.goBack();
  };

  handleGoToNoPlan = () => {
    console.log('准备跳转到NoPlanPage!');
    this.props.navigation.reset({
      routes: [
        {
          name: 'Main',
          params: {pagename: 'Plan', chosen: 1}, //注意这里的pagename是tab的名字而不是那个页面对应组件的名字!QAQ
        },
      ],
    });
    //DeviceEventEmitter.emit('HaveWorkingPlan', {chosen: 1});
    //this.props.navigation.navigate('NoPlanPage');
  };

  handleEndPlanNote = () => {};

  handleDel = () => {
    let url =
      BaseUrl +
      '/delUserPlan?userId=' +
      this.props.route.params.id +
      '&planId=' +
      this.props.route.params.data.plan_id; //进行计划的删除(终止)
    console.log('delUrl=', url);
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        let url1 = BaseUrl + '/getAUser?id=' + this.props.route.params.id;
        fetch(url1, {
          headers: {
            token: SyncStorage.getValue('token'),
          },
        })
          .then(response => response.json())
          .then(data1 => {
            let num = 0;
            console.log('data1=', data1);
            let chosenPlan = data1.chosenPlan;
            console.log('获取的用户计划信息为:', chosenPlan);
            Object.keys(chosenPlan).forEach(key1 => {
              if (chosenPlan[key1].finish === 1) {
                num++;
              }
            });
            let title = '结束计划成功';
            let content =
              '尊敬的用户' +
              data1.nickname +
              ',恭喜你结束了计划:' +
              this.props.route.params.data.plan_name +
              ',这是你完成的第' +
              num +
              '个计划!';
            JPush.addLocalNotification({
              messageID: '2',
              title: title,
              content: content,
            });
            DeviceEventEmitter.emit('EndPlan', {chosen: 0});
            this.props.navigation.navigate('Main', {del: 1});
          });
      });
  };

  showConfirm = () => {
    //显示是否结束的确认框
    Alert.alert(
      '提示',
      '是否结束当前计划?',
      [
        {text: '是', onPress: () => this.handleDel()},
        {text: '否', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  handleFollow = () => {
    this.props.navigate('');
  };

  render = () => {
    this.dasharray = [Math.PI * 2 * 42];
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <PlanTitle
          title={'我的计划'}
          handleGoToNoPlan={this.handleGoToNoPlan}
        />
        <View style={styles.part2}>
          <Text>
            当前已完成&nbsp;
            <Text style={{color: '#050505', fontSize: 18}}>
              {this.state.percent * 100}%
            </Text>
            &nbsp;,继续加油!
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Svg height="100" width="100">
              <Circle
                cx="50"
                cy="50"
                r="42"
                stroke="#3d5875"
                strokeWidth="8"
                fill="transparent"
              />
              <Circle
                cx="50"
                cy="50"
                r="42"
                origin="50,50"
                rotate="-90"
                stroke="#00e0ff"
                strokeWidth="8"
                strokeLinecap="round"
                fill="transparent"
                strokeDasharray={this.dasharray}
                strokeDashoffset={this.dasharray * (1 - this.state.percent)}
              />
            </Svg>
            <Text style={{fontSize: 8}}>0%</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: '100%',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: '#00e0ff',
                }}
              />
              <Text style={{fontSize: 8, marginLeft: 5}}>已完成</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View
                style={{
                  height: 10,
                  width: 20,
                  backgroundColor: '#3d5875',
                }}
              />
              <Text style={{fontSize: 8, marginLeft: 5}}>未完成</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 6, width: '90%'}}>
          <TabView1
            data={this.props.route.params.data}
            selected={this.props.route.params.selected}
            handleDel={this.showConfirm}
          />
        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    width: '90%',
    borderBottomColor: '#050505',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  titleWord: {
    marginTop: 10,
    fontSize: 20,
    color: '#050505',
  },
  part2: {
    flex: 2,
    width: '90%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title1: {
    marginTop: 30,
    fontSize: 20,
    color: '#050505',
  },
  subTitle: {
    height: 30,
    width: 80,
    borderStyle: 'solid',
    borderBottomWidth: 4,
    borderBottomColor: '#ccc',
  },
  info: {
    fontSize: 16,
    color: '#050505',
  },
  PlanTitle: {
    flex: 1,
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
});
