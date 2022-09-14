import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  ImageBackgroundComponent,
  TouchableWithoutFeedback,
} from 'react-native';
import back1 from '../../../res/back1.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import md5Text from '../../../components/Md5';
import eye from '../../../res/eye.png';
import no_eye from '../../../res/no_eye.png';
import SAButton from '../../../components/SAButton';
import GoBack from '../../../components/GoBack';
import Toast from 'react-native-easy-toast';
import BaseUrl from '../../../utils/constants';

class ForgetPwdInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageState: false,
    };
  }

  handleChange = e => {
    console.log('输入的内容为：', e);
    this.props.handleUserInput(e);
  };

  onPressChange = () => {
    this.setState({
      imageState: !this.state.imageState,
    });
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
        }}>
        <TextInput
          placeholder={this.props.text}
          secureTextEntry={!this.state.imageState} //是否隐藏
          style={pageStyle.textInfoStyle}
          onChangeText={this.handleChange}
        />
        <TouchableWithoutFeedback // 是否显示密码
          onPress={this.onPressChange}>
          {this.state.imageState ? (
            <Image
              style={{
                width: 21,
                height: 14,
                alignSelf: 'center',
                position: 'absolute',
                top: '58%',
                right: '15%',
              }}
              source={eye}
            />
          ) : (
            <Image
              style={{
                width: 20,
                height: 8,
                alignSelf: 'center',
                position: 'absolute',
                top: '58%',
                right: '15%',
              }}
              source={no_eye}
            />
          )}
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

export default class ResetPwd extends React.Component {
  // state = {
  //   pwd: '',
  //   confirmPwd: '',
  //   phone: '',
  // };
  constructor(props) {
    super(props);
    this.state = {
      pwd: '',
      confirmPwd: '',
      phone: '',
    };
  }
  changePwd = e => {
    this.setState({pwd: e});
  };
  changeConfirmPwd = e => {
    this.setState({confirmPwd: e});
  };
  TestPwd = () => {
    let pwd = this.state.pwd;
    var regex =
      '^(?=.*\\d)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\\s\\u4e00-\\u9fa5]{8,16}';
    return pwd.toString().match(regex);
  };
  componentDidMount = () => {
    this.setState({
      phone: this.props.route.params.phone,
    });
    console.log('传入号码' + this.state.phone);
  };

  handleButtonPress = () => {
    if (this.state.pwd === null || this.state.pwd === '') {
      this.toast.show('请输入新密码!');
      return;
    }
    if (!this.TestPwd()) {
      this.toast.show(
        '密码格式应为8-16个字符,不包含空格,必须包含数字,字母或字符至少两种!',
      );
      return;
    }
    if (this.state.confirmPwd === null || this.state.confirmPwd === '') {
      //alert('请再次确认新密码!');
      this.toast.show('请再次确认新密码!');
      return;
    }
    if (this.state.pwd !== this.state.confirmPwd) {
      //alert('两次输入的密码不同!');
      this.toast.show('两次输入的密码不同!');
      return;
    }
    var phone_md5 = md5Text.md5Text(this.state.phone);
    var pwd_md5 = md5Text.md5Text(this.state.pwd);
    let url = BaseUrl + '/changePwd?phone=' + phone_md5 + '&newPwd=' + pwd_md5;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          console.log('Change Pwd Fail!');
        } else {
          alert('修稿密码成功，返回登陆');
          console.log('Change Pwd Success');
          this.props.navigation.navigate('PwdLogIn');
        }
      });
  };
  handleGoBack = () => {
    this.props.navigation.goBack();
  };
  render() {
    return (
      <View style={{backgroundColor: '#473f4d', height: '100%', width: '100%'}}>
        <GoBack PressGoBack={this.handleGoBack} />

        <Text style={styles.title}>{this.props.route.params.Title}</Text>

        <ForgetPwdInput
          text={'请输入至少六位新密码:'}
          handleUserInput={this.changePwd}
        />

        <ForgetPwdInput
          text={'再次确认:'}
          handleUserInput={this.changeConfirmPwd}
        />

        <SAButton
          style={styles.ButtonStyle}
          onPress={this.handleButtonPress}
          testID={'confirm'}>
          确认修改
        </SAButton>
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

const pageStyle = StyleSheet.create({
  textInfoStyle: {
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
  textStyle: {
    alignSelf: 'center',
    marginLeft: 10,
    color: '#343434',
    fontSize: 16,
  },
});

const styles = StyleSheet.create({
  title: {
    marginLeft: '10%',
    marginTop: '20%',
    marginBottom: 20,
    fontSize: 30,
    // fontWeight: 'bold',
    color: '#ffffff',
  },
  InputStyle: {
    width: '80%',
    marginLeft: '10%',
    marginTop: 30,
  },
  ButtonStyle: {
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
});
