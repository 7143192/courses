import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import eye from '../../../res/eye.png';
import no_eye from '../../../res/no_eye.png';
import md5Text from '../../../components/Md5';
import SAButton from '../../../components/SAButton';
import GoBack from '../../../components/GoBack';
import DateTimePicker from '@react-native-community/datetimepicker';
import BaseUrl from '../../../utils/constants';
import Toast from 'react-native-easy-toast';

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      date: new Date(1657823000000),
      dateString: '',
      mode: 'date',
    };
  }

  showBirth = () => {
    this.setState({
      show: true,
    });
  };

  onChange = (event, selectedDate) => {
    let res =
      selectedDate.getFullYear() +
      '-' +
      `${selectedDate.getMonth() + 1}` +
      '-' +
      selectedDate.getDate();
    console.log(res);
    this.setState({
      show: false,
      date: selectedDate,
      dateString: res,
    });
    this.props.handleUserInput(res);
  };

  render() {
    const {show, date, mode, dateString} = this.state;
    return (
      <View>
        <TouchableOpacity
          onPress={this.showBirth}
          style={{
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
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: '400',
            }}>
            {dateString === '' ? '点击选择出生日期' : dateString}
          </Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={this.onChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    );
  }
}

class SexPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sex: '男',
    };
  }

  render() {
    const {sex} = this.state;
    return (
      <View
        style={{
          backgroundColor: '#ffffff',
          height: 55,
          width: '84%',
          marginLeft: '8%',
          marginTop: 24,
          borderStyle: 'solid',
          borderColor: '#f3f3f3',
          borderWidth: 0,
          borderRadius: 50,
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
        }}>
        <TouchableOpacity
          onPress={() => {
            this.setState({sex: '男'});
            this.props.handleUserInput('男');
          }}
          style={
            sex === '男' ? pageStyle.sexButtonSelect : pageStyle.sexButton
          }>
          <View style={pageStyle.sexContent}>
            <Text
              style={
                sex === '男' ? pageStyle.sexTextSelect : pageStyle.sexText
              }>
              男
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({sex: '女'});
            this.props.handleUserInput('女');
          }}
          style={
            sex === '女' ? pageStyle.sexButtonSelect : pageStyle.sexButton
          }>
          <View style={pageStyle.sexContent}>
            <Text
              style={
                sex === '女' ? pageStyle.sexTextSelect : pageStyle.sexText
              }>
              女
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class InfoInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.props.handleUserInput(e);
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder={this.props.text}
          style={pageStyle.textInfoStyle}
          onChangeText={this.handleChange}
        />
      </View>
    );
  }
}

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
          alignItems: 'center',
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

export default class AddUserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pwd: '',
      confirmPwd: '',
      nickname: '',
      sex: '男',
      birth: '',
      phone: '',
    };
  }

  componentDidMount() {
    console.log('传入该页的电话号码为' + this.props.route.params.phone);
    this.setState({phone: this.props.route.params.phone});
  }

  changeNickname = e => {
    console.log('用户名为:' + e);
    this.setState({
      nickname: e,
    });
  };

  changePwd = e => {
    this.setState({pwd: e});
  };

  changeConfirmPwd = e => {
    this.setState({confirmPwd: e});
  };

  changeSex = e => {
    console.log('性别' + e);
    this.setState({sex: e});
  };

  changeBirth = e => {
    console.log('生日' + e);
    this.setState({
      birth: e,
    });
  };
  TestPwd = () => {
    let pwd = this.state.pwd;
    var regex =
      '^(?=.*\\d)(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\\s\\u4e00-\\u9fa5]{8,16}';
    return pwd.toString().match(regex);
  };
  handleButtonPress = () => {
    if (this.state.nickname === '') {
      //Alert.alert('请输入昵称!');
      this.toast.show('请输入昵称!');
      return;
    }
    if (this.state.birth === '') {
      //Alert.alert('请选择出生日期!');
      this.toast.show('请选择出生日期!');
      return;
    }
    if (this.state.pwd === null || this.state.pwd === '') {
      //Alert.alert('请输入新密码!');
      this.toast.show('请输入新密码!');
      return;
    }
    if (!this.TestPwd()) {
      /*Alert.alert(
        '密码格式应为8-16个字符,不包含空格,必须包含数字,字母或字符至少两种!',
      );*/
      this.toast.show(
        '密码格式应为8-16个字符,不包含空格,必须包含数字,字母或字符至少两种!',
      );
      return;
    }
    if (this.state.confirmPwd === null || this.state.confirmPwd === '') {
      //Alert.alert('请再次确认新密码!');
      this.toast.show('请再次确认新密码!');
      return;
    }
    if (this.state.pwd !== this.state.confirmPwd) {
      //Alert.alert('两次输入的密码不同!');
      this.toast.show('两次输入的密码不同!');
      return;
    }
    var phone_md5 = md5Text.md5Text(this.state.phone);
    console.log('用户名：' + phone_md5);
    var pwd_md5 = md5Text.md5Text(this.state.pwd);
    console.log('密码：' + pwd_md5);
    let url =
      BaseUrl +
      '/addUser?nickname=' +
      this.state.nickname +
      '&phone=' +
      this.state.phone +
      '&password=' +
      this.state.pwd +
      '&sex=' +
      this.state.sex +
      '&birth=' +
      this.state.birth;
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data === 2) {
          //Alert.alert('该昵称已被注册');
          this.toast.show('该昵称已被注册!');
          return;
        } else if (data === 0) {
          //Alert.alert('注册成功，即将返回登陆界面');
          this.toast.show('注册成功!');
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

        <InfoInput text={'昵称'} handleUserInput={this.changeNickname} />

        <DatePicker handleUserInput={this.changeBirth} />

        <SexPicker handleUserInput={this.changeSex} />

        <ForgetPwdInput
          text={'请输入至少8位新密码:'}
          handleUserInput={this.changePwd}
        />

        <ForgetPwdInput
          text={'确认密码:'}
          handleUserInput={this.changeConfirmPwd}
        />

        <SAButton
          style={styles.ButtonStyle}
          onPress={this.handleButtonPress}
          testID={'confirm'}>
          立即注册
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
  sexButton: {
    width: '50%',
    backgroundColor: '#ffffff',
    height: '100%',
    alignItems: 'center',
  },
  sexContent: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sexTextSelect: {
    fontSize: 17,
    fontWeight: '400',
    color: '#ffffff',
  },
  sexText: {
    fontSize: 17,
    fontWeight: '400',
  },
  sexButtonSelect: {
    width: '50%',
    backgroundColor: '#43CD93',
    height: '100%',
    alignItems: 'center',
  },
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
