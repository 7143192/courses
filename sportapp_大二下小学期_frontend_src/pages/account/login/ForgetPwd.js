import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import SAButton from '../../../components/SAButton';
import GoBack from '../../../components/GoBack';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import validator from '../../../utils/validator';
import BaseUrl from '../../../utils/constants';
import md5Text from '../../../components/Md5';
import date from '../../../utils/date';
export default class ForgetPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneNumber: '',
      phoneValid: false,
      showLogin: true,
      vcodeText: '',
      btnText: '重新获取',
      isCountDowning: false,
    };
  }
  repGetVCode = () => {
    if (this.state.isCountDowning) {
      return;
    }
    this.countDown();
  };

  countDown = () => {
    this.setState({
      isCountDowning: true,
    });
    let seconds = 5;
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
    if(!this.state.phoneValid){
      Alert.alert('请输入正确的电话号码');
      console.log('电话无效' + this.state.phoneValid);
      return;
    }
    let phone_md5 = md5Text.md5Text(this.state.phoneNumber)
    let url =  BaseUrl + '/checkPhone?phone=' + phone_md5;
    fetch(url)
        .then(response => response.json())
        .then(data => {
          if (data) {
            Alert.alert('未找到用户，请检查电话号码');
          }
          else {
            let url2 = BaseUrl + '/sendMsm?phone=' + this.state.phoneNumber;
            fetch(url2)
                .then(response => response.json())
                .then(data => {});
            this.setState({
              showLogin: false,
            });
            this.countDown();
          }
        });
  };

  phoneNumberChangeText = phoneNumber => {
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
        .then(date => {
          if(date){
            let p = {
              Title: '重置密码',
              phone: phoneNumber,
            };
            console.log('准备传入' + p.phone);
            this.props.navigation.navigate('ResetPwd', p);
          }
          else {
            Alert.alert('验证码错误!');
            console.log('验证码错误');
          }
        });
  };

  onVCodeChange = vcodeText => {
    this.setState({vcodeText: vcodeText});
  };

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  returnLogin = () => {
    return (
        <View>
          <GoBack PressGoBack={this.handleGoBack} testID={'back'} />
          <Text style={styles.title}>忘记密码</Text>

          <TextInput
              placeholder={'请输入您的手机号码'}
              style={styles.InputView}
              onSubmitEditing={this.phoneNumberSubmitEditing}
              onChangeText={this.phoneNumberChangeText}
          />

          <SAButton style={styles.InputButton} onPress={this.handleGetCodePress}>
            获取验证码
          </SAButton>
        </View>
    );
  };

  returnVCode = () => {
    return (
        <View>
          <GoBack PressGoBack={this.handleGoBack} />
          <Text style={styles.title}>输入验证码</Text>
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
        <View style={{backgroundColor: '#473f4d', height: '100%', width: '100%'}}>
          {this.state.showLogin ? this.returnLogin() : this.returnVCode()}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginLeft: '10%',
    marginTop: '20%',
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
});
