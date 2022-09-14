import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TouchableWithoutFeedbackBase,
  Image,
  Alert,
} from 'react-native';
import {ParallelPicker} from 'react-native-slidepicker';
import SAButton from '../../../../components/SAButton';
import VideoPlayer from 'react-native-video-controls';
import BaseUrl from '../../../../utils/constants';
import left from '../../../../res/leftArrow1.png';
import SyncStorage from '../../../../utils/syncStorage';

let time = [
  [
    {name: 5, id: 1},
    {name: 10, id: 2},
    {name: 15, id: 3},
    {name: 20, id: 4},
    {name: 25, id: 5},
    {name: 30, id: 6},
    {name: 35, id: 7},
    {name: 40, id: 8},
    {name: 45, id: 9},
  ],
];

class BackTitle extends Component {
  render() {
    // goBack
    return (
      <View>
        {/*<StatusBar*/}
        {/*  backgroundColor="transparent"*/}
        {/*  translucent={true}*/}
        {/*/>*/}
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
            onPress={this.props.handleBack}
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

class ExercisePage extends Component {
  state = {
    // 是否已经选择了时间
    selectTime: false,
    // 是否显示时间选择器
    showSelector: false,
    startExercise: false,
    pause: false,
    curTime: 0,
    curMinute: 0,
    curSecond: 0,
    setTime: 0,
  };

  counter = null;
  pickerShow = () => {
    if (this.state.startExercise) {
      return;
    } else {
      this.setState({
        selectTime: true,
        showSelector: true,
      });
    }
  };

  handleSelectEnd = () => {
    this.setState({
      showSelector: false,
      selectTime: false,
    });
  };

  setTimeEnd = res => {
    console.log('选中内容为:', res);
    this.setState({
      selectTime: true,
      showSelector: false,
      curTime: res[0].name * 60,
      curMinute: res[0].name,
      curSecond: 0,
      setTime: res[0].name,
    });
  };

  handleStartExercise = () => {
    let url =
      BaseUrl +
      '/addNewUserExercise?userId=' +
      this.props.route.params.id +
      '&exerciseId=' +
      this.props.route.params.info.exercise_id +
      '&chosenTime=' +
      this.state.setTime * 60; //这里的时间都以 秒 为单位存储在数据库中
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('新添加的跟练信息为:', data);
        this.setState({
          startExercise: true,
        });
        this.countTime();
      });
  };

  countTime = () => {
    this.counter = setInterval(() => {
      let all = this.state.curTime;
      if (all === 0) {
        this.counter && clearInterval(this.counter);
        this.handleExerciseEnd();
        return;
      } else {
        all--;
      }
      var second = all % 60;
      var minute = (all - second) / 60;
      console.log(second);
      this.setState({
        curTime: all,
        curMinute: minute,
        curSecond: second,
      });
    }, 1000);
  };

  handlePause = () => {
    const tmp = this.state.pause;
    this.setState({
      pause: !tmp,
    });
    if (tmp) {
      this.countTime();
    } else {
      clearInterval(this.counter);
    }
  };

  handleExerciseEnd = () => {
    clearInterval(this.counter); //消除间隔函数
    let total = this.state.setTime * 60;
    //console.log('total=', total);
    let left = this.state.curTime;
    //console.log('left=', left);
    let useTime = total - left;
    let url =
      BaseUrl +
      '/endUserExercise?userId=' +
      this.props.route.params.id +
      '&exerciseId=' +
      this.props.route.params.info.exercise_id +
      '&useTime=' +
      useTime;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('结束之后得到的跟练信息为:', data);
        this.setState({
          selectTime: false,
          showSelector: false,
          startExercise: false,
          pause: false,
          curTime: 0,
          curMinute: 0,
          curSecond: 0,
          setTime: 0,
        });
      });
  };

  handleUnfinishedBack = () => {
    this.handleExerciseEnd();
    this.props.navigation.goBack();
  };

  handleBack = () => {
    if (
      this.state.pause === true ||
      (this.state.startExercise === true && this.state.curTime !== 0)
    ) {
      //即判断在进行跳转的时候是否已经结束了当前的跟练
      Alert.alert(
        '提示',
        '您有课程正在进行,是否结束当前运动?',
        [
          {text: '是', onPress: () => this.handleUnfinishedBack()}, //若按下 是 ，则先结束再返回
          {text: '否', style: 'cancel'}, //若按下 否 ，则不结束也不返回
        ],
        {cancelable: false},
      );
    } else {
      this.props.navigation.goBack(); //若已经结束，则可以直接返回
    }
  };

  render() {
    const {
      selectTime,
      showSelector,
      startExercise,
      setTime,
      pause,
      curMinute,
      curSecond,
    } = this.state;
    console.log(this.props.route.params);
    return (
      <View
        style={{
          height: '100%',
        }}>
        <BackTitle
          title={this.props.route.params.info.name}
          handleBack={this.handleBack}
        />
        <View
          style={{
            height: '100%',
            alignItems: 'center',
          }}>
          <View
            style={{
              height: '30%',
              width: '100%',
              backgroundColor: '#666',
            }}>
            {/*<Video*/}
            {/*  source={require('../../../../res/loginVideo.mp4')}*/}
            {/*  style={styles.backgroundVideo}*/}
            {/*  muted={false}*/}
            {/*  repeat={true}*/}
            {/*  resizeMode={'cover'}*/}
            {/*  rate={1.0}*/}
            {/*  ignoreSilentSwitch={'obey'}*/}
            {/*/>*/}
            <VideoPlayer
              disableBack={true}
              repeat={true}
              source={{uri: this.props.route.params.info.url}}
            />
          </View>
          <View
            style={{
              height: '10%',
              padding: 10,
              width: '100%',
            }}>
            <Text style={styles.text1}>
              {this.props.route.params.info.name}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              height: '10%',
              width: '100%',
              borderBottomWidth: 1,
              borderTopWidth: 1,
              borderBottomColor: '#666',
              borderTopColor: '#666',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: '100%',
              }}>
              {selectTime ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.text1}>坚持</Text>
                  <TouchableOpacity onPress={this.pickerShow}>
                    <Text style={styles.text2}>&nbsp;{setTime}&nbsp;</Text>
                  </TouchableOpacity>
                  <Text style={styles.text1}>分钟</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={this.pickerShow}>
                  <Text style={styles.text1}>选择训练时间</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Modal
            visible={showSelector}
            animationType="slide"
            transparent={true}
            onRequestClose={this.handleSelectEnd}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
              }}>
              <ParallelPicker
                dataSource={time}
                cancel={this.handleSelectEnd}
                confirm={this.setTimeEnd}
                pickerDeep={1}
                pickerStyle={{
                  visibleNum: 3,
                  itemHeight: 60,
                  activeFontColor: '#F52D3A',
                  activeFontSize: 21,
                  normalFontColor: '#ccc',
                }}
              />
            </View>
          </Modal>
          <View
            style={{
              height: '20%',
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#36a476',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
              }}>
              <Text style={styles.countDown}>
                {selectTime
                  ? `${curMinute < 10 ? '0' + curMinute : curMinute}:${
                      curSecond < 10 ? '0' + curSecond : curSecond
                    }`
                  : '∞'}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: '20%',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            {startExercise ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <SAButton
                  onPress={this.handlePause}
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginRight: 35,
                  }}>
                  {pause ? '继续' : '暂停'}
                </SAButton>
                <SAButton
                  onPress={this.handleExerciseEnd}
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                    marginLeft: 35,
                  }}>
                  结束训练
                </SAButton>
              </View>
            ) : (
              <View>
                <SAButton
                  onPress={this.handleStartExercise}
                  disabled={!selectTime}
                  style={{
                    borderRadius: 40,
                    height: 80,
                    width: 80,
                  }}>
                  开始训练
                </SAButton>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default ExercisePage;

const styles = StyleSheet.create({
  backgroundVideo: {
    width: '100%',
    height: '100%',
  },
  text1: {
    color: '#666',
    fontSize: 20,
    fontWeight: 'bold',
  },
  text2: {
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  countDown: {
    color: '#fff',
    fontSize: 110,
    fontWeight: 'bold',
  },
  page: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    // justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    // zIndex: 10,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    backgroundColor: '#eee',
  },
  head: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
});
