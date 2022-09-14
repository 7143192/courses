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
  Alert,
} from 'react-native';
//import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Title from '../../../../components/Title';
var data1 = ['一', '二', '三', '四', '五', '六', '日'];
var data2 = [0, 0, 0, 0, 0, 0, 0];

const MyDatePicker = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View style={{width: '85%'}}>
        <Button
          color={'#163172'}
          onPress={showDatepicker}
          title="选择开始日期"
        />
      </View>
      <Text style={{}}>已选择: {date.toLocaleString()}</Text>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

class Box extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: 0,
      times: [],
    };
  }
  componentDidMount = () => {
    this.setState({
      times: this.props.chosen,
      chosen: 0,
    });
  };

  handleChoose = () => {
    console.log('选中的下标为：', this.props.id);
    data2[this.props.id] = 1 - this.state.chosen;
    console.log(data2[this.props.id]);
    this.setState({chosen: data2[this.props.id]});
    this.props.handleChosen(data2);
    /*console.log('选中的下标为:', this.props.id);
    let tmp = 1 - this.state.chosen;
    let list = this.state.times;
    list[this.props.id] = tmp;
    this.setState({chosen: tmp});
    this.handleChoose(list);*/
  };

  render() {
    return (
      <TouchableOpacity
        style={
          this.state.chosen === 0 ? styles.boxStyle : styles.chosenBoxStyle
        }
        activeOpacity={0.6}
        onPress={this.handleChoose}
        testID={'TimeBox'}>
        <Text
          style={{
            color: '#050505',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '10%',
          }}>
          {this.props.num}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default class PlanStart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [], //记录用户选择的星期信息
      info: [],
      days: 3,
    };
  }

  componentDidMount = () => {
    //let list = this.props.route.params.chosen;
    console.log('list=', this.props.route.params.chosen);
    data2 = [0, 0, 0, 0, 0, 0, 0];
    this.setState({selected: data2, days: this.props.route.params.days});
  };

  handleChosen = e => {
    console.log('进入父组件函数!');
    data2 = e;
    this.setState({selected: e});
  };

  PressGoBack = () => {
    let list = [0, 0, 0, 0, 0, 0, 0];
    this.setState({selected: list});
    this.props.navigation.goBack();
  };

  PressNext = () => {
    var num = 0;
    for (var i = 0; i < 7; ++i) {
      if (this.state.selected[i] === 1) {
        num++;
      }
    }
    if (num !== this.props.route.params.data.days) {
      let alertStr =
        '每周需要选择' +
        this.props.route.params.data.days.toString() +
        '天练习时间!';
      Alert.alert(alertStr);
      return;
    }
    let s = '';
    for (var i = 0; i < 7; ++i) {
      if (this.state.selected[i] === 1) {
        s += (i + 1).toString();
      }
    }
    let chosenNum = parseInt(s, 10);
    console.log('用户自己选的时间为:', chosenNum);
    this.props.navigation.push('PlanDetail', {
      data: this.props.route.params.data,
      selected: chosenNum,
      timeChosen: 1,
    });
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Title title={'选择时间'} PressGoBack={this.PressGoBack} />
        <View style={styles.part1}>
          <View style={styles.view1}>
            <Text style={{color: '#050505', fontSize: 18}}>选择运动时间</Text>
            <Text style={{}}>
              (注:
              <Text>尽量选择不连续的{this.props.route.params.data.days}天</Text>
              )
            </Text>
            <Text style={{}}>
              本计划将持续&nbsp;&nbsp;
              <Text style={{fontSize: 18, color: '#050505'}}>10</Text>
              &nbsp;&nbsp;天
            </Text>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: '15%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              {data1.map((item, index) => {
                return (
                  <Box
                    num={item}
                    id={index}
                    handleChosen={this.handleChosen}
                    chosen={this.props.route.params.chosen}
                  />
                );
              })}
            </View>
          </View>
          <MyDatePicker />
        </View>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.8}
          onPress={this.PressNext}>
          <Text
            style={{
              color: '#ffffff',
              width: '100%',
              fontSize: 19,
              textAlign: 'center',
            }}>
            下一步
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  part1: {
    backgroundColor: '#ffffff',
    flex: 11,
    flexDirection: 'column',
    alignItems: 'center',
  },
  view1: {
    backgroundColor: '#eeeaea',
    width: '85%',
    height: '30%',
    alignItems: 'center',
    marginTop: '25%',
    flexDirection: 'column',
  },
  boxStyle: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#050505',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chosenBoxStyle: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#050505',
    borderRadius: 10,
    backgroundColor: '#40c68d',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: '#36a476',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
});
