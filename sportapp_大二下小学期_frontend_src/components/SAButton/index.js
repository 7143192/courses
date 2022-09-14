import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

class Index extends Component {
  static defaultProps = {
    style: {},
    textStyle: {},
    disabled: false,
  };
  render() {
    let buttonColor = '#36a476';
    if (this.props.disabled) {
      buttonColor = '#888888';
    }
    return (
      <TouchableOpacity
        disabled={this.props.disabled}
        activeOpacity={0.6}
        onPress={this.props.onPress}
        style={{
          width: '100%',
          height: '100%',

          overflow: 'hidden',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: buttonColor,
          ...this.props.style,
        }}>
        <Text style={{...styles.buttonText, ...this.props.textStyle}}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Index;
