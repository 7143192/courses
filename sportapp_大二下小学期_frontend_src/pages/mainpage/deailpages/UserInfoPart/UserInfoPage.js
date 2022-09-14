import * as React from 'react';
import {
  EventEmitter,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  DeviceEventEmitter,
} from 'react-native';
import rightArrow from '../../../../res/rightArrow.png';
import {Card} from '@paraboly/react-native-card';
import BaseUrl from '../../../../utils/constants';
import SAButton from '../../../../components/SAButton';
import storage from '../../../../utils/Storage';

class UserInfoCard extends React.Component {
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
            width: '88%',
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
          onPress={() => this.props.onPress()}
        />
        <Text
          style={{
            position: 'absolute',
            marginLeft: '15%',
            marginTop: '16%',
            fontSize: 18,
            fontWeight: '500',
            color: '#505e80',
          }}>
          {this.props.title}
        </Text>

        <Text
          style={{
            position: 'absolute',
            marginLeft: '15%',
            marginTop: '40%',
            fontSize: 18,
            fontWeight: '700',
            color: '#505e80',
          }}>
          {this.props.data}
        </Text>
      </View>
    );
  }
}

class UserInfoHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={{width: '100%'}}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle={'dark-content'}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 60,
          }}>
          <Image
            source={{uri: this.props.info.header}}
            style={styles.userImg}
          />
          <View
            style={{
              flexDirection: 'column',
              marginLeft: 20,
              height: '100%',
            }}>
            <Text
              style={{
                fontSize: 40,
                color: '#343434',
              }}>
              {this.props.username}
            </Text>
            <Text>健身达人</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: 20,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() =>
                this.props.handleNav('UserInformation', {
                  username: this.props.username,
                  info: this.props.info,
                  id: this.props.id,
                })
              }>
              <Text style={{fontSize: 12}}>个人信息</Text>
              <Image source={rightArrow} style={{width: 20, height: 20}} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 30,
            alignContent: 'center',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity style={styles.InfoView1}>
            <Text style={styles.numPos}>{this.props.numOfLike}</Text>
            <Text style={{color: '#999999'}}>关注数</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.InfoView1}>
            <Text style={styles.numPos}>{this.props.numOfFan}</Text>
            <Text style={{color: '#999999'}}>粉丝数</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.InfoView1}>
            <Text style={styles.numPos}>{this.props.numOfGot}</Text>
            <Text style={{color: '#999999'}}>获赞数</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default class UserInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numOfLike: 0,
      numOfFan: 0,
      numOfGot: 0,
      userData: [],
    };
  }
  componentDidMount = () => {
    /*let url = BaseUrl + '/getUserRecords?user_id=' + this.props.id;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('获得的data=', data);
      });*/
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        console.log('获取的userInfo=', JSON.parse(ret));
        this.setState({userData: JSON.parse(ret)});
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
    //this.setState({numOfLike: this.props.items.like});
  };

  MorePress = () => {
    this.props.handleNav('AllCourses');
  };
  CollectPress = () => {
      storage
          .load({
              key: 'userInfo',
              autoSync: true,
              syncInBackground: true,
          })
          .then(ret => {
              let data = JSON.parse(ret);
              this.props.handleNav('CollectPage', {data: data});
          })
          .catch(err => {
              console.warn(err.message);
              switch (err.name) {
                  case 'NotFoundError':
                      break;
                  case 'ExpiredError':
                      break;
              }
          });
      // console.log("userInfo导航到收藏;", this.props.items);

  };
  handleLogOut = () => {
    DeviceEventEmitter.emit('LogOut', {username: '', pwd: ''});
    storage.remove({key: 'userInfo'}); //删除存储在内存中的用户信息
    this.props.handleNav('PwdLogIn');
  };
  render() {
    return (
      <View style={styles.userView}>
        <UserInfoHeader
          //info={this.props.items.info
          info={this.state.userData}
          //username={this.props.items.username}
          username={this.state.userData.nickname}
          numOfLike={this.state.numOfLike}
          numOfFan={this.state.numOfFan}
          numOfGot={this.state.numOfGot}
          handleNav={this.props.handleNav}
          //id={this.props.id} //获取用户id信息
          id={this.state.userData.user_id}
        />
        <View
          style={{
            flex: 1,
            width: '100%',
            flexDirection: 'row',
          }}>
          <UserInfoCard
            iconDisable={true}
            width={'50%'}
            title={'运动数据'}
            description={'总运动'}
            bottomRightText={'本周消耗4卡'}
            topRightText={'>'}
            containerHeight={100}
            data={'8分钟'}
            onPress={() =>
              this.props.handleNav('SportData', {
                id: this.state.userData.user_id,
              })
            }
          />
          <UserInfoCard
            iconDisable={true}
            width={'50%'}
            title={'健康数据'}
            description={'体重'}
            bottomRightText={'上次记录 今天'}
            topRightText={'>'}
            containerHeight={100}
            data={this.state.userData.weight + 'KG'}
            onPress={() =>
              this.props.handleNav('HealthData', {data: this.state.userData})
            }
          />
        </View>
        <View
          style={{
            width: '100%',
            flex: 1,
            marginTop: '-34%',
            marginLeft: '4%',
          }}>
          <Card
            iconDisable={false}
            width={'100%'}
            title={'我的收藏'}
            topRightText={'>'}
            containerHeight={100}
            // description={'共10条记录'}
            iconBackgroundColor="#7a7280"
            // data={'60kg'}
            onPress={() => this.CollectPress()}
          />

          {/*<Card*/}
          {/*  iconDisable={false}*/}
          {/*  width={'100%'}*/}
          {/*  title={'历史观看'}*/}
          {/*  topRightText={'>'}*/}
          {/*  containerHeight={100}*/}
          {/*  description={'共10条记录'}*/}
          {/*  iconBackgroundColor="#505e80"*/}
          {/*  style={{marginTop: 15}}*/}
          {/*  // data={'60kg'}*/}
          {/*  onPress={() => this.CollectPress()}*/}
          {/*/>*/}
        </View>

        {/*<View style={styles.UserPart3}>*/}
        {/*  <UserOptions*/}
        {/*    img={heart}*/}
        {/*    name={'我收藏的课程'}*/}
        {/*    num={0}*/}
        {/*    handlePress={this.CollectPress}*/}
        {/*  />*/}
        {/*  <UserOptions*/}
        {/*    img={history}*/}
        {/*    name={'我练过的课程'}*/}
        {/*    num={0}*/}
        {/*    handlePress={this.CollectPress}*/}
        {/*  />*/}
        {/*  <UserOptions*/}
        {/*    img={more}*/}
        {/*    name={'更多'}*/}
        {/*    num={1000}*/}
        {/*    handlePress={this.MorePress}*/}
        {/*  />*/}
        {/*</View>*/}
        <SAButton style={styles.logOutButton} onPress={this.handleLogOut}>
          退出登录
        </SAButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userView: {
    backgroundColor: '#f3f3f3',
    flex: 1,
    flexDirection: 'column',
  },
  userImg: {
    marginLeft: 10,
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  InfoView1: {
    // flex: 1,
    flexDirection: 'column',
    // borderRightWidth: 1,
    // borderRightColor: '#050505',
    // borderStyle: 'solid',
    alignItems: 'center',
    width: '30%',
    height: 70,
  },
  numPos: {
    color: '#343434',
    fontSize: 30,
  },

  UserPart3: {
    flex: 45,
    flexDirection: 'column',
    borderTopColor: '#050505',
    borderStyle: 'solid',
    borderTopWidth: 2,
  },
  UserOption: {
    height: '25%',
    width: '90%',
    marginLeft: '5%',
    marginTop: '3%',
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 10,
    borderColor: 'rgba(153,205,243,0.8)',
    flexDirection: 'row',
  },
  logOutButton: {
    height: 60,
    width: '90%',
    marginLeft: '5%',
    borderRadius: 20,
    marginBottom: '5%',
    backgroundColor: '#e84343',
  },
});
