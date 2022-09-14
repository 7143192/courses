import React, {Component} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
  setInterval,
  setLocatingWithReGeocode,
  setNeedAddress,
  addLocationListener,
  start,
  stop,
} from 'react-native-amap-geolocation';
import {
  getCurrentPosition,
  watchPosition,
  geolocationInit,
} from '../../../../utils/MapHelpTest';

//此文件用于最开始的地图测试
export default class TestMap1 extends Component {
  componentDidMount() {
    //初始化定位组件
    geolocationInit();

    //启动监听
    watchPosition();

    //获取一次定位,getCurrentPosition会暂停掉监听
    //getCurrentPosition();

    //设置每隔15S获取一次定位
    setInterval(10000);
    addLocationListener(location => console.log(location));

    // 开始连续定位
    start();
  }

  componentWillUnmount() {
    //析构时结束监听
    stop();
  }

  render() {
    return (
      <SafeAreaView>
        <View>
          <Text>Test The Map</Text>
        </View>
      </SafeAreaView>
    );
  }
}
