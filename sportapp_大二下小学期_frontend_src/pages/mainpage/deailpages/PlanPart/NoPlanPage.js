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
  DeviceEventEmitter,
} from 'react-native';
import SAButton from '../../../../components/SAButton';
import sport1 from '../../../../res/sportClass1.png';
import sport2 from '../../../../res/sportClass2.jpg';
import sport3 from '../../../../res/sportClass31.jpg';
import sport4 from '../../../../res/sportClass3.jpg';
import sport5 from '../../../../res/sportClass5.jpg';
import DetailClass from '../../../../components/DetailClass';
import storage from '../../../../utils/Storage';
import BaseUrl from '../../../../utils/constants';
import Toast from 'react-native-easy-toast';
import SyncStorage from '../../../../utils/syncStorage';
var AllData = [
  ['计划1', sport1, 5, 10, 100, 1, 5],
  ['计划2', sport2, 4, 15, 70, 2, 4],
  ['计划3', sport3, 3, 13, 80, 1, 3],
  ['计划4', sport4, 2, 12, 110, 2, 2],
  ['计划5', sport5, 1, 14, 90, 1, 5],
];
var MessageBarAlert = require('react-native-message-bar').MessageBar;
var MessageBarManager = require('react-native-message-bar').MessageBarManager;
export default class NoPlanPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planList: [],
      data: [],
      selected: [],
      chosen: 0,
      noMore: false,
      id: 0,
    };
  }
  static PlanListLen = 0;
  handlePageInitOrReInit = () => {
    let url = BaseUrl + '/getAllPlans';
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        let list = [];
        let i = 0;
        Object.keys(data).forEach(key => {
          if (i < 5) {
            list.push(data[key]);
            i++;
          }
        });
        this.setState({planList: list});
      });
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        console.log('存储信息为:', JSON.parse(ret));
        let ret1 = JSON.parse(ret);
        let id = ret1.user_id;
        console.log('id=', id);
        this.setState({id: id});
        let url1 = BaseUrl + '/getAUser?id=' + id;
        fetch(url1, {
          headers: {
            token: SyncStorage.getValue('token'),
          },
        })
          .then(response => response.json())
          .then(data => {
            let plans = data.chosenPlan;
            console.log('用户已经选择的计划信息为:', plans);
            let list = [];
            if (plans === undefined || plans.length === 0) {
              this.setState({chosen: 0});
            } else {
              Object.keys(plans).forEach(key => {
                if (plans[key].finish === 0) {
                  list.push(plans[key]);
                }
              });
              let working;
              if (list.length === 0) {
                this.setState({chosen: 0});
              } //全部计划已经结束
              else {
                Object.keys(list).forEach(key1 => {
                  working = list[key1];
                });
                let url2 = BaseUrl + '/getAPlan?planId=' + working.plan_id;
                fetch(url2, {
                  headers: {
                    token: SyncStorage.getValue('token'),
                  },
                })
                  .then(response => response.json())
                  .then(data1 => {
                    this.setState({
                      data: data1,
                      selected: working.date_choose,
                      chosen: 1,
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
    //let id = this.props.id;
  };
  componentDidMount() {
    MessageBarManager.registerMessageBar(this.refs.alert);
    this.handlePageInitOrReInit();
    DeviceEventEmitter.addListener('EndPlan', e => {
      this.setState({chosen: e.chosen});
    });
    /*DeviceEventEmitter.addListener('HaveWorkingPlan', e => {
      this.setState({chosen: e.chosen});
      console.log('开始处理HaveWorkingPlan的emit！');
      this.handlePageInitOrReInit();
    });*/
  }
  componentWillUnmount = () => {
    MessageBarManager.unregisterMessageBar();
    DeviceEventEmitter.removeAllListeners();
  };

  ShowTopAlert = () => {
    MessageBarManager.showAlert({
      title: 'Your alert title goes here',
      message: 'Your alert message goes here',
      alertType: 'success',
      // See Properties section for full customization
      // Or check `index.ios.js` or `index.android.js` for a complete example
    });
  };

  handleNav = (e, params = null) => {
    this.props.handleNav(e, params);
  };
  MakePlanPress = () => {
    if (this.state.chosen === 0) {
      this.props.handleNav('PlanChoose');
    } else {
      this.props.handleNav('WorkingPlanPage', {
        data: this.state.data,
        selected: this.state.selected,
        id: this.state.id,
      });
    }
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <View style={styles.title}>
          <Text style={styles.titleWord}>我的计划</Text>
        </View>
        <View style={styles.part2}>
          <View>
            <Text style={{color: '#ccc', fontSize: 20}}>
              {this.state.chosen === 0
                ? '您暂时还没有进行中的计划!'
                : '您有一个进行中的计划:'}
            </Text>
            <Text style={{color: '#071d46', fontSize: 20}}>
              {this.state.chosen === 0 ? '' : this.state.data.plan_name}
            </Text>
          </View>
          <SAButton
            style={{
              height: '40%',
              width: '80%',
              borderRadius: 20,
              marginTop: 10,
            }}
            onPress={this.MakePlanPress}>
            {this.state.chosen === 0 ? '制定计划' : '查看进度'}
          </SAButton>
        </View>
        <View style={{flex: 8}}>
          <ScrollView>
            {this.state.planList.map((item, index) => {
              return (
                <DetailClass
                  name={item.plan_name}
                  img={item.img}
                  level={item.plan_level}
                  time={item.day_time}
                  num={10}
                  type={item[5]}
                  star={item.stars}
                  key={index}
                  handleNav={() =>
                    //timeChosen设置为0表示还没有选择自定义时间，按照默认显示计划表,为1则按照用户选择时间显示
                    //selected用于表示最终选择的时间，为0表示还没选择
                    this.handleNav('PlanDetail', {
                      data: item,
                      timeChosen: 0,
                      selected: 0,
                    })
                  }
                />
              );
            })}
          </ScrollView>
        </View>
        <MessageBarAlert ref="alert" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    width: '90%',
    borderBottomColor: '#050505',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleWord: {
    marginTop: 30,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#050505',
  },
  part2: {
    flex: 2,
    width: '90%',
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
