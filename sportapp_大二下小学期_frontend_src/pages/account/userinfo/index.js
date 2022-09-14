import React, {Component} from 'react';
import {View, Text, StyleSheet, TextInput, ImageBackground} from 'react-native';
import Input from 'react-native-custom-input';
import SAButton from '../../../components/SAButton';
import back1 from '../../../res/back1.png';
import validator from '../../../utils/validator';
import NewInput from '../../../components/NewInput';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneValid: true,
      phone: '',
      username: '',
      pwd: '',
      confirmPwd: '',
    };
  }
  PhoneChange = e => {
    console.log(e);
    this.setState({phone: e});
    console.log('phone=', this.state.phone);
  };
  UserNameChange = e => {
    console.log(e);
    this.setState({username: e});
  };
  PwdChange = e => {
    console.log(e);
    this.setState({pwd: e});
  };
  confirmPwdChange = e => {
    console.log(e);
    this.setState({confirmPwd: e});
  };
  phoneNumberSubmitEditing = () => {
    /*if (this.state.phone === '') {
      this.setState({phoneValid: false});
      return;
    }
    const phoneNumber = this.state.phone;
    console.log(phoneNumber);
    const valid = validator.validatePhone(phoneNumber);
    console.log(valid);
    this.setState({
      phoneValid: valid,
    });*/
  };
  handleButtonSubmit = () => {
    if (this.state.phone === null || this.state.phone === '') {
      // eslint-disable-next-line no-alert
      alert('请输入手机号码！');
      return;
    }
    var phoneNumber = this.state.phone;
    console.log(phoneNumber);
    const valid = validator.validatePhone(phoneNumber);
    console.log(valid);
    if (valid === false) {
      // eslint-disable-next-line no-alert
      alert('手机号码格式不正确！');
    }
    if (this.state.pwd === null || this.state.pwd === '') {
      // eslint-disable-next-line no-alert
      alert('请输入新密码！');
      return;
    }
    if (this.state.confirmPwd === null || this.state.confirmPwd === '') {
      // eslint-disable-next-line no-alert
      alert('请确认输入的密码！');
      return;
    }
    if (this.state.pwd !== this.state.confirmPwd) {
      // eslint-disable-next-line no-alert
      alert('两次输入的密码不符!');
      return;
    }
    this.props.navigation.navigate('Main');
  };
  render = () => {
    return (
      <ImageBackground source={back1} style={{width: '100%', height: '100%'}}>
        <View style={{flex: 1, flexDirection: 'column', marginTop: '40%'}}>
          <Text style={styles.title}>完善个人信息</Text>
          <View style={{flexDirection: 'column', marginTop: '8%'}}>
            <View style={{width: '80%', marginLeft: '7%', marginTop: '3%'}}>
              <Input
                placeholder={'请输入手机号码'}
                label={'手机号码:'}
                keyboardType={'phone-pad'}
                required={true}
                textInputStyle={{fontSize: 12}}
                onChange={this.PhoneChange}
                value={this.state.phone || ''}
                errorMessage={this.state.phoneValid ? '' : '手机格式不正确'}
              />
            </View>
            <View style={{width: '80%', marginLeft: '7%', marginTop: '3%'}}>
              <Input
                placeholder={'请输入用户名'}
                label={'用户名:'}
                required={false}
                textInputStyle={{fontSize: 12}}
                value={this.state.username || ''}
                onChange={this.UserNameChange}
              />
            </View>
            <View style={{width: '80%', marginLeft: '7%', marginTop: '3%'}}>
              <NewInput
                placeholder={'请输入新密码'}
                label={'输入密码:'}
                keyboardType={'phone-pad'}
                required={true}
                textInputStyle={{fontSize: 12}}
                value={this.state.pwd || ''}
                onChange={this.PwdChange}
              />
            </View>
            <View style={{width: '80%', marginLeft: '7%', marginTop: '3%'}}>
              <NewInput
                placeholder={'请再次输入密码'}
                label={'确认密码:'}
                keyboardType={'phone-pad'}
                required={true}
                textInputStyle={{fontSize: 12}}
                value={this.state.confirmPwd || ''}
                onChange={this.confirmPwdChange}
              />
            </View>
          </View>
          <SAButton
            style={styles.ButtonStyle}
            onPress={this.handleButtonSubmit}>
            提交信息
          </SAButton>
        </View>
      </ImageBackground>
    );
  };
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: '#050505',
    marginLeft: '27%',
    marginTop: '7%',
  },
  InputStyle: {
    height: 50,
    width: '80%',
    marginTop: '5%',
    marginLeft: '8%',
  },
  ButtonStyle: {
    height: '7%',
    width: '80%',
    borderRadius: 30,
    marginLeft: '7%',
    marginTop: '4%',
  },
});

export default Index;
