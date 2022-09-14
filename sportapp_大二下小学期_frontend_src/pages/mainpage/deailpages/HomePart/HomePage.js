import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';
import sport1 from '../../../../res/sportClass1.png';
import sport2 from '../../../../res/sportClass2.jpg';
import sport3 from '../../../../res/sportClass3.jpg';
import sport4 from '../../../../res/sportClass31.jpg';
import allCourses from '../../../../res/all_courses.png';
import followingPractice from '../../../../res/following_practice.png';
import run from '../../../../res/run.png';
import sport5 from '../../../../res/sportClass5.jpg';
import star from '../../../../res/star.png';
import Stars from '../../../../components/Stars';
import SvgUri from 'react-native-svg-uri';
import ClassCard from '../../../../components/ClassCard';
import BaseUrl from '../../../../utils/constants';
import SyncStorage from '../../../../utils/syncStorage';

let datas = [
  [sport1, '快速塑性练习', 5, '所有人'],
  [sport2, '腹肌撕裂者进阶', 4, '所有人'],
  [sport3, '高能燃脂跑步计划', 3, '所有人'],
  [sport4, '快速塑性练习', 2, '所有人'],
  [sport1, '腹肌撕裂者进阶', 5, '所有人'],
];

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
      dis: 0,
      time: 0,
      courseList: [], //用于记录推荐的所有课程信息
    };
  }
  GetRandomCourses = id => {
    let url = BaseUrl + '/recommendUserCourse?id=' + id;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        // console.log('获取的推荐课程为:', data);
        this.setState({courseList: data});
      });
  };
  componentDidMount = () => {
    this.GetRandomCourses(this.props.id);
    DeviceEventEmitter.addListener('HomePageGoBack', e => {
      console.log('e=' + e);
      this.GetRandomCourses(e.id);
    });
    DeviceEventEmitter.addListener('LikeChange', e => {
      console.log('e=' + e);
      this.GetRandomCourses(e.id);
    });
  };
  componentWillUnmount = () => {
    DeviceEventEmitter.removeAllListeners();
  };

  handleCoursePress = () => {
    console.log('navigate!');
    //this.props.navigation.navigate('AllCourses');
    this.props.handleNav('AllCourses', {id: this.props.id});
  };
  handleSportPress = () => {
    console.log('Sport Navigate!');
    this.props.handleNav('SportMap', {id: this.props.id}); //id存储的是用户的user_id
  };
  handleExercisePress = () => {
    this.props.handleNav('ActionPage', {id: this.props.id}); //id存储的是用户的user_id
  };
  render() {
    return (
      <View>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle={'dark-content'}
        />
        <ScrollView style={{width: '100%', backgroundColor: '#f3f3f3'}}>
          <View
            style={{
              paddingTop: 30,
              flexDirection: 'row',
              width: '100%',
              backgroundColor: '#fff',
              paddingLeft: '5%',
              paddingBottom: 10,
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // marginRight: 10,
                width: '33%',
              }}
              onPress={() => {
                this.props.handleNav('AllCourses');
              }}>
              <Image source={allCourses} style={{width: 60, height: 60}} />

              <Text style={styles.ButtonWord}>全部课程</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              // onPress={this.handleExercisePress}>
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                // marginRight: 10,
                width: '33%',
              }}
              onPress={this.handleExercisePress}>
              <Image
                source={followingPractice}
                style={{width: 60, height: 60}}
              />
              <Text style={styles.ButtonWord}>跟练</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                width: '33%',
              }}
              onPress={this.handleSportPress}>
              <Image source={run} style={{width: 60, height: 60}} />
              <Text style={styles.ButtonWord}>去跑步</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.ScrollTitle}>课程推荐</Text>
          {this.state.courseList.map((item, index) => {
            return (
              <ClassCard
                img={item.img}
                name={item.course_name}
                level={item.course_level}
                time={item.day_time}
                handleDetailPress={() =>
                  this.props.handleNav('CourseDetail', {
                    data: item,
                  })
                }
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ButtonWord: {
    color: '#343434',
    fontSize: 16,
    fontWeight: '400',
  },
  SportInfoDown: {
    backgroundColor: '#9a348a',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    height: 180,
    width: 310,
    marginTop: 110,
    marginLeft: 20,
  },
  sportInfoUp: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    borderWidth: 2,
    borderStyle: 'solid',
    height: 120,
    width: 270,
    marginLeft: 15,
    marginBottom: 20,
  },
  sportInfoTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  Num: {
    fontSize: 20,
    color: '#f30f0f',
  },
  scrollInfo: {
    borderWidth: 2,
    borderColor: '#ccc',
    borderStyle: 'solid',
    borderRadius: 10,
    width: 310,
    marginLeft: 20,
    marginTop: 10,
  },
  ScrollTitle: {
    fontSize: 20,
    color: '#050505',
    backgroundColor: '#fff',
    marginTop: 10,
    paddingTop: 15,
    paddingLeft: 20,
    paddingBottom: 5,
  },
  ScrollMoreInfo: {
    fontSize: 15,
    color: '#1528f1',
    marginLeft: 120,
  },
  sportName: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: '10%',
  },
  peopleName: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
    marginLeft: '10%',
  },
});
