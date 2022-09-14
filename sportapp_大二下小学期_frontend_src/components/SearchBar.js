import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useWindowDimensions} from 'react-native';
// import {followingPractice, run, search, search2} from '../res/fonts/iconSvg';
// import SvgUri from 'react-native-svg-uri';
import search from '../res/search-black.png';

export default class SearchBar extends React.Component {
  handleTextChange = e => {
    let input = e;
    console.log('输入框输入的内容为:', input);
    this.props.handleTextChange(input);
  };

  render() {
    return (
      <View style={{flexDirection: 'row', marginTop: 10, marginBottom: 15}}>
        <TextInput
          placeholder={'请输入搜索内容...'}
          style={styles.InputStyle}
          onBlur={this.props.onBlur}
          //value={this.props.filterText}
          onChangeText={this.handleTextChange.bind(this)}
        />

        <TouchableOpacity activeOpacity={0.7} style={styles.ButtonStyle}>
          <Image source={search} style={{width: 35, height: 35}} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  InputStyle: {
    borderColor: '#666',
    borderRadius: 24,
    borderWidth: 1,
    borderStyle: 'solid',
    height: 42,
    width: '90%',
    marginTop: '1%',
    marginLeft: '5%',
    paddingLeft: 15,
  },
  ButtonStyle: {
    flexDirection: 'row',
    position: 'absolute',
    right: '7%',
    marginTop: '2%',
  },
});
