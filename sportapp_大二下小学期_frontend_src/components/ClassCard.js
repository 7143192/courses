import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import DarkenImage from './DarkenImage';
import point from '../res/point1.png';

// input:
// handleDetailPress
// img
// name
// level
// time
// style
// backgroundColor default white
export default class ClassCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {deleted: false};
  }
  handleDetailPress = () => {
    this.props.handleDetailPress();
  };
  render = () => {
    if (this.state.deleted === true) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={this.handleDetailPress}
        style={{
          backgroundColor: '#fff',
          ...this.props.backgroundColor,
        }}
        activeOpacity={0.8}>
        <DarkenImage
          source={this.props.img}
          style={{
            width: '90%',
            height: 150,
            marginLeft: '5%',
            marginTop: '2%',
            borderRadius: 20,
            ...this.props.style,
          }}
          transparency={0.6}
        />

        <View
          style={{
            flexDirection: 'column',
            position: 'absolute',
            marginTop: '24%',
            marginLeft: '8%',
          }}>
          <Text style={{color: '#fff', fontSize: 26}}>{this.props.name}</Text>
          <View style={{flexDirection: 'row', marginTop: 5}}>
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
        </View>
      </TouchableOpacity>
    );
  };
}
