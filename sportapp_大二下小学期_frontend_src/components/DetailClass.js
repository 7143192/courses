import React from 'react';
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import point from '../res/point1.png';
import Stars from './Stars';
export default class DetailClass extends React.Component {
  handleNav = e => {
    this.props.handleNav(e);
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => this.handleNav('CourseDetail')}>
        <ImageBackground
          source={{uri: this.props.img}}
          style={styles.SingleClass}
          imageStyle={{borderRadius: 20}}>
          <View
            style={{
              flexDirection: 'column',
              height: '100%',
              padding: 10,
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <Text style={styles.className}>{this.props.name}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginLeft: 8,
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 16, color: '#dddddd'}}>推荐指数:</Text>
              <Stars nums={this.props.star} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 40,
                marginLeft: 10,
                alignItems: 'center',
              }}>
              <Text style={{color: '#ffffff'}}>
                K<Text style={styles.details}>{this.props.level}</Text>进阶
              </Text>
              <Image
                source={point}
                style={{width: 20, height: 20, marginTop: 5}}
              />
              <Text style={{color: '#ffffff'}}>
                练习时长:
                <Text style={styles.details}>
                  &nbsp;{this.props.time}&nbsp;
                </Text>
                分钟
              </Text>
            </View>
            <Text style={{color: '#ffffff', marginLeft: 10}}>
              已有&nbsp;<Text style={styles.details}>{this.props.num}</Text>
              &nbsp;万人练习
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  classes: {
    borderWidth: 2,
    borderColor: '#050505',
    borderRadius: 20,
    flexDirection: 'column',
    marginTop: -30,
  },
  SingleClass: {
    marginTop: 11,
    width: 320,
    height: 150,
    overflow: 'hidden',
    borderRadius: 20,
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
    color: '#ffffff',
  },
  className: {
    fontSize: 20,
    color: '#ffffff',
    marginLeft: 10,
  },
});
