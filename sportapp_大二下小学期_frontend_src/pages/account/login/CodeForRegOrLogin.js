import {
  Alert,
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SAButton from '../../../components/SAButton';
import Title from '../../../components/Title';
import GoBack from '../../../components/GoBack';
import md5Text from '../../../components/Md5';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import validator from '../../../utils/validator';
import Video from 'react-native-video';
import weChat from '../../../res/weChat.png';
import QQ from '../../../res/QQ.png';
import CheckBox from 'react-native-check-box';
import BaseUrl from '../../../utils/constants';
import storage from '../../../utils/Storage';
import Toast from 'react-native-easy-toast';
import SyncStorage from '../../../utils/syncStorage';

export default class CodeForRegOrLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      phoneValid: false,
      showLogin: true,
      vcodeText: '',
      btnText: '重新获取',
      isCountDowning: false,
      isChecked: false,
      isNew: true,
    };
  }
  repGetVCode = () => {
    if (this.state.isCountDowning) {
      return;
    }
    let url = BaseUrl + '/sendMsm?phone=' + this.state.phoneNumber;
    fetch(url)
      .then(response => response.json())
      .then(data => {});
    this.countDown();
  };

  countDown = () => {
    this.setState({
      isCountDowning: true,
    });
    let seconds = 30;
    this.setState({
      btnText: `重新获取(${seconds}s)`,
    });
    let timeId = setInterval(() => {
      seconds--;
      this.setState({
        btnText: `重新获取(${seconds}s)`,
      });
      if (seconds === 0) {
        clearInterval(timeId);
        this.setState({
          btnText: '重新获取',
          isCountDowning: false,
        });
      }
    }, 1000);
  };

  handleGetCodePress = () => {
    if (!this.state.phoneValid) {
      Alert.alert('请输入正确的电话号码');
      console.log('电话无效');
      return;
    }
    if (!this.state.isChecked) {
      Alert.alert('请勾选同意协议');
      console.log('请勾选同意协议');
      return;
    }
    let phone_md5 = md5Text.md5Text(this.state.phoneNumber);
    let url = BaseUrl + '/checkPhone?phone=' + phone_md5;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('checkPhone返回的data=', data);
          console.log('isNew1  ' + data);
          this.setState({
            isNew: true,
          });
        } else {
          console.log('isNew2  ' + data);
          this.setState({
            isNew: false,
          });
        }
      });
    let url2 = BaseUrl + '/sendMsm?phone=' + this.state.phoneNumber;
    fetch(url2)
      .then(response => response.json())
      .then(data => {});
    this.setState({
      showLogin: false,
    });
    this.countDown();
  };

  phoneNumberChangeText = phoneNumber => {
    console.log('进入了CodeForRegOrLogin页面的change函数!');
    console.log('输入的电话号码为:', phoneNumber);
    const valid = validator.validatePhone(phoneNumber);
    this.setState({
      phoneNumber: phoneNumber,
      phoneValid: valid,
    });
  };

  phoneNumberSubmitEditing = () => {
    const phoneNumber = this.state.phoneNumber;
    console.log(phoneNumber);
    const valid = validator.validatePhone(phoneNumber);
    console.log(valid);
    this.setState({
      phoneValid: valid,
    });
  };

  VCodeSubmitEditing = () => {
    const {vcodeText, phoneNumber} = this.state;
    if (vcodeText.length !== 6) {
      return;
    }
    let url =
      BaseUrl + '/checkCode?phone=' + phoneNumber + '&code=' + vcodeText;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          if (this.state.isNew) {
            this.props.navigation.navigate('AddUserInfo', {
              Title: '填写个人信息',
              phone: phoneNumber,
            });
          } else {
            var phone_md5 = md5Text.md5Text(this.state.phoneNumber);
            let url1 = BaseUrl + '/getUserByPhone?phone=' + phone_md5;
            fetch(url1)
              .then(response => response.json())
              .then(data => {
                console.log('data=', data);
                SyncStorage.setValue('token', data.token);
                storage.save({
                  key: 'userInfo',
                  data: JSON.stringify(data),
                  expires: null,
                }); //进行存储
                console.log(data.user_id);
                console.log(data.nickname);
                Alert.alert('登陆成功!');
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
              })
              .catch(err => {
                console.log(err.message);
              });
          }
        } else {
          Alert.alert('验证码错误!');
          console.log('验证码错误');
        }
      });
  };

  Option1Press = () => {
    this.props.navigation.goBack();
  };

  handleBoxClick = () => {
    var stat = this.state.isChecked;
    this.setState({isChecked: !stat});
  };

  onVCodeChange = vcodeText => {
    this.setState({vcodeText: vcodeText});
  };

  returnLogin = () => {
    return (
      <View>
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
        <Text style={styles.title}>手机号登录/注册</Text>

        <TextInput
          placeholder={'请输入您的手机号码'}
          style={styles.InputView}
          onSubmitEditing={this.phoneNumberSubmitEditing}
          onChangeText={this.phoneNumberChangeText}
        />

        <SAButton style={styles.InputButton} onPress={this.handleGetCodePress}>
          获取验证码
        </SAButton>
        <View
          style={{
            marginTop: 25,
            alignSelf: 'center',
          }}>
          <Text style={styles.p} onPress={this.Option1Press}>
            密码登录
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: '44%',
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
            testID={'checkBox1'}
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
    );
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  returnVCode = () => {
    return (
      <View>
        <GoBack PressGoBack={this.handleGoBack} />
        <Text style={{...styles.title, marginTop: '20%'}}>输入验证码</Text>
        <View style={{marginTop: 15, marginLeft: '10%'}}>
          <Text style={{color: '#777'}}>
            已发送到:+86 {this.state.phoneNumber}
          </Text>
        </View>
        <View>
          <CodeField
            value={this.state.vcodeText}
            onSubmitEditing={this.VCodeSubmitEditing}
            onChangeText={this.onVCodeChange}
            cellCount={6}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
            testID={'inputCode'}
          />
        </View>
        <View style={{marginTop: 15}}>
          <SAButton
            onPress={this.VCodeSubmitEditing}
            style={styles.InputButton}>
            确认
          </SAButton>
          <TouchableOpacity // 重新获取验证码
            disabled={this.state.isCountDowning}
            onPress={this.repGetVCode}
            style={{
              marginTop: 25,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: '#888',
              }}>
              {this.state.btnText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View>
        <View
          style={{backgroundColor: '#473f4d', height: '100%', width: '100%'}}>
          {this.state.showLogin ? this.returnLogin() : this.returnVCode()}
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
  codeFiledRoot: {
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
  },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    color: '#7a7280',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#7a7280',
    color: '#7a7280',
  },
  logo: {
    position: 'absolute',
    marginTop: 40,
    width: '50%',
    // height:,
    alignSelf: 'center',
  },
  backgroundVideo: {
    height: height * 1.1,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'stretch',
    bottom: 0,
    right: 0,
  },
  p: {
    color: '#888888',
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
    marginTop: '30%',
  },
  FileName: {
    fontSize: 15,
    color: '#594F60',
  },
});
