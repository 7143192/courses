import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  useWindowDimensions, DeviceEventEmitter,
} from 'react-native';
import Down1 from '../../../../components/SelectDown1';
import sport1 from '../../../../res/sportClass1.png';
import sport2 from '../../../../res/sportClass2.jpg';
import sport4 from '../../../../res/sportClass3.jpg';
import sport3 from '../../../../res/sportClass31.jpg';
import sport5 from '../../../../res/sportClass5.jpg';
import DetailClass from '../../../../components/DetailClass';
import ClassCard from '../../../../components/ClassCard';
import BaseUrl from '../../../../utils/constants';
const type = ['减脂区', '增肌区', '瑜伽区'];
var AllData = [
  ['课程1', sport1, 5, 10, 100, 1, 5],
  ['课程2', sport2, 4, 15, 70, 2, 4],
  ['课程3', sport3, 3, 13, 80, 1, 3],
  ['课程4', sport4, 2, 12, 110, 2, 2],
  ['课程5', sport5, 1, 14, 90, 1, 5],
];

var data1 = ['腹部', '肩部', '胸部', '腿部', '手部'];
var data2 = ['低', '中', '高'];
var data3 = ['低', '中', '高'];

export default class CoursePage2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bodyPart: '',
      part: 0,
      strength: 0,
      sportLevel: 0,
      courseList: [],
    };
  }
  static times1 = 0;
  componentDidMount = () => {
    /*let url = BaseUrl + '/getAllCourses';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        this.setState({courseList: data, prevList: data});
      });*/
    this.setState({
      courseList: this.props.courseList,
      prevList: this.props.courseList,
    });
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
  Search1 = e => {
    let chosen1 = e + 1;
    let list = [];
    if (this.state.strength === 0 && this.state.sportLevel === 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[0], 10);
        if (tmp === chosen1) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.strength !== 0 && this.state.sportLevel === 0) {
      let got = parseInt(
        chosen1.toString() + this.state.strength.toString(),
        10,
      );
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(
          this.state.prevList[key].type2.toString().substring(0, 2),
          10,
        );
        if (tmp === got) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.strength === 0 && this.state.sportLevel !== 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[0], 10);
        let tmp1 = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (tmp === chosen1 && tmp1 === this.state.sportLevel) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.strength !== 0 && this.state.sportLevel !== 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[0], 10);
        let tmp0 = parseInt(this.state.prevList[key].type2.toString()[1], 10);
        let tmp1 = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (
          tmp === chosen1 &&
          tmp1 === this.state.sportLevel &&
          tmp0 === this.state.strength
        ) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    this.setState({courseList: list});
  }; //选择part后进行过滤
  Search2 = e => {
    let chosen1 = e + 1;
    let list = [];
    if (this.state.part === 0 && this.state.sportLevel === 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[1], 10);
        if (tmp === chosen1) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.part !== 0 && this.state.sportLevel === 0) {
      let got = parseInt(this.state.part.toString() + chosen1.toString(), 10);
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(
          this.state.prevList[key].type2.toString().substring(0, 2),
          10,
        );
        if (tmp === got) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.part === 0 && this.state.sportLevel !== 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[1], 10);
        let tmp1 = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (tmp === chosen1 && tmp1 === this.state.sportLevel) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.part !== 0 && this.state.sportLevel !== 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[0], 10);
        let tmp0 = parseInt(this.state.prevList[key].type2.toString()[1], 10);
        let tmp1 = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (
          tmp === this.state.part &&
          tmp1 === this.state.sportLevel &&
          tmp0 === chosen1
        ) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    this.setState({courseList: list});
  }; //选择strength后进行过滤
  Search3 = e => {
    let chosen1 = e + 1;
    let list = [];
    if (this.state.part === 0 && this.state.strength === 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (tmp === chosen1) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.part !== 0 && this.state.strength === 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[0], 10);
        let tmp1 = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (tmp === this.state.part && tmp1 === chosen1) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.part === 0 && this.state.strength !== 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[1], 10);
        let tmp1 = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (tmp1 === chosen1 && tmp === this.state.strength) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    if (this.state.part !== 0 && this.state.strength !== 0) {
      Object.keys(this.state.prevList).forEach(key => {
        let tmp = parseInt(this.state.prevList[key].type2.toString()[0], 10);
        let tmp0 = parseInt(this.state.prevList[key].type2.toString()[1], 10);
        let tmp1 = parseInt(this.state.prevList[key].type2.toString()[2], 10);
        if (
          tmp === this.state.part &&
          tmp1 === chosen1 &&
          tmp0 === this.state.strength
        ) {
          list.push(this.state.prevList[key]);
        }
      });
    }
    this.setState({courseList: list});
  }; //选择sportLevel后进行过滤
  handleNav = (e, params = null) => {
    console.log('进入了Page1的跳转函数!');
    DeviceEventEmitter.emit('JumpToCourseDetail1', {
      list: this.state.courseList,
    });
    this.props.handleNav(e, params);
  };
  handlePartChange = e => {
    console.log(data1[e]);
    this.Search1(e);
    this.setState({bodyPart: data1[e], part: e + 1});
  };
  handleStrengthChange = e => {
    console.log(e);
    console.log(data2[e]);
    this.Search2(e);
    this.setState({strength: e + 1});
  };
  handleLevelChange = e => {
    console.log(e);
    console.log(data3[e]);
    this.Search3(e);
    this.setState({sportLevel: e + 1});
  };
  _onContentSizeChange = () => {
    let Y =
      CoursePage2.times1 === 0
        ? 0
        : (this.state.courseList.length - 4) * 150 - 100;
    CoursePage2.times1++;
    this.scrollView.scrollTo({x: 0, y: Y, animated: false});
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              // marginTop: 66,
              // marginLeft: 0,
            }}>
            <Down1
              title={'训练部位'}
              data={data1}
              onChoosed={this.handlePartChange}
            />
            <Down1
              title={'训练强度'}
              data={data2}
              onChoosed={this.handleStrengthChange}
            />
            <Down1
              title={'训练难度'}
              data={data3}
              onChoosed={this.handleLevelChange}
            />
          </View>

          {this.state.courseList.map((item, index) => {
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
    // borderWidth: 2,
    // borderColor: '#050505',
    // borderRadius: 20,
    flexDirection: 'column',
    marginTop: 10,
  },
  SingleClass: {
    marginLeft: 10,
    // marginTop: 11,
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
