import {ImageBackground, Text, View} from 'react-native';
import React from 'react';
import running from '../../../../res/running.png';
import ResultMap from '../../../../components/ResultMap';
import HistoryMapPart from '../../../../components/HistoryMapPart';

export default class HistoryMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {points: []};
  }

  getPoints = () => {
    let list = [];
    console.log(this.props.route.params.data.path);
    Object.keys(this.props.route.params.data.path).forEach(key => {
      let point = {};
      point.latitude = this.props.route.params.data.path[key].lat;
      point.longitude = this.props.route.params.data.path[key].lng;
      list.push(point);
    });
    return list;
  };

  handleTotalTime = e => {
    let hour = 0;
    let min = 0;
    let sec = 0;
    sec = e % 60;
    min = (e - sec) / 60;
    hour = (e - 60 * min - sec) / 3600;
    let ans = '';
    if (hour <= 9) {
      ans += '0';
    }
    ans += hour.toString();
    ans += ':';
    if (min <= 9) {
      ans += '0';
    }
    ans += min.toString();
    ans += ':';
    if (sec <= 9) {
      ans += '0';
    }
    ans += sec.toString();
    console.log('time=', ans);
    return ans;
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <ImageBackground
          source={running}
          imageStyle={{opacity: 0.6}}
          style={{
            flex: 5,
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: '20%',
              marginTop: '8%',
            }}>
            <Text style={{color: '#ffffff', fontSize: 20}}>
              <Text>
                {this.props.route.params.data.start_time
                  .toString()
                  .substring(0, 10)}
              </Text>
              运动记录
            </Text>
            <Text style={{color: '#ffffff', fontSize: 20}}>
              运动总里程:<Text style={{color: '#19ab04'}}>100</Text>米
            </Text>
            <Text style={{color: '#ffffff', fontSize: 20}}>
              平均速度:
              <Text style={{color: '#19ab04'}}>
                {this.props.route.params.data.speed}
              </Text>
              米/秒
            </Text>
            <Text style={{color: '#ffffff', fontSize: 20}}>
              运动用时:
              <Text style={{color: '#19ab04'}}>
                {this.handleTotalTime(this.props.route.params.data.duration)}
              </Text>
            </Text>
            <Text style={{color: '#ffffff', fontSize: 20}}>
              超过了&nbsp;<Text style={{color: '#19ab04'}}>90%</Text>
              &nbsp;的用户!
            </Text>
          </View>
        </ImageBackground>
        <View style={{flex: 14, marginTop: '5%', backgroundColor: '#ffffff'}}>
          <ResultMap points={this.getPoints()} />
        </View>
      </View>
    );
  }
}
