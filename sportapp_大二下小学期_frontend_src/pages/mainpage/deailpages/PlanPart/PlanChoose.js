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
import Title from '../../../../components/Title';
import sport1 from '../../../../res/sportClass1.png';
import sport2 from '../../../../res/sportClass2.jpg';
import sport3 from '../../../../res/sportClass31.jpg';
import sport4 from '../../../../res/sportClass3.jpg';
import sport5 from '../../../../res/sportClass5.jpg';
import DetailClass from '../../../../components/DetailClass';
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

export default class PlanChoose extends React.Component {
  constructor(props) {
    super(props);
    this.state = {planList: [], noMore: false};
  }
  static PlanListLen1 = 0;
  componentDidMount = () => {
    /*let url = BaseUrl + '/getAllPlans';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({planList: data});
      });*/
    PlanChoose.PlanListLen1 = 0;
    this.getList();
  };
  getList = () => {
    let start = PlanChoose.PlanListLen1;
    PlanChoose.PlanListLen1 += 5; //更新当前长度
    console.log(start);
    console.log(PlanChoose.PlanListLen1);
    let url = BaseUrl + '/getPartPlan?cur=' + start + '&size=5';
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          planList: [...this.state.planList, ...data],
        });
        //console.log('AllExerciseList=', this.state.AllExerciseList);
        if (data.length < 5) {
          this.setState({noMore: true});
        }
        if (this.state.noMore === false) {
          this.toast.show('Loading.....');
        } else {
          this.toast.show('课程列表到底啦!');
        }
      });
  };
  onScroll = ({nativeEvent}) => {
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      1;
    if (isReachBottom) {
      this.getList();
    }
  };
  PressGoBack = () => {
    this.props.navigation.goBack();
  };
  handleNav = () => {
    this.props.navigation.push('PlanDetail');
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Title title={'选择计划'} PressGoBack={this.PressGoBack} />
        <View style={{flex: 11, flexDirection: 'column', alignItems: 'center'}}>
          <ScrollView onScroll={this.onScroll}>
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
                    this.props.navigation.navigate('PlanDetail', {
                      data: item,
                      selected: 0,
                      timeChosen: 0,
                    })
                  }
                />
              );
            })}
          </ScrollView>
        </View>
        <Toast
          ref={toast => (this.toast = toast)}
          style={{backgroundColor: 'rgba(28,148,234,0.8)'}}
          position="bottom"
          positionValue={50}
          fadeInDuration={750}
          fadeOutDuration={600}
          opacity={0.8}
          textStyle={{color: '#ffffff'}}
        />
      </View>
    );
  }
}
