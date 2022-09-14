import React, {Component} from 'react';
import {View, Text} from 'react-native';
import IconMap from '../../res/fonts/icon';

const Index = props => (
  <Text
    onPress={props.onPress}
    style={{fontFamily: 'iconfont', ...props.style}}>
    {IconMap[props.name]}
  </Text>
);

export default Index;
