import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  ImageBackgroundComponent,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  Alert,
  DeviceEventEmitter,
  Button,
  PermissionsAndroid,
} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast';
import SAButton from '../../../components/SAButton';
import weChat from '../../../res/weChat.png';
import QQ from '../../../res/QQ.png';
import CheckBox from 'react-native-check-box';
import Video from 'react-native-video';
import BaseUrl from '../../../utils/constants';
import md5Text from '../../../components/Md5';
import storage from '../../../utils/Storage';
import {useToast} from 'react-native-styled-toast';
import {ToastContext} from 'react-native-styled-toast';
function ToastCheckBox() {
  //const {toast} = useToast();
  console.log('进入了check-box的toast函数!');
  return (
    <ToastContext.Consumer>
      {({toast}) => {
        return toast({
          message: 'My First Toast!',
          toastStyles: {
            bg: 'lightblue',
            borderRadius: 16,
          },
          color: 'white',
          iconColor: 'white',
          iconFamily: 'Entypo',
          iconName: 'info',
          closeButtonStyles: {
            px: 4,
            bg: 'darkgrey',
            borderRadius: 16,
          },
          closeIconColor: 'white',
          hideAccent: true,
        });
      }}
    </ToastContext.Consumer>
  );
}
import {
  checkPermissionCarmera,
  requestPermissionCarmera,
} from '../../../utils/PermissonAcess';
import SyncStorage from '../../../utils/syncStorage';

export default class PwdLogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      username: '',
      pwd: '',
      buttonHidden: true,
    };
  }
  ListenLogOut = (username, pwd) => {
    console.log('进入了listener函数!');
    this.setState({username: username, pwd: pwd});
  };
  componentDidMount = () => {
    checkPermissionCarmera();
    //测试一下前端的JSON怎么写
    /*let json = {};
    json.record_id = 1;
    json.user_id = 1;
    json.start_time = '2022-07-14';
    json.end_time = '2022-07-14';
    json.duration = 10;
    json.speed = 3.3;
    let path = [];
    path.push({time: 1232434234, lat: 123.43, lng: 123.44});
    json.path = path;
    console.log('json=', json);
    let str = JSON.stringify(json); //字符串化
    let url = BaseUrl + '/insertRecord';
    fetch(url, {
      //这是可以正确插入的写法！
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then(response => response.json())
      .then(data => {
        console.log('成功发送JSON请求!');
      });
    //fetch(url).then(response => response.json());*/
    DeviceEventEmitter.addListener('LogOut', e => {
      console.log('进入了新的listener！');
      console.log('username=', e.username);
      console.log('pwd=', e.pwd);
      this.setState({username: e.username, pwd: e.pwd});
    });
  };
  componentWillUnmount = () => {
    //DeviceEventEmitter.remove();
    DeviceEventEmitter.removeAllListeners();
  };

  handleBoxClick = () => {
    console.log('checkBox的状态发生改变!');
    var stat = this.state.isChecked;
    this.setState({isChecked: !stat});
  };
  Option2Press = () => {
    this.props.navigation.navigate('CodeForRegOrLogin');
  };
  Option1Press = () => {
    this.props.navigation.navigate('ForgetPwd');
  };

  changeUserName = e => {
    console.log('输入的用户名为', e);
    this.setState({username: e});
    if (
      e !== null && // 用户名和密码都填了才显示按钮可用
      e !== '' &&
      this.state.pwd !== null &&
      this.state.pwd !== ''
    ) {
      this.setState({buttonHidden: false});
    } else {
      this.setState({buttonHidden: true});
    }
  };
  changeInputPwd = e => {
    console.log('输入的密码为:', e);
    this.setState({pwd: e});
    if (
      e !== null &&
      e !== '' &&
      this.state.username !== null &&
      this.state.username !== ''
    ) {
      this.setState({buttonHidden: false});
    } else {
      this.setState({buttonHidden: true});
    }
  };
  handleLogInPress = () => {
    if (this.state.isChecked === false) {
      console.log('请查看并勾选相关协议!');
      //return ToastCheckBox();
      //Alert.alert('请查看并勾选相关协议!');
      this.toast.show('请查看并勾选相关协议!');
      return;
    }
    var username_md5 = md5Text.md5Text(this.state.username);
    console.log('加密之后的用户名为：', username_md5);
    var pwd_md5 = md5Text.md5Text(this.state.pwd);
    console.log('加密之后的密码为：', pwd_md5);

    let url =
      BaseUrl +
      '/checkUser?username=' +
      this.state.username +
      '&password=' +
      this.state.pwd;
    // this.state.pwd;
    //console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log('data=', data);
        if (data.user_id === -1) {
          //Alert.alert('用户名或密码错误!');
          this.toast.show('用户名或密码错误!');
        } else {
          SyncStorage.setValue('token', data.token);
          storage.save({
            key: 'userInfo',
            data: JSON.stringify(data),
            expires: null,
          }); //进行存储
          /*storage
            .load({
              key: 'userInfo',
              autoSync: true,
              syncInBackground: true,
            })
            .then(ret => {
              console.log('存储信息为:', JSON.parse(ret));
            })
            .catch(err => {
              console.warn(err.message);
              switch (err.name) {
                case 'NotFoundError':
                  break;
                case 'ExpiredError':
                  break;
              }
            });*/
          console.log(data.user_id);
          console.log(data.nickname);
          //Alert.alert('登陆成功!');
          this.toast.show('登陆成功!');
          var paras = {
            info: data, //存储完整的用户信息
            id: data.user_id,
            username: data.nickname,
            sex: data.sex,
            like: 10,
            fan: 100,
            gotLike: 1000,
            del: 0,
          };
          this.props.navigation.navigate('Main', paras);
        }
      })
      .catch(err => {
        console.log(err.message);
      });
    /*let test = BaseUrl + '/getBooks';
    fetch(test)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log('错误信息为:', error.message);
      });*/
    //alert('登录成功!');
  };
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle={'light-content'}
        />
        <Video
          source={require('../../../res/loginVideo.mp4')}
          style={styles.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode={'cover'}
          rate={1.0}
          ignoreSilentSwitch={'obey'}
        />
        <Image
          source={require('../../../res/logo-white.png')}
          resizeMode={'contain'}
          style={styles.logo}
        />
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={styles.title}>密码登录</Text>

          <TextInput
            placeholder={'请输入用户名/手机号'}
            style={styles.InputView}
            defaultValue={this.state.username.toString()}
            onChangeText={this.changeUserName}
          />

          <TextInput
            placeholder={'请输入密码'}
            style={styles.InputView}
            value={this.state.pwd.toString()}
            onChangeText={this.changeInputPwd}
            secureTextEntry={true}
          />

          <SAButton
            style={styles.InputButton}
            onPress={this.handleLogInPress}
            disabled={this.state.buttonHidden}>
            立即登录
          </SAButton>

          <View style={styles.otherOption}>
            <TouchableOpacity
              style={styles.Option1}
              onPress={this.Option1Press}>
              <Text style={styles.p}>忘记密码</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Option2}
              onPress={this.Option2Press}>
              <Text style={styles.p}>验证码注册</Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: '20%',
              marginLeft: 0,
              marginRight: 0,
              alignSelf: 'center',
            }}>
            <Image source={weChat} style={styles.imageLogo} />
            <Image source={QQ} style={styles.imageLogo} />
          </View>
          <View style={styles.Read}>
            <CheckBox
              checkBoxColor={'#888888'}
              isChecked={this.state.isChecked}
              onClick={this.handleBoxClick}
              testID={'checkBox'}
            />
            <Text style={styles.p}>
              我已阅读并同意&nbsp;
              <Text
                style={styles.FileName}
                onPress={() => {
                  this.props.navigation.navigate('File1');
                }}>
                用户协议
              </Text>
              &nbsp;与&nbsp;
              <Text
                style={styles.FileName}
                onPress={() => {
                  this.props.navigation.navigate('File2');
                }}>
                隐私政策
              </Text>
            </Text>
          </View>
        </View>
        <Toast
          ref={toast => (this.toast = toast)}
          style={{backgroundColor: 'rgba(28,148,234,0.8)'}}
          position="top"
          positionValue={190}
          fadeInDuration={750}
          fadeOutDuration={2000}
          opacity={0.8}
          textStyle={{color: '#ffffff'}}
        />
      </View>
    );
  }
}

