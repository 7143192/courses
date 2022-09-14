import React, {Component} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import IconFont from '../IconFont';
import {NavigationContext} from '@react-navigation/native';
import left from '../../res/leftArrow1.png';
class Index extends Component {
  static contextType = NavigationContext;
  render() {
    // goBack
    return (
      <View>
        <ImageBackground
          source={require('../../res/headbg.png')}
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
            onPress={this.context.goBack}
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
export default Index;
