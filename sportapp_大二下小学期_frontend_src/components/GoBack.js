import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import left from '../res/leftArrow1.png';
import left2 from '../res/leftArrow2.png';
import React from 'react';
import share from '../res/share1.png';

// 只有一个单纯的返回箭头的组件，传入的参数为
// PressGoBack 返回
// black?箭头是否为黑色
// arrowStyle 整体的距离控制和字体大小
// text 中央文本内容
export default class GoBack extends React.Component {
  PressGoBack = e => {
    this.props.PressGoBack(e);
  };
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={this.PressGoBack}
        style={{
          flexDirection: 'row',
          marginTop: 50,
          marginLeft: 25,
          ...this.props.arrowStyle,
        }}>
        <Image
          source={this.props.black ? left2 : left}
          style={{
            width: 40,
            height: 40,
          }}
        />
        <Text
          style={{
            fontSize: 22,
            color: '#343434',
            marginLeft: '24%',
          }}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}
