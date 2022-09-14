import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  StyleSheet,
} from 'react-native';
import {getMomentsList} from '../../../../utils/moments';
import date from '../../../../utils/date';
import IconFont from '../../../../components/IconFont';
//import ActionSheet from 'react-native-actionsheet';
import ImageViewer from 'react-native-image-zoom-viewer';
import LinearGradient from 'react-native-linear-gradient';
import {NavigationContext} from '@react-navigation/native';
import Validator from '../../../../utils/validator';
import {EMOTIONS_DATA} from '../../../../components/Emotion/datasource';
import BaseUrl from '../../../../utils/constants';
import {exp2level} from '../../../../utils/exp2level';
import {birth2age} from '../../../../utils/birth2age';
import SyncStorage from '../../../../utils/syncStorage';

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 0,
      list: [],
      showAlbum: false,
      imgUrls: [],
      currentIndex: 0,
      showMore: false,
      loading: false,
    };
  }
  static len1 = 0;
  static loading = false;
  static contextType = NavigationContext;
  params = {
    page: 1,
    pageSize: 10,
  };
  totalPages: 2;
  onEndReached = () => {
    /*
        1 判断还有没有下一页数据
        2 节流阀
         */
    // if (this.params.page >= this.totalPages || this.isLoading) {
    //   return;
    // } else {
    //   // 还有下一页数据
    //   this.isLoading = true;
    //   this.params.page++;
    //   this.getList();
    // }
    this.handleInitOrLoad();
  };
  handleInitOrLoad = () => {
    //while (this.state.loading === true) {}
    let start = Recommend.len1;
    this.setState({loading: true});
    //Recommend.loading = true;
    let id = this.props.id;
    // console.log(id);
    let url = BaseUrl + '/getPartAllMoment?cur=' + start + '&size=3';
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          list: [...this.state.list, ...data],
          userid: id,
        });
        console.log('old=', Recommend.len1);
        Recommend.len1 = this.state.list.length;
        console.log('new=', Recommend.len1);
        for (let i = 0; i < data.length; i++) {
          let url2 =
            BaseUrl +
            '/checkLiked?target_type=2&target_id=' +
            data[i].moment_id +
            '&user_id=' +
            id;
          fetch(url2, {
            headers: {
              token: SyncStorage.getValue('token'),
            },
          })
            .then(response => response.json())
            .then(data2 => {
              data[i].checkLiked = data2.like_id !== -1;
            });
        }
        this.setState({loading: false});
      });
  };

  onScroll = ({nativeEvent}) => {
    const isReachBottom =
      nativeEvent.contentSize.height -
        nativeEvent.layoutMeasurement.height -
        nativeEvent.contentOffset.y <
      1;
    if (isReachBottom) {
      this.handleInitOrLoad();
    }
  };
  componentDidMount() {
    Recommend.len1 = 0;
    Recommend.loading = false;
    this.handleInitOrLoad();
  }

  renderRichText = text => {
    const list = Validator.renderRichText(text);
    return list.map((v, i) => {
      if (v.text) {
        return (
          <Text style={{color: '#666', fontSize: 16}} key={i}>
            {v.text}
          </Text>
        );
      } else if (v.image) {
        return (
          <Image
            style={{width: 20, height: 20}}
            key={i}
            source={EMOTIONS_DATA[v.image]}
          />
        );
      } else {
        return <></>;
      }
    });
  };

  handleLike = (index, item) => {
    if (item.checkLiked) {
      let url =
        BaseUrl +
        '/removeLike?target_type=2&target_id=' +
        item.moment_id +
        '&user_id=' +
        this.state.userid;
      fetch(url, {
        headers: {
          token: SyncStorage.getValue('token'),
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let res = this.state.list;
          res[index].checkLiked = false;
          res[index].like_num -= 1;
          this.setState({
            list: res,
          });
        });
    } else {
      let url =
        BaseUrl +
        '/addNewLike?target_type=2&target_id=' +
        item.moment_id +
        '&user_id=' +
        this.state.userid;
      fetch(url, {
        headers: {
          token: SyncStorage.getValue('token'),
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let res = this.state.list;
          res[index].checkLiked = true;
          res[index].like_num += 1;
          this.setState({
            list: res,
          });
        });
    }
  };

  handleShowAlbum = (index, ii) => {
    const imgUrls = this.state.list[index].imageList.map(v => ({
      url: v.img,
    }));
    this.setState({imgUrls, currentIndex: ii, showAlbum: true});
  };

  handleMore = item => {
    this.setState({
      showMore: true,
    });
  };

  noInterest = item => {
    console.log('下次不给你看了');
  };

  onReport = item => {
    console.log('喜欢举报？');
  };

  onCancel = () => {
    this.setState({
      showMore: false,
    });
  };

  goComment = (item, index) => {
    item.id = this.state.userid;
    this.context.navigate('Comment', {item, index});
  };

  render() {
    const {list, imgUrls, currentIndex, showAlbum, showMore} = this.state;
    console.log('MomentList=', this.state.list);
    return (
      <>
        <FlatList
          onScroll={this.onScroll}
          //onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          data={list}
          keyExtractor={v => v.tid + ''}
          renderItem={({item, index}) => (
            <>
              <View
                key={index}
                style={{
                  padding: 10,
                  backgroundColor: '#fff',
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                }}>
                {/* 2.2.1 用户信息 开始 */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{paddingRight: 15}}>
                    <Image
                      style={{width: 40, height: 40, borderRadius: 20}}
                      source={{uri: item.header}}
                    />
                  </View>

                  <View style={{flex: 2, justifyContent: 'space-around'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{color: '#555', fontSize: 18}}>
                        {item.nickname}
                      </Text>
                      <IconFont
                        style={{
                          marginLeft: 5,
                          marginRight: 5,
                          fontSize: 20,
                          color: item.sex === '女' ? '#b564bf' : 'red',
                        }}
                        name={
                          item.sex === '女' ? 'icontanhuanv' : 'icontanhuanan'
                        }
                      />
                      <Text style={{color: '#555'}}>
                        {birth2age(item.birth)}岁
                      </Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{color: '#555', marginRight: 5}}>
                        {exp2level(item.exp)}
                      </Text>
                    </View>
                  </View>

                  <TouchableOpacity
                    testID={'more'}
                    onPress={this.handleMore.bind(this, item)}>
                    <IconFont
                      name="icongengduo"
                      style={{color: '#666', fontSize: 20}}
                    />
                  </TouchableOpacity>
                  {/*<ActionSheet />*/}
                </View>
                {/* 2.2.1 用户信息 结束 */}

                {/* 2.3 动态内容 开始 */}
                <View
                  style={{
                    marginTop: 8,
                    marginBottom: 5,
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                  }}>
                  <Text>{this.renderRichText(item.content)}</Text>
                </View>
                {/* 2.3 动态内容 结束 */}
                {/* 2.4 相册 开始 */}
                <View
                  style={{
                    flexWrap: 'wrap',
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}>
                  {item.imageList.map((vv, ii) => (
                    <TouchableOpacity
                      onPress={() => this.handleShowAlbum(index, ii)}
                      key={ii}>
                      <Image
                        style={{width: 80, height: 80, marginRight: 5}}
                        source={{uri: vv.img}}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
                {/* 2.4 相册 结束 */}
                {/* 2.5 距离时间 开始 */}
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 5,
                    paddingBottom: 5,
                  }}>
                  <View>
                    <Text style={{color: '#666', marginLeft: 8}}>
                      {date(item.time).fromNow()}
                    </Text>
                  </View>
                </View>
                {/* 2.5 时间 结束 */}
                {/* 2.6 2个小图标 开始 */}
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginLeft: 20,
                    }}
                    testID={`like${index}`}
                    onPress={this.handleLike.bind(this, index, item)}>
                    <IconFont
                      style={
                        item.checkLiked
                          ? styles.smallButtonLiked
                          : styles.smallButton
                      }
                      name="icondianzan-o"
                    />
                    <Text
                      style={
                        item.checkLiked
                          ? styles.smallButtonLiked
                          : styles.smallButton
                      }>
                      {item.like_num}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginRight: 20,
                    }}
                    testID={`comment${index}`}
                    onPress={this.goComment.bind(this, item, index)}>
                    <IconFont style={styles.smallButton} name="iconpinglun" />
                    <Text style={styles.smallButton}>{item.comment_num}</Text>
                  </TouchableOpacity>
                </View>
                {/* 2.6 2个小图标 结束 */}
              </View>
              {this.params.page >= this.totalPages &&
              index === list.length - 1 ? (
                <View
                  style={{
                    height: 30,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#666'}}>没有数据</Text>
                </View>
              ) : (
                <></>
              )}
            </>
          )}
        />
        <Modal visible={showAlbum} transparent={true}>
          <ImageViewer
            onClick={() => this.setState({showAlbum: false})}
            imageUrls={imgUrls}
            index={currentIndex}
          />
        </Modal>
        <Modal
          animationType={'slide'}
          transparent={true}
          statusBarTranslucent={true}
          visible={showMore}
          onRequestClose={this.onCancel}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.outSideView}
            onPress={this.onCancel}
          />
          <View style={styles.container}>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.onReport}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle]}>举报</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.noInterest}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle]}>不感兴趣</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.openButton}
              onPress={this.onCancel}
              activeOpacity={0.7}>
              <Text style={[styles.buttonTitle, {color: '#999'}]}>取消</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={{position: 'absolute', right: '10%', bottom: '10%'}}
          onPress={() => {
            let id = this.state.userid;
            console.log('传入的userid是' + id);
            this.context.navigate('Publish', id);
          }}>
          <LinearGradient
            colors={['#36a476', '#36a476']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#fff', fontSize: 30, fontWeight: 'bold'}}>
              +
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </>
    );
  }
}

export default Recommend;

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
  smallButton: {
    color: '#666',
    fontSize: 20,
  },
  smallButtonLiked: {
    color: '#fb7299',
    fontSize: 20,
  },
});
