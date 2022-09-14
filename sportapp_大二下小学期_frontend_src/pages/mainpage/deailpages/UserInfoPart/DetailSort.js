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
import left from '../../../../res/leftArrow2.png';
import share from '../../../../res/share1.png';
import user from '../../../../res/userpic.png';
import user1 from '../../../../res/userpic1.png';
import user2 from '../../../../res/userpic2.png';
import user3 from '../../../../res/userpic3.png';
import user4 from '../../../../res/userpic4.png';
import user5 from '../../../../res/userpic5.png';
import gold from '../../../../res/jin.png';
import silver from '../../../../res/yin.png';
import tong from '../../../../res/tong.png';
import Title from '../../../../components/Title';
const data = [1, 2, 3, 4, 5, 6];
const owned = [0, 0, 1, 0, 0, 0];
class Type extends React.Component {
  getType = () => {
    if (this.props.sort === 1) {
      return gold;
    } else {
      if (this.props.sort === 2) {
        return silver;
      }
      return tong;
    }
  };
  render() {
    return (
      <View
        style={{
          height: 50,
          width: 50,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          {this.props.sort > 3 ? (
            <Text
              style={{
                color: '#050505',
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              {this.props.sort}
            </Text>
          ) : (
            <Image
              source={this.getType(this.props.sort)}
              style={{width: 30, height: 30}}
            />
          )}
        </View>
      </View>
    );
  }
}

class Sort extends React.Component {
  getPic = () => {
    if (this.props.userNum === 1) {
      return user;
    }
    if (this.props.userNum === 2) {
      return user1;
    }
    if (this.props.userNum === 3) {
      return user2;
    }
    if (this.props.userNum === 4) {
      return user3;
    }
    if (this.props.userNum === 5) {
      return user4;
    }
    if (this.props.userNum === 6) {
      return user5;
    }
  };
  getColor = () => {
    if (this.props.own === 0) {
      return '#ffffff';
    }
    return '#ccc';
  };
  getUserName = () => {
    if (this.props.own === 1) {
      return this.props.username + '(我)';
    }
    return this.props.username;
  };
  render() {
    return (
      <View style={this.props.own === 1 ? styles.style2 : styles.style1}>
        <Type sort={this.props.sort} />
        <View
          style={{
            marginLeft: 40,
            width: 120,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={this.getPic(this.props.userNum)}
            style={{width: 40, height: 40}}
          />
          <Text style={{fontSize: 18, color: '#050505'}}>
            {this.getUserName(this.props.username)}
          </Text>
        </View>
        <View style={{width: 100, alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 18,
              color: '#050505',
            }}>
            <Text>{this.props.num}</Text>分钟
          </Text>
        </View>
      </View>
    );
  }
}

export default class DetailSort extends React.Component {
  PressGoBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}>
        <Title title={'运动排名'} PressGoBack={this.PressGoBack} />
        <View
          style={{
            flex: 9,
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            width: '100%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
            }}>
            <Text style={{marginLeft: 20, color: 'rgba(28,148,234,0.8)'}}>
              名次
            </Text>
            <Text style={{color: 'rgba(28,148,234,0.8)'}}>用户</Text>
            <Text style={{marginRight: 20, color: 'rgba(28,148,234,0.8)'}}>
              运动时长
            </Text>
          </View>
          {data.map((item, index) => {
            return (
              <Sort
                sort={item}
                username={'用户'}
                num={(6 - item) * 100}
                userNum={item}
                key={index}
                own={owned[index]}
              />
            );
          })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  style1: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#050505',
    borderBottomWidth: 2,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  style2: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderColor: '#050505',
    borderBottomWidth: 2,
    backgroundColor: '#44cb91',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
});
