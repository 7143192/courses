import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import left from '../res/leftArrow2.png';
import share from '../res/share1.png';
import React from 'react';

export default class Title extends React.Component {
  PressGoBack = e => {
    this.props.PressGoBack(e);
  };
  render() {
    return (
      <View style={styles.title}>
        <TouchableOpacity onPress={this.PressGoBack}>
          <Image source={left} style={{width: 40, height: 40}} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#050505',
            marginRight: 5,
          }}>
          {this.props.title}
        </Text>
        <TouchableOpacity>
          <Image source={share} style={{width: 25, height: 25}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    paddingTop: 10,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
  },
});
