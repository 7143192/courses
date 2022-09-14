import React from 'react';
import {Image, ImageBackground, View} from 'react-native';

// 把图片上面加上一层黑色蒙版
// 参数
// source：图片源
// style：图片和蒙版格式
// transparency：蒙版透明度
const defaultPath = 'https://seopic.699pic.com/photo/50074/9517.jpg_wh1200.jpg';
// 返回：一个图片，相对定位，
// 如果要在图片上覆盖文字请将文字定位方式改为绝对定位
export default class DarkenImage extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log('source=', this.props.source);
    return (
      <View>
        <Image source={{uri: this.props.source}} style={this.props.style} />
        <View
          style={{
            position: 'absolute',
            ...this.props.style,
            backgroundColor: 'rgba(0,0,0,' + this.props.transparency + ')',
          }}
        />
      </View>
    );
  }
}
