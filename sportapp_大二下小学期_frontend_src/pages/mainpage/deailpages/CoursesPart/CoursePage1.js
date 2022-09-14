import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions, DeviceEventEmitter,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import Down from '../../../../components/SelectDown';
import sport1 from '../../../../res/sportClass1.png';
import sport2 from '../../../../res/sportClass2.jpg';
import sport4 from '../../../../res/sportClass3.jpg';
import sport3 from '../../../../res/sportClass31.jpg';
import sport5 from '../../../../res/sportClass5.jpg';
import DetailClass from '../../../../components/DetailClass';
import ClassCard from '../../../../components/ClassCard';
import storage from '../../../../utils/Storage';
import BaseUrl from '../../../../utils/constants';
import Toast from 'react-native-easy-toast';
const type = ['减脂区', '增肌区', '瑜伽区'];
var datas = ['减脂区课程', '增肌区课程', '瑜伽区课程'];
var AllData = [
  ['课程1', sport1, 5, 10, 100, 1, 5],
  ['课程2', sport2, 4, 15, 70, 2, 4],
  ['课程3', sport3, 3, 13, 80, 1, 3],
  ['课程4', sport4, 2, 12, 110, 2, 2],
  ['课程5', sport5, 1, 14, 90, 1, 5],
];

export default class CoursePage1 extends React.Component {
  static curLength1 = 0;
  static times = 0;
  constructor(props) {
    super(props);
    this.state = {
      classPart: '',
      type: 0,
      courseList: [],
      prevList: [],
      noMore: false,
    };
  }
  getList = () => {
    /*let start = CoursePage1.curLength1;
    CoursePage1.curLength1 += 4; //更新当前长度
    console.log(start);
    console.log(CoursePage1.curLength1);
    let url = BaseUrl + '/getPartCourse?cur=' + start + '&size=4';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('data=', data);
        this.setState({
          courseList: [...this.state.courseList, ...data],
          prevList: [...this.state.prevList, ...data],
        });
        this.props.handleListUpdate(data);
        //console.log('AllExerciseList=', this.state.AllExerciseList);
        if (data.length < 4) {
          this.setState({noMore: true});
        }
        if (this.state.noMore === false) {
          this.toast.show('Loading.....');
        } else {
          this.toast.show('课程列表到底啦!');
        }
      });*/
  };
  componentDidMount = () => {
    /*let url = BaseUrl + '/getAllCourses';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        storage.save({
          key: 'AllCourses', //key的名字里面不要出现下划线
          data: JSON.stringify(data),
          expires: null,
        }); //进行存储
        //console.log('data=', data);
        this.setState({courseList: data, prevList: data});
      });*/
    //console.log('courseList=', this.props.courseList);
    this.setState({
      courseList: this.props.courseList,
      prevList: this.props.courseList,
      noMore: this.props.noMore,
    });
    CoursePage1.curLength1 = 0;
    //this.getList();
  };

  handlePartSearch = e => {
    let chosen_type = e + 1;
    let list = [];
    Object.keys(this.state.prevList).forEach(key => {
      if (this.state.prevList[key].type1 === chosen_type) {
        list.push(this.state.prevList[key]);
      }
    });
    this.setState({courseList: list});
  };

  handlePartChange = e => {
    console.log(e);
    console.log(datas[e]);
    //this.setState({classPart: datas[e], type: e});
    this.handlePartSearch(e);
  };
  handleNav = (e, params = null) => {
    console.log('进入了Page1的跳转函数!');
    DeviceEventEmitter.emit('JumpToCourseDetail', {
      list: this.state.courseList,
    });
    this.props.handleNav(e, params);
  };
  handleCourseNav = (e, params = null) => {
    this.props.handleCourseNav(e, params);
  };
  onScroll = ({nativeEvent}) => {
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      1;
    if (isReachBottom) {
      this.props.getList();
    }
  };
  _onContentSizeChange = () => {
    let Y =
      CoursePage1.times === 0 ? 0 : (this.state.courseList.length - 4) * 160;
    /*if (this.props.times !== 0 && CoursePage1.times >= this.props.times) {
      Y = (this.state.courseList.length - 2) * 150 - 100;
    }*/
    if (this.state.noMore === true) Y = this.state.courseList.length * 100;
    CoursePage1.times++;
    this.scrollView.scrollTo({x: 0, y: Y, animated: false});
    //this.setState({noMore: false});
    //this.setState({firstTime: false});
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ScrollView
          style={styles.classes}
          onScroll={this.onScroll}
          ref={scrollView => (this.scrollView = scrollView)}
          onContentSizeChange={() => {
            this._onContentSizeChange();
          }}>
          <Down
            title={'选择分区'}
            data={datas}
            onChoosed={this.handlePartChange}
          />
          {this.state.courseList.map((item, index) => {
            //console.log('img=', item.img);
            return (
              <ClassCard
                handleDetailPress={() =>
                  this.handleNav('CourseDetail', {data: item})
                }
                img={item.img}
                name={item.course_name}
                level={item.course_level}
                time={item.day_time}
                style={{width: '100%', marginLeft: 0}}
                backgroundColor={{backgroundColor: 'rgba(34,34,34,0)'}}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  classes: {
    flexDirection: 'column',
    marginTop: 10,
  },
  SingleClass: {
    marginLeft: 10,
    // marginTop: -11,
    width: 340,
    height: 150,
  },
  Right: {
    marginLeft: 200,
    flex: 1,
    flexDirection: 'column',
  },
  Left: {
    flex: 1,
    flexDirection: 'column',
  },
  details: {
    fontSize: 16,
    color: '#f10c0c',
  },
  className: {
    fontSize: 16,
    color: '#1528f1',
  },
});
