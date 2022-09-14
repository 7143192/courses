import * as React from 'react';
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  StatusBar,
  TextInput,
  Modal,
} from 'react-native';
import change from '../../../../res/changeButton.png';
import deleteButton from '../../../../res/delete.png';
import left from '../../../../res/leftArrow1.png';
import DarkenImage from '../../../../components/DarkenImage';
import BaseUrl from '../../../../utils/constants';
import storage from '../../../../utils/Storage';
import emptyDongTai from '../../../../res/emptyDongTai.png';
import SyncStorage from '../../../../utils/syncStorage';
import Toast from 'react-native-easy-toast';
import ImageViewer from 'react-native-image-zoom-viewer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RNFS from 'react-native-fs';

class DongTaiImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Img: [],
    };
  }
  componentDidMount = () => {
    this.setState({Img: this.props.img});
  };

  render = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        {this.state.Img.map((item, index) => {
          return (
            <Image
              style={{
                width: 90,
                height: 90,
                marginLeft: 20,
                marginTop: 10,
              }}
              source={{uri: item.img}}
              key={index}
            />
          );
        })}
      </View>
    );
  };
}

class DongTai extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleted: false,
    };
  }
  PressDelete = () => {
    let url = BaseUrl + '/delMoment?momentId=' + this.props.id;
    console.log('delUrl=', url);
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.props.handleDelete();
        this.setState({deleted: true});
      });
  };
  render() {
    if (this.state.deleted === true) {
      return null;
    }
    return (
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#fff',
          paddingBottom: 15,
          marginTop: 10,
        }}>
        <View style={{flexDirection: 'row', marginTop: '5%'}}>
          <Image
            source={{uri: this.props.header}}
            style={{width: 50, height: 50, borderRadius: 30, marginLeft: '4%'}}
          />
          <View
            style={{
              flexDirection: 'column',
              marginTop: '2%',
              marginLeft: '2%',
            }}>
            <Text style={{color: '#343434'}}>{this.props.username}</Text>
            <Text>{this.props.time}</Text>
          </View>
          <TouchableOpacity onPress={this.PressDelete}>
            <Image
              source={deleteButton}
              style={{width: 20, height: 20, marginLeft: '45%'}}
              testID={'deleteButton'}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: '5%', marginTop: 8}}>
          <Text style={{color: '#050505', fontSize: 16}}>
            {this.props.text}
          </Text>
        </View>
        <DongTaiImage img={this.props.img} />
        <View style={{flexDirection: 'row', marginLeft: '6%', marginTop: 5}}>
          <Text style={{marginLeft: 0, fontSize: 12}}>
            <Text>1000</Text>点赞
          </Text>
          <Text style={{marginLeft: '56%', fontSize: 12}}>
            <Text>2.5</Text>万人浏览
          </Text>
        </View>
      </View>
    );
  }
}

class HideInput extends React.Component {
  render() {
    return (
      <View>
        <TextInput
          placeholder={this.props.text}
          style={styles.inputStyle}
          //keyboardType={'phone-pad'}
          onChangeText={e => this.props.handleInputChange(e)}
          onBlur={this.props.handleBlur}
        />
      </View>
    );
  }
}

class EmptyDongTai extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
        <Image source={emptyDongTai} style={{width: 100, height: 100}} />
        <Text style={{}}>您还没有发布动态!</Text>
        <Text style={{}}>
          快去&nbsp;<Text style={{color: 'rgba(28,148,234,0.8)'}}>社区</Text>
          &nbsp;去分享自己的运动吧!
        </Text>
      </View>
    );
  }
}

