import {AMapSdk, MapType, MapView} from 'react-native-amap3d';
import moment from 'moment/moment';
import {Alert, Platform, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  addLocationListener,
  Geolocation,
  setInterval,
  start,
  stop,
} from 'react-native-amap-geolocation';
import {geolocationInit, watchPosition} from '../../../../utils/MapHelpTest';
import SAButton from '../../../../components/SAButton';
import SportLine from '../../../../components/SportLine';
import BaseUrl from '../../../../utils/constants';
import SyncStorage from '../../../../utils/syncStorage';

AMapSdk.init(
  Platform.select({
    android: 'b32683a30270e278e67d9fd64214625a',
    //ios: '186d3464209b74effa4d8391f441f14d',
  }),
);

var tmp = false; //用于同步
console.log('BseUrl=', BaseUrl);
export default class NewMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tmp: false,
      init_latitude: 39.91095,
      init_longitude: 116.37296,
      start_time: moment().format('LTS'), //形式为:11:07:50 pm
      end_time: moment().format('LTS'),
      continue_time: 0,
      continuing: false,
      started: false,
      ended: false,
      hour: 0,
      min: 0,
      sec: 0,
      speed: 0.0,
      distance: 0.0,
      points: [],
    };
  }

  getDistance = (start, end) => {
    var lon1 = (Math.PI / 180) * start.longitude;
    var lat1 = (Math.PI / 180) * start.latitude;
    var lon2 = (Math.PI / 180) * end.longitude;
    var lat2 = (Math.PI / 180) * end.latitude;
    // 地球半径
    var R = 6371;
    // 两点间距离 KM
    var d =
      Math.acos(
        Math.sin(lat1) * Math.sin(lat2) +
          Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1),
      ) * R;
    // 公里转米
    var abs = Math.abs(d * 1000);
    return Math.round(abs);
  };
  componentDidMount() {
    geolocationInit();
    //启动监听
    //获取一次定位,getCurrentPosition会暂停掉监听
    //设置每隔1s获取一次定位
    setInterval(1000);
    addLocationListener(
      location => {
        this.setState({
          init_latitude: location.latitude,
          init_longitude: location.longitude,
          tmp: true,
        });
        tmp = true;
        if (this.state.continuing === false) {
          //没有处于运动中的状态
          return;
        }
        let cur = this.state.continue_time + 1;
        if (cur < 60) {
          this.setState({sec: cur});
        } else {
          if (cur >= 60 && cur < 3600) {
            var sec = cur % 60;
            var min = cur / 60;
            this.setState({min: min, sec: sec});
          } else {
            var hour = cur / 3600;
            var left = cur - hour * 3600;
            var secs1 = left % 60;
            var mins1 = left / 60;
            this.setState({hour: hour, min: mins1, sec: secs1});
          }
        }
        var new_dis = 0.0;
        if (this.state.points.length !== 0) {
          var startPoint = this.state.points[this.state.points.length - 1];
          var endPoint = {
            latitude: location.latitude,
            longitude: location.longitude,
          };
          new_dis = this.getDistance(startPoint, endPoint); //计算新到的点与数组中最后一个点之间的距离
        }
        new_dis += this.state.distance; //更新距离
        var speed = 0.0;
        if (this.state.continue_time !== 0) {
          speed = (this.state.distance / this.state.continue_time).toFixed(2);
        }
        console.log(location);
        console.log(location.latitude);
        console.log(location.longitude);
        console.log(location.speed);
        var got = [];
        for (var i = 0; i < this.state.points.length; ++i) {
          got.push(this.state.points[i]);
        }
        got.push({
          time: location.timestamp, //时间戳
          latitude: location.latitude,
          longitude: location.longitude, //经纬度
        });
        got.push({
          time: location.timestamp,
          latitude: location.latitude,
          longitude: location.longitude,
        });
        this.setState({
          init_latitude: location.latitude,
          init_longitude: location.longitude,
          continue_time: this.state.continue_time + 1, //每次获取新位置就更新持续时间
          speed: speed,
          distance: new_dis,
          points: got,
          tmp: true,
        });
      },
      {LocationPurpose: 'sport', LocationMode: 'Hight_Accuracy'},
    );

    // 开始连续定位
    start();
  }

  componentWillUnmount() {
    stop(); //在析构时停止监听
    this.setState = (state, callback) => {
      return;
    };
  }

  handleButtonPress = () => {
    console.log('开始运动!');
    this.setState({continuing: !this.state.continuing, started: true});
  };

  handleEndButtonPress = () => {
    console.log('结束运动!');
    var end_hour = this.state.hour;
    var end_min = this.state.min;
    var end_sec = this.state.sec;
    var end_speed = this.state.speed;
    var end_dis = this.state.distance;
    this.setState({
      continuing: false,
      hour: 0,
      min: 0,
      sec: 0,
      started: false,
      distance: 0,
      speed: 0,
    });
    let json = {};
    let url = BaseUrl + '/getMaxId';
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data1 => {
        json.record_id = data1;
        json.user_id = this.props.route.params.id;
        json.start_time = moment().format('YYYY-MM-DD');
        json.end_time = moment().format('YYYY-MM-DD');
        console.log('startTime=', moment().format('YYYY-MM-DD'));
        let secs = 0;
        secs += end_hour * 3600;
        secs += end_min * 60;
        secs += end_sec;
        json.duration = secs; //按照 秒 来存储总的持续时间
        json.speed = end_speed;
        let path = [];
        Object.keys(this.state.points).forEach(key => {
          let point = {
            time: this.state.points[key].time,
            lat: this.state.points[key].latitude,
            lng: this.state.points[key].longitude,
          };
          path.push(point); //转化为目标格式的点数据
        });
        json.path = path;
        let url1 = BaseUrl + '/insertRecord';
        fetch(url1, {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
            token: SyncStorage.getValue('token'),
          },
          body: JSON.stringify(json),
        })
          .then(response => response.json())
          .then(data => {
            this.props.navigation.navigate('SportEnd', {
              hour: end_hour,
              min: end_min,
              sec: end_sec,
              distance: end_dis,
              speed: end_speed,
              points: this.state.points,
            });
          });
      });
  };

  showConfirm = () => {
    //显示是否结束的确认框
    Alert.alert(
      '提示',
      '是否结束运动?',
      [
        {text: '是', onPress: () => this.handleEndButtonPress()},
        {text: '否', style: 'cancel'},
      ],
      {cancelable: false},
    );
  };

  parseTime = e => {
    var ans = '';
    if (e <= 9 && e >= 0) {
      ans += '0';
    }
    ans += parseInt(e);
    return ans;
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 6}}>
          {this.state.tmp ? (
            <MapView
              mapType={MapType.Standard}
              initialCameraPosition={{
                target: {
                  latitude: this.state.init_latitude,
                  longitude: this.state.init_longitude,
                },
                zoom: 15,
              }}
              myLocationButtonEnabled={true}
              myLocationEnabled={true}
              compassEnabled={false}
              style={{width: '100%', height: '100%'}}
              locationStyle={{
                fillColor: 'rgba(0,0,0)',
                strokeWidth: 0,
                strokeColor: 'rgba(0,0,0)',
              }}
              distanceFilter={1} //设置最短更新距离
              center={{
                latitude: this.state.init_latitude,
                longitude: this.state.init_longitude,
              }}>
              <SportLine points={this.state.points} />
            </MapView>
          ) : null}
        </View>
        <View style={styles.TimePart}>
          <View style={styles.TimeStyle}>
            <Text style={styles.TimeDetail}>
              {this.parseTime(this.state.hour)}&nbsp;&nbsp;:&nbsp;&nbsp;
            </Text>
            <Text style={styles.TimeDetail}>
              {this.parseTime(this.state.min)}&nbsp;&nbsp;:&nbsp;&nbsp;
            </Text>
            <Text style={styles.TimeDetail}>
              {this.parseTime(this.state.sec)}
            </Text>
          </View>
          <View style={styles.InfoStyle}>
            <Text style={styles.speedDetail}>
              运行速度:{this.state.speed}&nbsp;m/s
            </Text>
            <Text style={styles.speedDetail}>
              运动距离:{this.state.distance}&nbsp;米
            </Text>
          </View>
        </View>
        <View style={styles.ButtonPart}>
          <SAButton
            style={styles.ButtonStyle}
            onPress={this.handleButtonPress}
            disabled={!this.state.tmp}>
            {this.state.continuing ? '暂停' : '开始'}
          </SAButton>
          <SAButton
            style={styles.ButtonStyle1}
            onPress={this.showConfirm}
            disabled={!this.state.started}>
            结束
          </SAButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ButtonPart: {
    backgroundColor: '#ffffff',
    flex: 1.5,
    flexDirection: 'row',
  },
  ButtonStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: '10%',
    marginTop: '8%',
  },
  ButtonStyle1: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: '20%',
    marginTop: '8%',
  },
  ButtonEndStyle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: '10%',
    marginTop: '8%',
    color: '#f10b0b',
  },
  ButtonEndStyle1: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginLeft: '20%',
    marginTop: '8%',
    color: '#f10b0b',
  },
  TimePart: {
    backgroundColor: '#ffffff',
    flex: 0.8,
    flexDirection: 'row',
  },
  TimeStyle: {
    marginLeft: '2%',
    marginTop: '4%',
    flexDirection: 'row',
  },
  InfoStyle: {
    marginLeft: '3%',
    marginTop: '3%',
    flexDirection: 'column',
  },
  TimeDetail: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#050505',
  },
  speedDetail: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#050505',
  },
  container: {
    marginTop: 20,
    marginHorizontal: 10,
  },
  buttonView: {
    margin: 10,
    height: 40,
  },
});
