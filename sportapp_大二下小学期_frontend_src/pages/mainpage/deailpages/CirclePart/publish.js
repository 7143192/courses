import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import SANav from '../../../../components/SANav';
import IconFont from '../../../../components/IconFont';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Emotion from '../../../../components/Emotion';
import BaseUrl from '../../../../utils/constants';
import Toast from 'react-native-easy-toast';
import SyncStorage from '../../../../utils/syncStorage';
import RNFS from 'react-native-fs';

class Index extends Component {
  state = {
    textContent: '',
    // // 经度
    // longitude: "",
    // // 纬度
    // latitude: "",
    // 详细地址
    location: '',
    tmpImgList: [],
    showEmotion: false,
    showLocation: false,
    showImagePicker: false,
    userid: 0,
  };

  constructor() {
    super();
    this.refInput = React.createRef();
  }

  // 设置输入框获得焦点
  handleSetInputFocus = () => {
    // console.log(this.refInput);
    if (!this.refInput.isFocused()) {
      // 设置获得焦点
      this.refInput.focus();
    }
  };

  // 输入框的值改变事件
  onChangeText = textContent => {
    this.setState({textContent});
  };

  // 获取当前定位
  //   getCurrentPosition = async () => {
  //     const res = await Geo.getCityByLocation();
  //     const { province, city, district, township, streetNumber } = res.regeocode.addressComponent;
  //     this.setState({
  //       location: province + city + district + township,
  //       longitude: streetNumber.location.split(",")[0],
  //       latitude: streetNumber.location.split(",")[1]
  //     });
  //   }
  getCurrentPosition = () => {
    if (!this.state.showLocation) {
      this.setState({
        showLocation: true,
        location: '上海市闵行区东川路800号',
      });
    } else {
      this.setState({
        showLocation: false,
        location: '',
      });
    }
  };

  handleSelectImage = () => {
    console.log('handleSelectImage函数输出:', this.state.tmpImgList);
    this.setState({
      showImagePicker: true,
    });
  };

  onCancel = () => {
    this.setState({
      showImagePicker: false,
    });
  };

  _convertImageToBase64 = (img, content1) => {
    if (!img) {
      return;
    }
    RNFS.readFile(img.uri, 'base64')
      .then(content => {
        // content 为base64数据
        //console.log('content', content);
        content1 = content;
        //return content;
      })
      .catch(err => {
        console.log('reading error: ' + err);
      });
  };

  takePhoto = () => {
    if (this.state.tmpImgList.length >= 9) {
      this.toast.show('最多只能选择9张图片');
      return;
    }
    launchCamera(
      {
        mediaType: 'photo',
        cameraType: 'back',
      },
      res => {
        console.log('takePhoto的结果为:', res);
        console.log('takePhoto函数输出内容:', res.assets);
        // console.log(res.assets);
        const {tmpImgList} = this.state;
        if (res.didCancel) {
          return;
        }
        res.assets.map(item => {
          //let content1 = '';
          //this._convertImageToBase64(item, content);
          RNFS.readFile(item.uri, 'base64')
            .then(content => {
              // content 为base64数据
              //console.log('content', content);
              console.log('item1=', item);
              item.base64 = content;
              console.log('item2=', item);
              //return content;
              tmpImgList.push(item);
              //console.log('tmpList=', this.state.tmpImgList);
              this.setState({tmpImgList});
            })
            .catch(err => {
              console.log('reading error: ' + err);
            });
          //tmpImgList.push(item);
          //this._convertImageToBase64(item);
        });
      },
    );
  };

  addPhoto = () => {
    if (this.state.tmpImgList.length >= 9) {
      this.toast.show('最多只能选择9张图片');
      return;
    }
    launchImageLibrary(
      {
        mediaType: 'mixed', // 'photo' or 'video' or 'mixed'
        selectionLimit: 9, // 1为一张，0不限制数量
        includeBase64: true,
      },
      res => {
        console.log('addPhoto函数输出内容:', res.assets);
        // console.log(res.assets);
        const {tmpImgList} = this.state;
        if (res.didCancel) {
          return;
        }
        res.assets.map(item => {
          if (tmpImgList.length >= 9) {
            //Alert.alert('最多只能选择9张图片');
            this.toast.show('最多选择9张图片!');
            return;
          }
          tmpImgList.push(item);
        });
        this.setState({tmpImgList});
      },
    );
  };

  // 点击图片 进行删除
  handleImageRemove = i => {
    const {tmpImgList} = this.state;
    tmpImgList.splice(i, 1);
    this.setState({tmpImgList});
  };

  // 选择了表情
  handleEmotionSelect = value => {
    this.setState({textContent: this.state.textContent + value.key});
  };
  // 切换显示表情组件
  toggleEmotion = () => {
    this.setState({showEmotion: !this.state.showEmotion});
  };

  handleFile = () => {
    let ans = [];
    Object.keys(this.state.tmpImgList).forEach(key => {
      ans.push(this.state.tmpImgList[key]);
    });
    console.log('files=', ans);
    return ans;
  };

  handleSize = () => {
    let ans = [];
    Object.keys(this.state.tmpImgList).forEach(key => {
      ans.push(this.state.tmpImgList[key].fileSize);
    });
    console.log('size=', ans);
    return ans;
  };