const {height} = Dimensions.get('window');
const styles = StyleSheet.create({
  backgroundVideo: {
    height: height * 1.1,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  logo: {
    position: 'absolute',
    marginTop: 40,
    width: '50%',
    // height:,
    alignSelf: 'center',
  },
  title: {
    marginLeft: '10%',
    marginTop: '40%',
    marginBottom: 20,
    fontSize: 30,
    // fontWeight: 'bold',
    color: '#ffffff',
  },
  InputView: {
    paddingLeft: 30,
    backgroundColor: '#ffffff',
    height: 55,
    width: '84%',
    marginLeft: '8%',
    marginTop: 24,
    borderStyle: 'solid',
    borderColor: '#f3f3f3',
    borderWidth: 0,
    borderRadius: 50,
    fontSize: 17,
    fontWeight: '400',
  },
  InputButton: {
    backgroundColor: '#43CD93',
    height: 55,
    width: '84%',
    marginLeft: '8%',
    marginTop: 24,
    borderWidth: 0,
    borderRadius: 50,
    fontSize: 18,
    color: '#ffffff',
  },
  otherOption: {
    flexDirection: 'row',
    // marginLeft: '18%',
    marginTop: '5%',
    color: '#ffffff',
    alignSelf: 'center',
  },
  Option1: {
    marginLeft: '4%',
    height: 25,
    width: '23%',
    borderRightWidth: 1,
    borderRightColor: '#888888',
    borderStyle: 'solid',
  },
  Option2: {
    marginLeft: '7%',
  },
  imageLogo: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginRight: 20,
    alignSelf: 'center',
  },
  Read: {
    //position: 'absolute',
    flexDirection: 'row',
    // marginBottom: 10,
    alignSelf: 'center',
    marginTop: '24%',
  },
  FileName: {
    fontSize: 15,
    color: '#594F60',
  },
  p: {
    color: '#888888',
  },
});
