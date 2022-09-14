import React, {useState} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import left from '../../../../res/leftArrow2.png';
import share from '../../../../res/share1.png';
import Title from '../../../../components/Title';
import change1 from '../../../../res/change1.png';
import SAButton from '../../../../components/SAButton';
import GoBack from '../../../../components/GoBack';
import BaseUrl from '../../../../utils/constants';
import storage from '../../../../utils/Storage';
import SyncStorage from "../../../../utils/syncStorage";

class HideInput extends React.Component {
  render() {
    return (
      <View>
        <TextInput
          placeholder={this.props.text}
          style={styles.inputStyle}
          keyboardType={'phone-pad'}
          onChangeText={e => this.props.handleInputChange(e)}
        />
      </View>
    );
  }
}

class ChangeImg extends React.Component {
  render() {
    if (this.props.changing === false) {
      return null;
    }
    return (
      <TouchableOpacity>
        <Image
          source={change1}
          style={{width: 20, height: 20, marginTop: 30, marginLeft: 50}}
        />
      </TouchableOpacity>
    );
  }
}

export default class HealthData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      changing: true,
      weight: 60,
      h: 180,
      BMI: 25,
      score: 98,
    };
  }
  componentDidMount = () => {
    let items = this.props.route.params.data;
    this.setState({
      id: items.user_id,
      changing: false,
      info: items,
      h: items.height,
      BMI: items.bmi,
      weight: items.weight,
    });
  };

  PressGoBack = () => {
    this.props.navigation.goBack();
  };
  handleChanging = () => {
    this.setState({changing: !this.state.changing});
  };
  ChangeWeight = e => {
    let url =
      BaseUrl +
      '/changeBasicInfo?id=' +
      this.state.id +
      '&height=' +
      this.state.h +
      '&weight=' +
      e +
      '&bmi=' +
      this.state.BMI;
    fetch(url,{
      headers: {
        'token': SyncStorage.getValue('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({weight: e});
      });
  };
  ChangeHeight = e => {
    let url =
      BaseUrl +
      '/changeBasicInfo?id=' +
      this.state.id +
      '&height=' +
      e +
      '&weight=' +
      this.state.weight +
      '&bmi=' +
      this.state.BMI;
    fetch(url,{
      headers: {
        'token': SyncStorage.getValue('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        storage.remove({key: 'userInfo'});
        storage.save({
          key: 'userInfo',
          data: JSON.stringify(data),
          expires: null,
        }); //更新内存中的用户信息
        this.setState({h: e});
      });
  };
  ChangeBMI = e => {
    let url =
      BaseUrl +
      '/changeBasicInfo?id=' +
      this.state.id +
      '&height=' +
      this.state.h +
      '&weight=' +
      this.state.weight +
      '&bmi=' +
      e;
    fetch(url,{
      headers: {
        'token': SyncStorage.getValue('token')
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({BMI: e});
      });
  };
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <GoBack
          PressGoBack={this.PressGoBack}
          black={1}
          text={'健康数据'}
          arrowStyle={{
            marginTop: 30,
            marginLeft: 15,
            marginBottom: 0,
          }}
        />
        {/*<Title title={'健康数据'} PressGoBack={this.PressGoBack} style={{marginTop:5}} />*/}
        <View
          style={{
            flex: 11,
            flexDirection: 'column',
            height: '90%',
            marginTop: '5%',
            backgroundColor: '#ffffff',
            alignItems: 'center',
          }}>
          <View style={styles.detail}>
            {this.state.changing === false ? (
              <Text style={styles.word}>
                身高:&nbsp;&nbsp;<Text style={styles.data}>{this.state.h}</Text>
                &nbsp;&nbsp;CM
              </Text>
            ) : (
              <HideInput
                text={'输入新的身高...'}
                handleInputChange={this.ChangeHeight}
              />
            )}
            <ChangeImg changing={this.state.changing} />
          </View>
          <View style={styles.detail}>
            {this.state.changing === false ? (
              <Text style={styles.word}>
                体重:&nbsp;&nbsp;&nbsp;&nbsp;
                <Text style={styles.data}>{this.state.weight}</Text>
                &nbsp;&nbsp;&nbsp;&nbsp;KG
              </Text>
            ) : (
              <HideInput
                text={'输入新的体重...'}
                handleInputChange={this.ChangeWeight}
              />
            )}
            <ChangeImg changing={this.state.changing} />
          </View>
          <View style={styles.detail}>
            {this.state.changing === false ? (
              <Text style={styles.word}>
                BMI指数:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Text style={styles.data}>{this.state.BMI}</Text>
              </Text>
            ) : (
              <HideInput
                text={'输入新的BMI...'}
                handleInputChange={this.ChangeBMI}
              />
            )}
            <ChangeImg changing={this.state.changing} />
          </View>
          <View style={styles.detail}>
            <Text style={styles.word}>
              健康指数:&nbsp;&nbsp;&nbsp;&nbsp;
              <Text style={styles.data}>{this.state.score}</Text>&nbsp;分
            </Text>
          </View>
          <SAButton style={styles.buttonStyle} onPress={this.handleChanging}>
            {this.state.changing ? '修改完成' : '修改信息'}
          </SAButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
  },
  detail: {
    fontSize: 18,
    color: '#050505',
    height: 60,
    width: '80%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
  },
  word: {
    marginTop: 25,
    marginLeft: '25%',
    fontSize: 18,
    color: '#050505',
  },
  data: {
    color: 'rgba(28,148,234,0.8)',
    fontSize: 24,
  },
  buttonStyle: {
    height: '8%',
    width: '60%',
    borderRadius: 30,
    marginTop: '2%',
  },
  inputStyle: {
    height: 50,
    width: 140,
    borderStyle: 'solid',
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 50,
  },
});
