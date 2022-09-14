import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  setInterval,
  addLocationListener,
  start,
  stop,
} from 'react-native-amap-geolocation';
import {
  getCurrentPosition,
  watchPosition,
  geolocationInit,
} from '../../../../utils/MapHelpTest';
import Title from '../../../../components/Title';
import star_got from '../../../../res/star_shixin1.png';
import start_ungot from '../../../../res/star_shixin2.png';
import running from '../../../../res/running.png';
import {AMapSdk, MapType, MapView} from 'react-native-amap3d';
import SportLine from '../../../../components/SportLine';
import SAButton from '../../../../components/SAButton';
import ResultMap from '../../../../components/ResultMap';

AMapSdk.init(
  Platform.select({
    android: 'b32683a30270e278e67d9fd64214625a',
    //ios: '186d3464209b74effa4d8391f441f14d',
  }),
);

class Single_Star extends React.Component {
  render() {
    if (this.props.got === 1) {
      return (
        <Image
          source={star_got}
          style={{width: 80, height: 80, marginLeft: 20}}
        />
      );
    } else {
      return (
        <Image
          source={start_ungot}
          style={{width: 80, height: 80, marginLeft: 20}}
        />
      );
    }
  }
}

class Got_Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
    };
  }
  componentDidMount = () => {
    var num = this.props.num;
    var ans = [];
    for (var i = 0; i < num; ++i) {
      ans.push(1);
    }
    for (var i = num; i < 3; ++i) {
      ans.push(0);
    }
    this.setState({stars: ans});
  };

  render() {
    return (
      <View style={{flexDirection: 'row'}}>
        {this.state.stars.map((item, index) => {
          return <Single_Star got={item} />;
        })}
      </View>
    );
  }
}

export default class SportEndPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tmp: false,
      hour: 0,
      min: 0,
      sec: 0,
      speed: 0.0,
      distance: 0.0,
      points: [],
    };
  }
  componentDidMount = () => {
    var hour = this.props.route.params.hour;
    var min = this.props.route.params.min;
    var sec = this.props.route.params.sec;
    var speed = this.props.route.params.speed;
    var dis = this.props.route.params.distance;
    var points = this.props.route.params.points;
    this.setState({
      hour: hour,
      min: min,
      sec: sec,
      speed: speed,
      distance: dis,
      points: points,
      tmp: true,
    });
  };

  PressGoBack = () => {
    this.props.navigation.goBack();
  };

  parseTime = e => {
    var ans = '';
    if (e <= 9 && e >= 0) {
      ans += '0';
    }
    ans += parseInt(e);
    return ans;
  };

  GetUsedTime = () => {
    var hour = this.parseTime(this.state.hour);
    var min = this.parseTime(this.state.min);
    var sec = this.parseTime(this.state.sec);
    var ans = '';
    ans += hour;
    ans += ' : ';
    ans += min;
    ans += ' : ';
    ans += sec;
    return ans;
  };

  EndButtonPress = () => {
    this.props.navigation.navigate('Main', {del: 0}); //暂时没有后端无法直接记录数据
  };

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View
          style={{
            flex: 10,
            flexDirection: 'column',
            backgroundColor: '#ffffff',
          }}>
          <ImageBackground
            source={running}
            style={{flex: 4, flexDirection: 'column'}}
            imageStyle={{opacity: 0.5}}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: '#ffffff'}}>
              运动结算
            </Text>
            <Got_Stars num={2} />
            <Text style={styles.wordStyle1}>太&nbsp;棒&nbsp;了!</Text>
            <Text style={styles.wordStyle2}>
              本次运动用时:&nbsp;&nbsp;{this.GetUsedTime()}
            </Text>
            <Text style={styles.wordStyle2}>
              本次运动里程:&nbsp;{this.state.distance}&nbsp;米
            </Text>
            <Text style={styles.wordStyle2}>
              本次运动速度:&nbsp;{this.state.speed}&nbsp;m/s
            </Text>
            <SAButton
              style={{width: '50%', height: '20%', marginLeft: '23%'}}
              onPress={this.EndButtonPress}>
              确定
            </SAButton>
          </ImageBackground>
          <View style={{flex: 6}}>
            <ResultMap points={this.state.points} tmp={this.state.tmp} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wordStyle1: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: '30%',
  },
  wordStyle2: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: '10%',
  },
});
