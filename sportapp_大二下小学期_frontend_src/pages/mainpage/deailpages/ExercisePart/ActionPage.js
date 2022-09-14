import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedbackBase,
  Image,
  DeviceEventEmitter,
} from 'react-native';
import SANav from '../../../../components/SANav';
import {NavigationContext} from '@react-navigation/native';
import BaseUrl from '../../../../utils/constants';
import Toast from 'react-native-easy-toast';
import SyncStorage from '../../../../utils/syncStorage';
import left from '../../../../res/leftArrow1.png';
import storage from '../../../../utils/Storage';

let datas = [
  ['../../../res/sportClass5.jpg', '深蹲', 2345234532],
  ['../../../res/sportClass5.jpg', '靠墙站立', 56457563],
  ['../../../res/sportClass5.jpg', '俯身哑铃划船', 2321357],
  ['../../../res/sportClass5.jpg', '侧卧左侧卷腹', 5646778],
  ['../../../res/sportClass5.jpg', '侧卧右侧卷腹', 1234234],
  ['../../../res/sportClass5.jpg', '自由跳绳', 134235212],
  ['../../../res/sportClass5.jpg', '平板支撑', 134235212],
  ['../../../res/sportClass5.jpg', '卷腹', 134235212],
  ['../../../res/sportClass5.jpg', '俯卧撑', 134235212],
  ['../../../res/sportClass5.jpg', '臀桥', 134235212],
  ['../../../res/sportClass5.jpg', '波比', 134235212],
  ['../../../res/sportClass5.jpg', '跳绳', 134235212],
  ['../../../res/sportClass5.jpg', '俄罗斯转体', 134235212],
  ['../../../res/sportClass5.jpg', '简易俄罗斯转体', 134235212],
  ['../../../res/sportClass5.jpg', '西西里卷腹', 134235212],
  ['../../../res/sportClass5.jpg', '哑铃飞鸟', 134235212],
  ['../../../res/sportClass5.jpg', '哑铃对握推举', 134235212],
  ['../../../res/sportClass5.jpg', '小哑铃平地飞鸟', 134235212],
  ['../../../res/sportClass5.jpg', '哑铃侧平举', 134235212],
  ['../../../res/sportClass5.jpg', '侧向开合', 134235212],
  ['../../../res/sportClass5.jpg', '站姿小哑铃推举', 134235212],
  ['../../../res/sportClass5.jpg', '杠铃硬拉', 134235212],
  ['../../../res/sportClass5.jpg', '引体向上', 134235212],
  ['../../../res/sportClass5.jpg', '俯身哑铃臂屈伸', 134235212],
  ['../../../res/sportClass5.jpg', '哑铃复合平举', 134235212],
  ['../../../res/sportClass5.jpg', '蜘蛛俯卧撑', 134235212],
  ['../../../res/sportClass5.jpg', '靠墙俯卧撑', 134235212],
  ['../../../res/sportClass5.jpg', '箱式深蹲', 134235212],
  ['../../../res/sportClass5.jpg', '缓冲深蹲', 134235212],
  ['../../../res/sportClass5.jpg', '哑铃深蹲', 134235212],
];

class ActionList extends Component {
  render() {
    const arr = [];
    for (let i = 0; i < datas.length; i++) {
      console.log(i);
      arr.push(<Text key={i}>111</Text>);
    }
    return <View>{arr}</View>;
  }
}

class ActionInfo extends Component {
  static contextType = NavigationContext;
  goExercise = actionName => {
    console.log(actionName);
    this.context.navigate('ExercisePage', actionName);
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={{width: '50%', height: 150, ...this.props.actionStyle}}
        onPress={() =>
          this.goExercise({info: this.props.info, id: this.props.id})
        }>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
          }}
          blurRadius={3}
          source={{uri: this.props.img}}
          imageStyle={{
            opacity: 0.7,
          }}>
          <View
            style={{
              marginTop: 15,
              marginLeft: 12,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: '#ffffff',
                textShadowOffset: {width: 0, hegith: 0},
                textShadowRadius: 15,
                textShadowColor: '#000000',
              }}>
              {this.props.actionName}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: '#eeeeee',
              }}>
              {this.props.number}&nbsp;人已参与
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

