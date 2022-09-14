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
  TextInput,
} from 'react-native';
import Title from '../../../../components/Title';
import sport1 from '../../../../res/sportClass2.jpg';
import sport2 from '../../../../res/sportClass3.jpg';
import sport3 from '../../../../res/sportClass31.jpg';
import sport4 from '../../../../res/sportClass5.jpg';
import star from '../../../../res/CollectStar.png';
import delete1 from '../../../../res/delete1.png';
import point from '../../../../res/point1.png';
import DarkenImage from '../../../../components/DarkenImage';
import GoBack from '../../../../components/GoBack';
import storage from '../../../../utils/Storage';
import BaseUrl from '../../../../utils/constants';
import SyncStorage from '../../../../utils/syncStorage';

var data = [
  ['快速塑性练习', 3, 10, sport1],
  ['腹肌撕裂者进阶', 1, 15, sport2],
  ['高能燃脂跑步计划', 2, 30, sport3],
  ['快速塑性练习', 3, 10, sport4],
  ['腹肌撕裂者进阶', 1, 15, sport2],
  ['高能燃脂跑步计划', 2, 30, sport3],
  ['快速塑性练习', 3, 10, sport4],
  ['腹肌撕裂者进阶', 1, 15, sport1],
  ['高能燃脂跑步计划', 2, 30, sport2],
];

class CollectClassInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {deleted: false};
  }
  handleDetailPress = () => {
    this.props.handleDetailPress();
  };
  handleDelete = () => {
    this.setState({deleted: true});
    const url = BaseUrl + "/delFavorite?userId="+this.props.userId
      +"&courseId="+this.props.courseId;
      fetch(url,{
          headers: {
              'token': SyncStorage.getValue('token')
          }
      })
          .then(response => response.json())
          .then(data0 => {
              console.log(data0);
          });
  };
  render = () => {
    if (this.state.deleted === true) {
      return null;
    }
    return (
      <TouchableOpacity onPress={this.handleDetailPress} activeOpacity={0.8}>
        <DarkenImage
          source={this.props.img}
          style={{
            width: '96%',
            height: 180,
            marginLeft: '2%',
            marginTop: '2%',
            borderRadius: 20,
          }}
          transparency={0.6}
        />

        <View style={{flexDirection: 'column', position: 'absolute'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.handleDelete} activeOpacity={0.2}>
              <Image
                source={delete1}
                style={{
                  width: 30,
                  height: 30,
                  marginLeft: '90%',
                  marginTop: 15,
                }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.className}>{this.props.name}</Text>
          <View style={{flexDirection: 'row', marginLeft: '7%', marginTop: 5}}>
            <Text style={{color: '#eee', fontSize: 14}}>
              K<Text>{this.props.level}</Text>进阶
            </Text>
            <Image
              source={point}
              style={{width: 15, height: 15, marginTop: '1%'}}
            />
            <Text style={{color: '#eee', fontSize: 14}}>
              每日<Text>{this.props.time}</Text>分钟
            </Text>
          </View>
          <Text style={{marginLeft: '7%', color: '#eee', fontSize: 12}}>
            2022-06-29-20:00
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
}

export default class CollectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {collectList: []};
  }
  componentDidMount = () => {
    console.log('传递的参数为:', this.props.route.params.data);
    let id = this.props.route.params.data.user_id;

    let url = BaseUrl + '/getUserFavorite?UserId=' + id;
    fetch(url,{
        headers: {
            'token': SyncStorage.getValue('token')
        }

    })
      .then(response => response.json())
      .then(data0 => {
          console.log(data0);
        // let info = data0.favorites;
        // if (info === undefined || info.length === 0) {
        //   this.setState({collectList: []});
        // } else {
          // let ans = [];
          // Object.keys(info).forEach(key => {
          //   storage
          //     .load({
          //       key: 'AllCourses',
          //       autoSync: true,
          //       syncInBackground: true,
          //     })
          //     .then(ret => {
          //       //console.log('存储信息为:', JSON.parse(ret));
          //       let got = JSON.parse(ret);
          //       Object.keys(got).forEach(key1 => {
          //         if (got[key1].course_id === info[key].course_id) {
          //           ans.push(got[key1]);
          //         }
          //       });
                this.setState({collectList: data0});
          //     })
          //     .catch(err => {
          //       console.warn(err.message);
          //       switch (err.name) {
          //         case 'NotFoundError':
          //           break;
          //         case 'ExpiredError':
          //           break;
          //       }
          //     });
          // });
        // }
      });
  };

  handlePressGoBack = () => {
    this.props.navigation.goBack();
  };
  handleDetailPress = () => {
    this.props.navigation.push('CourseDetail');
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <GoBack
          PressGoBack={this.handlePressGoBack}
          black={1}
          text={'我的收藏'}
          arrowStyle={{
            marginTop: 30,
            marginLeft: 15,
            marginBottom: 10,
          }}
        />
        {/*<Title title={'我的收藏'} PressGoBack={this.handlePressGoBack} />*/}
        <View style={{flex: 11, flexDirection: 'column'}}>
          <ScrollView
            style={{
              flexDirection: 'column',
              height: '90%',
              // marginTop: '1%',
              backgroundColor: '#f3f3f3',
            }}>
            {this.state.collectList.map((item, index) => {
              return (
                <CollectClassInfo
                  name={item.course_name}
                  time={item.day_time}
                  level={item.course_level}
                  img={item.img}
                  key={index}
                  userId={this.props.route.params.data.user_id}
                  courseId={item.course_id}
                  handleDetailPress={() =>
                    this.props.navigation.navigate('CourseDetail', {data: item})
                  }
                />
              );
            })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  className: {
    color: '#ffffff',
    fontSize: 24,
    marginTop: '15%',
    marginLeft: '7%',
  },
});
