import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  StatusBar,
  Alert,
  TextInput,
  Modal,
  DeviceEventEmitter,
} from 'react-native';
import sportImg from '../../../../res/sportClass2.jpg';
import share from '../../../../res/share.png';
import point from '../../../../res/point1.png';
import arrow from '../../../../res/leftArrow1.png';
import shouCang from '../../../../res/shoucang.png';
import dianZan from '../../../../res/dianzan.png';
import redLike from '../../../../res/redLike.png';
import redStar from '../../../../res/redStar.png';
import user from '../../../../res/userpic.png';
import CommentPart from '../../../../components/CommentPart';
import rightArrow from '../../../../res/rightArrow.png';
import DarkenImage from '../../../../components/DarkenImage';
import SAButton from '../../../../components/SAButton';
import BaseUrl from '../../../../utils/constants';
import storage from '../../../../utils/Storage';
import sofa from '../../../../res/sofa.png';
import IconFont from '../../../../components/IconFont';
import {string} from 'prop-types';
import Toast from 'react-native-easy-toast';
import SyncStorage from '../../../../utils/syncStorage';
import {MessageBarManager} from 'react-native-message-bar';
const data = [1, 1, 1, 1, 1, 1, 1];

class ClassHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
    };
  }

  getType = () => {
    //根据type1返回对应的分区类型
    if (this.props.info.type1 === 1) {
      return '减脂';
    }
    if (this.props.info.type1 === 2) {
      return '增肌';
    }
    return '瑜伽类';
  };

  render() {
    return (
      <View style={{width: '100%', height: 560}}>
        <StatusBar
          translucent
          backgroundColor="rgba(0, 0, 0, 0)"
          barStyle={'light-content'}
        />
        <DarkenImage
          source={this.props.img}
          transparency={0.6}
          style={{width: '100%', height: '70%'}}
        />
        <View style={{position: 'absolute', width: '100%', height: '70%'}}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 28,
              marginLeft: 15,
              marginRight: 15,
            }}>
            <TouchableOpacity onPress={() => this.props.goBackPrev()}>
              <Image source={arrow} style={{width: 40, height: 40}} />
            </TouchableOpacity>
            <TouchableOpacity style={{marginLeft: '75%'}}>
              <Image source={share} style={{width: 40, height: 40}} />
            </TouchableOpacity>
          </View>
          <View style={{marginTop: '28%', marginLeft: 15, marginRight: 15}}>
            <Text style={{color: '#ffffff', fontSize: 24, fontWeight: 'bold'}}>
              {this.props.info.course_name}
            </Text>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.wordStyle}>进阶</Text>
              <Image source={point} style={{width: 25, height: 25}} />
              <Text style={styles.wordStyle}>{this.getType()}</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.wordStyle}>3周</Text>
              <Image source={point} style={{width: 25, height: 25}} />
              <Text style={styles.wordStyle}>每周4天</Text>
              <Image source={point} style={{width: 25, height: 25}} />
              <Text style={styles.wordStyle}>
                每天{this.props.info.day_time}分钟
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

class NoCommentView extends React.Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Image
          source={sofa}
          style={{marginLeft: '30%', height: 120, width: 120}}
        />
        <Text style={{marginLeft: '17%'}}>暂时还没有评论，快来抢沙发吧~</Text>
      </View>
    );
  }
}