  // 发动态
  submitMoment = () => {
    const {textContent, userid} = this.state;
    console.log(userid);
    //let url =
    //BaseUrl + '/addMoment?userId=' + userid + '&content=' + textContent;
    let url =
      BaseUrl +
      '/addMomentAndImages?userId=' +
      userid +
      '&content=' +
      textContent;
    /*let fetchBody = new URLSearchParams();
    Object.keys(this.state.tmpImgList).forEach(key =>
      fetchBody.set(key, this.state.tmpImgList[key]),
    );*/
    let fetchBody = new FormData();
    let tmpArr = [];
    Object.keys(this.state.tmpImgList).forEach(key => {
      //console.log(this.state.tmpImgList[key]);
      //let s = JSON.stringify(this.state.tmpImgList[key]);
      //tmpArr.push(s);
      fetchBody.append('imageUri', this.state.tmpImgList[key].uri);
      fetchBody.append('imageName', this.state.tmpImgList[key].fileName);
    });
    Object.keys(this.state.tmpImgList).forEach(key => {
      //tmpArr.push(this.state.tmpImgList[key].base64);
      let fileMsg = {
        name: this.state.tmpImgList[key].fileName,
        base64: this.state.tmpImgList[key].base64,
      };
      tmpArr.push(fileMsg);
    });
    let formBody = new FormData();
    formBody.append('base64', JSON.stringify(tmpArr));
    //console.log('tnpArr=', tmpArr);
    //fetchBody.append('image', tmpArr);
    console.log('fetchBody=', fetchBody);
    if (!textContent) {
      //Alert.alert('输入不合法');
      this.toast.show('输入不合法!');
      console.log('你在干什么');
      return;
    }
    // 图片上传
    fetch(url, {
      method: 'post',
      headers: {
        token: SyncStorage.getValue('token'),
        'content-Type': 'multipart/form-data',
      },
      //body: fetchBody,
      body: formBody,
    })
      .then(response => response.json())
      .then(data => {
        //Alert.alert('发布动态成功');
        this.toast.show('发布动态成功!');
        setTimeout(() => {
          this.props.navigation.reset({
            routes: [
              {
                name: 'Main',
                params: {pagename: 'CirclePage', id: this.state.userid},
              },
            ],
          });
        }, 1000);
      });
  };

  componentDidMount() {
    this.setState({
      userid: this.props.route.params,
    });
  }

  render() {
    const {
      textContent,
      location,
      tmpImgList,
      showEmotion,
      showLocation,
      showImagePicker,
    } = this.state;
    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <SANav
          title="发布动态"
          rightText="发表"
          onRightPress={this.submitMoment}
        />
        {/* 1.0 输入框 开始 */}
        <TouchableOpacity
          style={{height: '40%'}}
          onPress={this.handleSetInputFocus}>
          <TextInput
            ref={ref => (this.refInput = ref)}
            placeholder="这一刻的想法……(140字以内)"
            multiline
            value={textContent}
            onChangeText={this.onChangeText}
          />
        </TouchableOpacity>
        {/* 1.0 输入框 结束 */}
        {/* 2.0 定位 开始 */}
        <View
          style={{
            alignItems: 'flex-end',
            height: 40,
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            onPress={this.getCurrentPosition}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <IconFont
              style={{color: '#666', fontSize: 16}}
              name="iconlocation"
            />
            <Text
              style={{
                fontSize: 12,
                color: '#aaa',
                marginLeft: 5,
                marginRight: 5,
              }}>
              {showLocation ? location : '选择位置'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* 2.0 定位 结束 */}

        {/* 3.0 相册 开始 */}
        <View style={{paddingTop: 5, paddingBottom: 5}}>
          <ScrollView horizontal>
            {tmpImgList.map((v, i) => (
              <TouchableOpacity
                key={i}
                style={{marginLeft: 5, marginRight: 5}}
                onPress={this.handleImageRemove.bind(this, i)}>
                <Image source={{uri: v.uri}} style={{width: 50, height: 50}} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {/* 3.0 相册 结束 */}
        {/* 4.0 工具栏 开始 */}
        <View
          style={{
            height: 50,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#eee',
          }}>
          <TouchableOpacity
            testID={'photo'}
            onPress={this.handleSelectImage}
            style={{marginLeft: 40, marginRight: 40}}>
            <IconFont style={{fontSize: 30, color: '#666'}} name="icontupian" />
          </TouchableOpacity>
          <TouchableOpacity testID={'emotion'} onPress={this.toggleEmotion}>
            <IconFont
              style={{fontSize: 30, color: showEmotion ? '#df6a88' : '#666'}}
              name="iconbiaoqing"
            />
          </TouchableOpacity>
        </View>
        {/* 4.0 工具栏 结束 */}
        <Modal
          animationType={'slide'}
          transparent={true}
          statusBarTranslucent={true}
          visible={showImagePicker}
          onRequestClose={this.onCancel}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.outSideView}
            onPress={this.onCancel}
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
              onPress={this.onCancel}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle, {color: '#999'}]}>取消</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        {/* 5.0 表情组件 开始 */}
        {showEmotion ? <Emotion onPress={this.handleEmotionSelect} /> : <></>}
        {/* 5.0 表情组件 结束 */}
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

export default Index;

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
    fontSize: 14,
    color: '#2196F3',
    textAlign: 'center',
  },
});