export default class UserInformation extends React.Component {
  static len1 = 0;
  static partSize1 = 2;
  constructor(props) {
    super(props);
    this.state = {
      username: '用户名',
      userid: 0,
      background: '',
      header: '',
      birth: '',
      changeBirth: false,
      changeName: false,
      momentList: [],
      noMore: false,
      handleHeader: false,
      showHeader: false,
      changeHeader: false,
      tmpHeader: '',
    };
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
  };
  handleDelete = () => {
    this.getDetailInfo();
    //this.setState({});
  };
  onScroll = ({nativeEvent}) => {
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      1;
    if (isReachBottom) {
      this.getPartMoments();
    }
  };
  getPartMoments = () => {
    let url =
      BaseUrl +
      '/getPartUserMoments?userId=' +
      this.props.route.params.id +
      '&cur=' +
      UserInformation.len1 +
      '&size=' +
      UserInformation.partSize1;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('取得的数据为:', data);
        this.setState({
          username: this.props.route.params.username,
          userid: this.props.route.params.id,
          header: this.props.route.params.info.header,
          background: this.props.route.params.info.background,
          birth: this.props.route.params.info.birth,
          momentList: [...this.state.momentList, ...data],
        });
        UserInformation.len1 += UserInformation.partSize1;
        if (data.length < UserInformation.partSize1) {
          this.setState({noMore: true});
        } else {
          this.setState({noMore: false});
        }
        if (this.state.noMore === true) {
          this.toast.show('没有更多动态了!');
        } else {
          this.toast.show('Loading...');
        }
      });
  };
  getDetailInfo = () => {};
  componentDidMount = () => {
    UserInformation.len1 = 0;
    this.getPartMoments();
  };
  onCancel = () => {
    this.setState({
      handleHeader: false,
    });
  };
  onChangeCancel = () => {
    this.setState({
      changeHeader: false,
      handleHeader: true,
    });
  };
  onHeaderClick = () => {
    this.setState({
      handleHeader: true,
    });
  };
  takePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      res => {
        console.log('takePhoto的结果为:', res);
        console.log('takePhoto函数输出内容:', res.assets);
        console.log('takePhoto函数输出内容:', res.assets[0]);
        if (res.didCancel) {
          return;
        }
        RNFS.readFile(res.assets[0].uri, 'base64')
          .then(content => {
            res.assets[0].base64 = content;
            this.setState({tmpHeader: res.assets[0]});
            this.submitChange();
          })
          .catch(err => {
            console.log('reading error: ' + err);
          });
      },
    );
  };

  addPhoto = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // 'photo' or 'video' or 'mixed'
        selectionLimit: 1, // 1为一张，0不限制数量
        includeBase64: true,
      },
      res => {
        console.log('addPhoto函数输出内容:', res.assets);
        console.log(res.assets);
        if (res.didCancel) {
          return;
        }
        console.log('res-assets[0]=', res.assets[0]);
        this.setState({tmpHeader: res.assets[0]});
        this.submitChange();
      },
    );
  };

  submitChange = () => {
    const {userid} = this.state;
    console.log(userid);
    //let url =
    //BaseUrl + '/addMoment?userId=' + userid + '&content=' + textContent;
    let url = BaseUrl + '/changeHeader?userId=' + userid;
    /*let fetchBody = new URLSearchParams();
        Object.keys(this.state.tmpImgList).forEach(key =>
          fetchBody.set(key, this.state.tmpImgList[key]),
        );*/
    let fileMsg = {
      name: this.state.tmpHeader.fileName,
      base64: this.state.tmpHeader.base64,
    };
    let formBody = new FormData();
    let tmpArr = [];
    tmpArr.push(fileMsg);
    formBody.append('headerBase64', JSON.stringify(tmpArr));
    fetch(url, {
      method: 'post',
      headers: {
        token: SyncStorage.getValue('token'),
        'content-Type': 'multipart/form-data',
      },
      body: formBody,
    })
      .then(response => response.json())
      .then(data => {
        storage.remove('userInfo');
        storage.save({
          key: 'userInfo',
          data: JSON.stringify(data),
          expires: null,
        });
        this.setState({
          header: data.header,
          changeHeader: false,
          handleHeader: false,
        });
        this.props.navigation.reset({
          routes: [
            {
              name: 'Main',
              params: {pagename: 'My'},
            },
          ],
        });
      });
  };

  viewHeader = () => {
    console.log(this.state.header);
    this.setState({
      showHeader: true,
    });
  };
  handleBirthChangePress = () => {
    this.setState({changeBirth: true});
  };
  handleBirthChange = e => {
    console.log('输入的生日为:', e);
    this.setState({birth: e});
  };
  handleBirthBlur = () => {
    let url =
      BaseUrl +
      '/changeBirth?id=' +
      this.props.route.params.info.user_id +
      '&birth=' +
      this.state.birth;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        storage.remove({key: 'userInfo'});
        storage.save({
          key: 'userInfo',
          data: JSON.stringify(data),
          expires: null,
        }); //更新内存中存储的信息
        this.setState({changeBirth: false});
      });
  };
  render() {
    const {handleHeader, showHeader, changeHeader} = this.state;
    return (
      <View style={{flexDirection: 'column', width: '100%', height: '100%'}}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle={'light-content'}
        />
        <View style={{position: 'absolute', width: '100%', height: '38%'}}>
          <DarkenImage
            source={this.state.background}
            style={{width: '100%', height: '100%'}}
            transparency={0.7}
          />
        </View>

        <ScrollView onScroll={this.onScroll}>
          <View
            style={{
              flexDirection: 'column',
              marginLeft: '3%',
              marginTop: '10%',
            }}>
            <TouchableOpacity onPress={this.handleBackPress}>
              <Image source={left} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                marginTop: '15%',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={this.onHeaderClick}>
                <Image
                  source={{uri: this.state.header}}
                  style={{width: 90, height: 90, borderRadius: 45}}
                />
              </TouchableOpacity>
              <View style={{flexDirection: 'column', marginLeft: 10}}>
                <Text style={{fontSize: 30, color: '#ffffff'}}>
                  {this.state.username}
                </Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {this.state.changeBirth ? (
                    <HideInput
                      handleInputChange={this.handleBirthChange}
                      text={'YYYY-MM-DD'}
                      handleBlur={this.handleBirthBlur}
                    />
                  ) : (
                    <Text style={{fontSize: 14, color: '#999'}}>
                      生日:
                      <Text style={{fontSize: 14, color: '#999'}}>
                        {this.state.birth}
                      </Text>
                    </Text>
                  )}
                  <TouchableOpacity onPress={this.handleBirthChangePress}>
                    <Image
                      source={change}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={{flexDirection: 'row', marginTop: 5}}>
              <View style={{flexDirection: 'column', marginLeft: '5%'}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#eee',
                    fontWeight: 'bold',
                  }}>
                  111
                </Text>
                <Text style={{fontSize: 10, color: '#999', marginLeft: 8}}>
                  关注
                </Text>
              </View>
              <View style={{flexDirection: 'column', marginLeft: 30}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#eee',
                    fontWeight: 'bold',
                  }}>
                  222
                </Text>
                <Text style={{fontSize: 10, color: '#999', marginLeft: 8}}>
                  点赞
                </Text>
              </View>
              <View style={{flexDirection: 'column', marginLeft: 30}}>
                <Text
                  style={{
                    fontSize: 20,
                    color: '#eee',
                    fontWeight: 'bold',
                  }}>
                  333
                </Text>
                <Text style={{fontSize: 10, color: '#999', marginLeft: 8}}>
                  粉丝
                </Text>
              </View>
            </View>
          </View>

          <View>
            <View
              style={{
                flexDirection: 'column',
                marginTop: 20,
                backgroundColor: '#f3f3f3',
              }}>
              <View
                style={{
                  height: 30,
                  width: 80,
                  marginLeft: 20,
                  borderStyle: 'solid',
                  borderBottomWidth: 4,
                  borderBottomColor: '#594F60',
                  marginTop: 10,
                }}>
                <Text>我的动态</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                {this.state.momentList.length === 0 ? (
                  <EmptyDongTai />
                ) : (
                  this.state.momentList.map((item, index) => {
                    return (
                      <DongTai
                        id={item.moment_id} //获取当前动态的id
                        header={this.state.header}
                        username={this.state.username}
                        time={item.time}
                        text={item.content}
                        img={item.imageList}
                        handleDelete={this.handleDelete}
                      />
                    );
                  })
                )}
              </View>
            </View>
          </View>
        </ScrollView>
        <Modal visible={showHeader} transparent={true}>
          <ImageViewer
            onClick={() => this.setState({showHeader: false})}
            imageUrls={[{url: this.state.header, props: {}}]}
          />
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={true}
          statusBarTranslucent={true}
          visible={handleHeader}
          onRequestClose={this.onCancel}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.outSideView}
            onPress={this.onCancel}
          />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.viewHeader}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle]}>查看头像</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={() => {
                this.setState({
                  changeHeader: true,
                  handleHeader: false,
                });
              }}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle]}>更换头像</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.onCancel}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle, {color: '#999'}]}>取消</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={true}
          statusBarTranslucent={true}
          visible={changeHeader}
          onRequestClose={this.onChangeCancel}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.outSideView}
            onPress={this.onChangeCancel}
          />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.takePhoto}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle]}>拍摄</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.addPhoto}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle]}>从相册选择</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.onChangeCancel}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle, {color: '#999'}]}>取消</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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

const styles = StyleSheet.create({
  outSideView: {
    flex: 1,
    backgroundColor: '#00000059',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  openButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
  },
  buttonTitle: {
    fontSize: 18,
    color: '#2196F3',
    textAlign: 'center',
  },
  inputStyle: {
    backgroundColor: '#ffffff',
    width: 120,
    height: 40,
  },
});