export default class CourseDetailInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      like: false,
      collect: false,
      comment: false,
      id: 0,
      commentList: [],
      showInput: false,
      text: '',
      noMore: false,
      loading: false,
    };
  }
  static courseCommentLen = 0;
  handleInitOrReInit = () => {
    this.setState({info: this.props.route.params.data});
    let url0 = BaseUrl + '/getAUser?id=';
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        //console.log('存储信息为:', JSON.parse(ret));
        let got = JSON.parse(ret);
        let id = got.user_id;
        console.log('user_id=', id);
        //let collectList = got.favorites;
        let collect = false;
        let like = false;
        let comment = false;
        url0 += id;
        let info = [];
        fetch(url0, {
          headers: {
            token: SyncStorage.getValue('token'),
          },
        })
          .then(response => response.json())
          .then(data0 => {
            info = data0;
            let collectList = data0.favorites;
            /*storage.remove({key: 'userInfo'});
            storage.save({
              key: 'userInfo',
              data: JSON.stringify(data0),
              expires: null,
            });*/
            Object.keys(collectList).forEach(key => {
              if (
                collectList[key].course_id ===
                this.props.route.params.data.course_id
              ) {
                collect = true;
                //this.setState({collect: true});
              }
            });
            /*let commentUrl =
                BaseUrl +
                '/getCourseComments?target_type=1&target_id=' +
                this.props.route.params.data.course_id +
                '&user_id=' +
                id;
              fetch(commentUrl)
                .then(response => response.json())
                .then(data => {
                  if (data != null) {
                    comment = true;
                  }
                });*/
            let url = BaseUrl + '/getUserLikes?id=' + id;
            fetch(url, {
              headers: {
                token: SyncStorage.getValue('token'),
              },
            })
              .then(response => response.json())
              .then(data1 => {
                Object.keys(data1).forEach(key1 => {
                  if (
                    data1[key1].target_type === 1 &&
                    data1[key1].target_id ===
                      this.props.route.params.data.course_id
                  ) {
                    console.log('like=', like);
                    like = true;
                    //this.setState({like: true});
                  }
                });
                while (this.state.loading === true) {}
                this.setState({loading: true});
                let start = CourseDetailInfo.courseCommentLen;
                //CourseDetailInfo.courseCommentLen += 4;
                let url1 =
                  BaseUrl +
                  '/getPartCourseComment?id=' +
                  this.props.route.params.data.course_id +
                  '&cur=' +
                  start +
                  '&size=4';
                fetch(url1, {
                  headers: {
                    token: SyncStorage.getValue('token'),
                  },
                })
                  .then(response => response.json())
                  .then(data2 => {
                    console.log('获取的评论信息=', data2);
                    CourseDetailInfo.courseCommentLen += data2.length;
                    this.setState({
                      info: this.props.route.params.data,
                      id: id,
                      like: like,
                      collect: collect,
                      comment: comment,
                      commentList: [...this.state.commentList, ...data2],
                    });
                    if (data2.length < 4) {
                      this.setState({noMore: true, loading: false});
                    } else {
                      this.setState({noMore: false, loading: false});
                    }
                    if (this.state.noMore === false) {
                      this.toast.show('Loading...');
                    } else {
                      this.toast.show('课程评论到底啦!');
                    }
                  });
              });
          });
        /*storage.remove({key: 'userInfo'});
        storage.save({
          key: 'userInfo',
          data: JSON.stringify(info),
          expires: null,
        });*/
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
  };
  onScroll = ({nativeEvent}) => {
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      1;
    if (isReachBottom) {
      this.handleInitOrReInit();
    }
  };
  componentDidMount = () => {
    CourseDetailInfo.courseCommentLen = 0;
    DeviceEventEmitter.addListener('JumpToCourseDetail', e => {
      this.handleInitOrReInit();
    });
    DeviceEventEmitter.addListener('JumpToCourseDetail1', e => {
      this.handleInitOrReInit();
    });
    this.handleInitOrReInit();
  };

  componentWillUnmount = () => {
    DeviceEventEmitter.removeAllListeners();
  };

  goBackPrev = () => {
    console.log('GO BACK!');
    this.props.navigation.goBack();
  };
  handleLikePress = () => {
    DeviceEventEmitter.emit('LikeChange', {id: this.state.id});
    let type = this.state.like === false ? '/addNewLike' : '/removeLike';
    let url =
      BaseUrl +
      type +
      '?target_type=1&target_id=' + //course的点赞type直接设置为1
      this.props.route.params.data.course_id +
      '&user_id=' +
      this.state.id;
    console.log('url=', url);
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data1 => {
        if (data1.like_id === -1) {
          Alert.alert('已经点赞过！');
        } else {
          this.setState({like: !this.state.like});
          //this.handleInitOrReInit();
        }
      });
  };
  handleCollectPress = () => {
    let type = this.state.collect ? '/delFavorite' : '/addNewFavorite';
    let url =
      BaseUrl +
      type +
      '?userId=' +
      this.state.id +
      '&courseId=' +
      this.props.route.params.data.course_id;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data1 => {
        if (data1.favorite_id === -1) {
          Alert.alert('出错！');
        } else {
          this.setState({collect: !this.state.collect});
        }
      });
  };
  handleEditingEnd = () => {
    this.setState({
      showInput: false,
    });
  };
  handleSubmit = () => {
    let content = this.state.text;
    if (content === '') {
      return;
    }
    let url =
      BaseUrl +
      '/addComment?target_type=1&target_id=' +
      this.props.route.params.data.course_id +
      '&user_id=' +
      this.state.id +
      '&content=' +
      content;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        Alert.alert('评论成功');
        this.handleInitOrReInit();
        this.setState({
          showInput: false,
          text: '',
        }); //重新加载评论以及回复列表
      });
  };
  render() {
    const {showInput, text} = this.state;
    return (
      <View style={{height: '100%'}}>
        <ScrollView style={{marginBottom: 0}} onScroll={this.onScroll}>
          <ClassHeader
            goBackPrev={this.goBackPrev}
            img={this.state.info.img}
            info={this.state.info}
          />
          <View style={{marginTop: '-78%'}}>
            <Text style={styles.title1}>课程介绍</Text>
            <Text style={{marginLeft: 15, marginRight: 15}}>
              {this.state.info.course_detail}
            </Text>
            <Text style={styles.title1}>课程评价</Text>

            {this.state.commentList.length === 0 ? (
              <NoCommentView />
            ) : (
              <View>
                <Text style={{marginLeft: 20}}>
                  共{this.state.commentList.length}条评论
                </Text>
                <View>
                  {this.state.commentList.map((item, index) => {
                    return (
                      <CommentPart
                        key={index}
                        item={item}
                        id={this.state.id} //当前用户的id
                      />
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.part3Style}>
          <TouchableOpacity
            style={{flexDirection: 'column', marginLeft: 20}}
            onPress={this.handleCollectPress}>
            <Image
              source={this.state.collect ? redStar : shouCang}
              style={{width: 25, height: 25}}
            />
            <Text style={{fontSize: 12, color: '#050505'}}>
              {this.state.collect ? '已收藏' : '收藏'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'column', marginLeft: 20}}
            onPress={this.handleLikePress}>
            <Image
              source={this.state.like ? redLike : dianZan}
              style={{width: 25, height: 25}}
            />
            <Text style={{fontSize: 12, color: '#050505'}}>
              {this.state.like ? '已点赞' : '点赞'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'column', marginLeft: 20}}
            onPress={() => this.setState({showInput: true})}>
            <IconFont style={styles.smallButton} name="iconpinglun" />
            <Text style={{fontSize: 12, color: '#050505'}}>
              {this.state.comment ? '已评论' : '评论'}
            </Text>
          </TouchableOpacity>
          <View style={styles.ButtonStyle}>
            <SAButton
              children={'开始训练'}
              style={{borderRadius: 20, marginBottom: 3}}
              onPress={()=>{this.props.navigation.navigate('CourseVideo', {info:this.state.info});}}
            />
          </View>
        </View>
        <Modal
          visible={showInput}
          transparent={true}
          animationType="slide"
          onRequestClose={this.handleEditingEnd}>
          <TouchableOpacity
            onPress={this.handleEditingEnd}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              position: 'relative',
            }}>
            <View
              style={{
                backgroundColor: '#eee',
                flexDirection: 'row',
                position: 'absolute',
                width: '100%',
                left: 0,
                bottom: 0,
                padding: 5,
                alignItems: 'center',
              }}>
              <TextInput
                autoFocus
                // 不知道为什么不好使
                value={text}
                onChangeText={t => this.setState({text: t})}
                onSubmitEditing={this.handleSubmitEditing}
                placeholder="说点什么吧~"
                style={{
                  backgroundColor: '#fff',
                  flex: 6,
                  borderRadius: 20,
                  height: 40,
                  paddingLeft: 10,
                  fontSize: 14,
                }}
              />
              <Text
                onPress={this.handleSubmit}
                style={{flex: 1, textAlign: 'center', color: '#666'}}>
                发送
              </Text>
            </View>
          </TouchableOpacity>
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
  wordStyle: {
    color: '#ffffff',
    fontSize: 17,
  },
  title1: {
    marginTop: 15,
    marginBottom: 14,
    marginLeft: 15,
    width: '80%',
    // height: '7%',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    color: '#050505',
    fontWeight: 'bold',
    fontSize: 17,
  },
  part3Style: {
    position: 'absolute',
    //   marginTop:"100%",
    bottom: 0,

    width: '100%',
    // height:'7%',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderTopColor: '#ffffff',
    borderStyle: 'solid',
  },
  ButtonStyle: {
    marginLeft: '8%',
    width: '60%',
    marginRight: 15,
    alignItems: 'center',
  },
  smallButton: {
    marginTop: 3,
    color: '#666',
    fontSize: 22,
  },
});