class BackNav extends Component {
  static contextType = NavigationContext;
  render() {
    // goBack
    return (
      <View>
        <ImageBackground
          source={require('../../../../res/headbg.png')}
          style={{
            height: 70,
            flexDirection: 'row',
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 10,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={this.props.goBack}
            style={{width: 80, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={left}
              style={{
                width: 40,
                height: 40,
              }}
            />
          </TouchableOpacity>

          <Text style={{color: '#fff', fontSize: 20, fontWeight: 'bold'}}>
            {this.props.title}
          </Text>

          <Text
            onPress={this.props.onRightPress || function () {}}
            style={{width: 80, color: '#fff', textAlign: 'right'}}>
            {this.props.rightText}
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

class ActionPage extends Component {
  state = {
    actions: [],
    AllExerciseList: [],
    noMore: false,
  };
  params = {
    page: 1,
    pagesize: 8,
  };
  isLoading = false;
  static curLength = 0;
  totalPages = 3;
  getList = () => {
    let start = ActionPage.curLength;
    ActionPage.curLength += this.params.pagesize; //更新当前长度
    console.log(start);
    console.log(ActionPage.curLength);
    let url =
      BaseUrl +
      '/getPartExercise?cur=' +
      start +
      '&size=' +
      this.params.pagesize;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('data=', data);
        //ActionPage.curLength += data.length; //更新当前长度
        this.setState({
          AllExerciseList: [...this.state.AllExerciseList, ...data],
        });
        //console.log('AllExerciseList=', this.state.AllExerciseList);
        if (data.length < this.params.pagesize) {
          this.setState({noMore: true});
        }
        if (this.state.noMore === false) {
          this.toast.show('Loading.....');
        } else {
          this.toast.show('跟练内容到底啦!');
        }
      });
    /*let tmp = this.state.AllExerciseList.slice(start, ActionPage.curLength); //
    this.isLoading = false;
    this.setState({
      actions: [...this.state.actions, ...tmp],
    });
    console.log(tmp);*/
  };
  onScroll = ({nativeEvent}) => {
    // console.log(nativeEvent.contentSize.height);
    // console.log(nativeEvent.layoutMeasurement.height);
    // console.log(nativeEvent.contentOffset.y)
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      1;
    /*const hasMore = this.params.page < this.totalPages;
    if (isReachBottom && hasMore && !this.isLoading) {
      this.isLoading = true;
      this.params.page++;
      if (this.state.noMore === false) {
        this.toast.show('Loading.....');
      } else {
        this.toast.show('跟练内容到底啦!');
      }
      this.getList();
    }*/
    if (isReachBottom) {
      this.getList();
    }
  };

  componentDidMount() {
    /*let url = BaseUrl + '/getAllExercise';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.totalPages = data.length / 10; //每 10个 exercise写在一页里面
        this.setState({
          actions: [],
          AllExerciseList: data, //获取所有练习信息
        });
        ActionPage.curLength = 0;
        this.getList();
      });*/
    ActionPage.curLength = 0;
    this.getList();
  }

  handleGoBack = () => {
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        let data = JSON.parse(ret);
        DeviceEventEmitter.emit('HomePageGoBack', {id: data.user_id});
        this.props.navigation.goBack();
      });
  };

  render() {
    //const {actions} = this.state;
    return (
      <View
        style={{
          height: '100%',
        }}>
        <BackNav title="动作训练" goBack={this.handleGoBack} />
        <View
          style={{
            // flex: 1,
            flexDirection: 'column',
            padding: 5,
            height: '95%',
            // alignItems: 'center'
          }}>
          <TouchableOpacity
            style={{
              height: 100,
            }}
            onPress={() => {
              this.props.navigation.navigate('AllCourses');
            }}>
            <ImageBackground
              source={require('../../../../res/sportClass2.jpg')}
              imageStyle={{opacity: 0.3}}
              blurRadius={2}
              style={{
                width: '100%',
                height: '100%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  paddingRight: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginRight: 10,
                  }}>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: '#343434',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    动作库
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      color: '#888888',
                    }}>
                    KEEP EXERCISES
                  </Text>
                </View>
                <Text>></Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
          {ActionList}
          <ScrollView
            onScroll={this.onScroll}
            style={{
              marginTop: 10,
              marginBottom: 10,
            }}>
            {this.state.AllExerciseList.map((item, index) => {
              if (index % 2) {
                return null;
              } else {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      marginBottom: 5,
                    }}>
                    <ActionInfo
                      actionName={item.name}
                      number={item.join_num}
                      img={item.img}
                      info={item} //存储完整的课程信息
                      actionStyle={{marginRight: 5}}
                      id={this.props.route.params.id}
                    />
                    <ActionInfo
                      actionName={this.state.AllExerciseList[index + 1].name}
                      number={this.state.AllExerciseList[index + 1].join_num}
                      img={this.state.AllExerciseList[index + 1].img}
                      info={this.state.AllExerciseList[index + 1]} //存储完整的课程信息
                      actionStyle={{marginLeft: 5}}
                      id={this.props.route.params.id}
                    />
                  </View>
                );
              }
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

export default ActionPage;
