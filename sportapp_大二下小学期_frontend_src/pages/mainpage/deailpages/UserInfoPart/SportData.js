import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import share from '../../../../res/share1.png';
import SAButton from '../../../../components/SAButton';
import GoBack from '../../../../components/GoBack';
import {getUserRecords} from '../../../../service/dataService';
import {Card} from '@paraboly/react-native-card';
import BaseUrl from '../../../../utils/constants';
import SyncStorage from '../../../../utils/syncStorage';
import Toast from 'react-native-easy-toast';

var data3 = [];
for (var i = 0; i < 31; ++i) {
  data3.push((i + 1).toString());
}

const SmallCard = props => {
  return (
    <View style={{width: props.width, marginLeft: 8}}>
      <Card
        iconDisable={props.iconDisable}
        title={props.title}
        description={props.description}
        topRightText={props.topRightText}
        bottomRightText={props.bottomRightText}
        containerHeight={props.containerHeight}
        onPress={() => props.onPress()}
        style={{
          marginTop: 15,
          // marginLeft: '6%',
          // width: '20%',
          ...props.style,
          // paddingTop:5
        }}
        topRightTextStyle={{
          fontSize: 15,
          fontWeight: '500',
          color: '#343434',
        }}
        bottomRightTextStyle={{
          fontSize: 12,
          fontWeight: '400',
          color: '#505e80',
          marginBottom: 32,
        }}
      />
    </View>
  );
};

class SportCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View
        style={{
          width: this.props.width,
          // flexDirection:'row'
        }}>
        <Card
          iconDisable={this.props.iconDisable}
          // title={this.props.title}
          description={this.props.description}
          topRightText={this.props.topRightText}
          bottomRightText={this.props.bottomRightText}
          containerHeight={this.props.containerHeight}
          style={{
            ...this.props.style,
            marginTop: 15,
            marginLeft: '6%',
            width: '90%',
            // paddingTop:5
          }}
          topRightTextStyle={{
            fontSize: 15,
            fontWeight: '500',
            color: '#343434',
          }}
          bottomRightTextStyle={{
            fontSize: 12,
            fontWeight: '400',
            color: '#505e80',
          }}
          onPress={() =>
            this.props.handleNav('HistoryMap', {data: this.props.info})
          }
        />
        <Text
          style={{
            position: 'absolute',
            marginLeft: '15%',
            marginTop: '6%',
            fontSize: 18,
            fontWeight: '500',
            color: '#505e80',
          }}>
          {this.props.title}
        </Text>

        <View
          style={{
            position: 'absolute',
            marginLeft: '15%',
            marginTop: '15%',
            fontSize: 18,
            fontWeight: '700',
            color: '#505e80',
            flexDirection: 'column',
          }}>
          <Text style={{fontSize: 16}}>
            总里程:&nbsp;
            <Text style={{fontSize: 20, color: '#6d78ec'}}>100</Text>&nbsp;米
          </Text>
          <Text>
            平均速度:&nbsp;
            <Text style={{fontSize: 16, color: '#6d78ec'}}>
              {this.props.info.speed}
            </Text>
            &nbsp;米/秒
          </Text>
          <Text>
            运动时间:&nbsp;
            <Text style={{fontSize: 16, color: '#6d78ec'}}>
              {this.props.time}
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

export default class SportData extends React.Component {
  static len = 0;
  static partSize = 4;
  constructor() {
    super();
    this.state = {
      historyRecord: [],
      noMore: false,
      times: 0,
      totalMins: 0.0,
    };
  }
  PressGoBack = () => {
    this.props.navigation.goBack();
  };
  onScroll = ({nativeEvent}) => {
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      1;
    if (isReachBottom) {
      this.getPartRecord();
    }
  };

  getRecordsLen = () => {
    let url = BaseUrl + '/getSportSumInfo?id=' + this.props.route.params.id;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('获取的data=', data);
        let val = data.value;
        let mins = (val / 60).toFixed(2);
        this.setState({times: data.key, totalMins: mins});
      });
  };

  getPartRecord = () => {
    let url =
      BaseUrl +
      '/getPartUserRecords?user_id=' +
      this.props.route.params.id +
      '&cur=' +
      SportData.len +
      '&size=' +
      SportData.partSize;
    //let url = BaseUrl + '/getUserRecords?user_id=' + this.props.route.params.id;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({historyRecord: [...this.state.historyRecord, ...data]});
        SportData.len += SportData.partSize;
        if (data.length < SportData.partSize) {
          this.setState({noMore: true});
        } else {
          this.setState({noMore: false});
        }
        if (this.state.noMore === false) {
          this.toast.show('Loading.....');
        } else {
          this.toast.show('没有更多历史纪录了!');
        }
      });
  };
  componentDidMount() {
    SportData.len = 0;
    /*let url = BaseUrl + '/getUserRecords?user_id=' + this.props.route.params.id;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('获取的数据为:', data);
        this.setState({historyRecord: data});
      });*/
    this.getRecordsLen();
    this.getPartRecord();
  }

  handleNav = (e, params = null) => {
    this.props.navigation.navigate(e, params);
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
        <GoBack
          PressGoBack={this.PressGoBack}
          black={1}
          text={'运动数据'}
          arrowStyle={{
            marginTop: 30,
            marginLeft: 15,
            marginBottom: 10,
          }}
        />
        <Text
          style={{
            fontSize: 24,
            color: '#343434',
            marginLeft: 15,
            marginTop: 20,
          }}>
          运动数据
        </Text>

        <View style={{flexDirection: 'row'}}>
          <SmallCard
            width={'30%'}
            iconDisable={1}
            title={1}
            description={'运动排名'}
            topRightText={'名'}
            containerHeight={100}
            bottomRightText={'>'}
            onPress={() => this.props.navigation.navigate('DetailSort')}
            style={{
              marginTop: 15,
              marginLeft: '3%',
              width: '100%',
              height: 60,
            }}
          />
          <SmallCard
            width={'30%'}
            iconDisable={1}
            title={this.state.times}
            description={'累计运动'}
            topRightText={'次'}
            containerHeight={100}
            onPress={() => null}
            style={{
              marginTop: 15,
              marginLeft: '3%',
              width: '100%',
              height: 60,
            }}
          />
          <SmallCard
            width={'30%'}
            iconDisable={1}
            title={this.state.totalMins}
            description={'累计运动'}
            topRightText={'分钟'}
            containerHeight={100}
            onPress={() => null}
            style={{
              marginTop: 15,
              marginLeft: '3%',
              width: '100%',
              height: 60,
            }}
          />
        </View>

        <Text
          style={{
            fontSize: 24,
            color: '#343434',
            marginLeft: 15,
            marginTop: 20,
          }}>
          运动历史
        </Text>

        <ScrollView onScroll={this.onScroll}>
          {this.state.historyRecord.map((item, index) => {
            return (
              <SportCard
                width={'100%'}
                iconDisable={1}
                info={item}
                time={this.handleTotalTime(item.duration)}
                title={item.start_time.toString().substring(0, 10)}
                description={this.props.description}
                topRightText={'查看详情>'}
                bottomRightText={this.props.bottomRightText}
                containerHeight={120}
                handleNav={this.handleNav}
                key={index}
              />
            );
          })}
        </ScrollView>
        <Toast
          ref={toast => (this.toast = toast)}
          style={{backgroundColor: 'rgba(28,148,234,0.8)'}}
          position="bottom"
          positionValue={50}
          fadeInDuration={750}
          fadeOutDuration={600}
          opacity={0.8}
          textStyle={{color: '#ffffff'}}
        />
      </View>
    );
  }
}
