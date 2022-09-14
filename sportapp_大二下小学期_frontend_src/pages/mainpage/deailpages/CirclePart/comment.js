import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import SANav from '../../../../components/SANav';
import IconFont from '../../../../components/IconFont';
import imgArr from '../../../../utils/imgArr';
import date from '../../../../utils/date';
import ImageViewer from 'react-native-image-zoom-viewer';
import {getCommentsByTid} from '../../../../utils/comments';
import {EMOTIONS_DATA} from '../../../../components/Emotion/datasource';
import Validator from '../../../../utils/validator';
import BaseUrl from '../../../../utils/constants';
import {birth2age} from '../../../../utils/birth2age';
import {exp2level} from '../../../../utils/exp2level';
import SyncStorage from "../../../../utils/syncStorage";

class Index extends Component {
  state = {
    list: [],
    tid: 0,
    showAlbum: false,
    imgUrls: [],
    item: [],
    index: 0,
    currentIndex: 0,
    showInput: false,
    text: '',
  };

  componentDidMount() {
    let url =
      BaseUrl +
      '/getComment?target_type=2&target_id=' +
      this.props.route.params.item.moment_id;
    fetch(url, {
        headers: {
            'token': SyncStorage.getValue('token')
        }
    })
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let url2 =
            BaseUrl +
            '/checkLiked?target_type=3&target_id=' +
            data[i].comment_id +
            '&user_id=' +
            this.props.route.params.item.id;
          fetch(url2, {
              headers: {
                  'token': SyncStorage.getValue('token')
              }
          })
            .then(response => response.json())
            .then(data2 => {
              data[i].checkLiked = data2.like_id !== -1;
            });
        }
        this.setState({
          list: data,
          item: this.props.route.params.item,
          index: this.props.route.params.index,
        });
      });
  }

  handleCommentLike = (v, i) => {
    if (v.checkLiked) {
      let url =
        BaseUrl +
        '/removeLike?target_type=3&target_id=' +
        v.comment_id +
        '&user_id=' +
        this.props.route.params.item.id;
      fetch(url, {
          headers: {
              'token': SyncStorage.getValue('token')
          }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let res = this.state.list;
          res[i].checkLiked = false;
          res[i].like_num -= 1;
          this.setState({
            list: res,
          });
        });
    } else {
      let url =
        BaseUrl +
        '/addNewLike?target_type=3&target_id=' +
        v.comment_id +
        '&user_id=' +
        this.props.route.params.item.id;
      fetch(url, {
          headers: {
              'token': SyncStorage.getValue('token')
          }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let res = this.state.list;
          res[i].checkLiked = true;
          res[i].like_num += 1;
          this.setState({
            list: res,
          });
        });
    }
  };

  renderRichText = text => {
    const list = Validator.renderRichText(text);
    return list.map((v, i) => {
      if (v.text) {
        return (
          <Text style={{color: '#666'}} key={i}>
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

  handleLike = () => {
    const {item} = this.state;
    if (item.checkLiked) {
      let url =
        BaseUrl +
        '/removeLike?target_type=2&target_id=' +
        item.moment_id +
        '&user_id=' +
        item.id;
      fetch(url, {
          headers: {
              'token': SyncStorage.getValue('token')
          }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let res = this.state.item;
          res.checkLiked = false;
          res.like_num -= 1;
          this.setState({
            item: res,
          });
        });
    } else {
      let url =
        BaseUrl +
        '/addNewLike?target_type=2&target_id=' +
        item.moment_id +
        '&user_id=' +
        item.id;
      fetch(url, {
          headers: {
              'token': SyncStorage.getValue('token')
          }
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let res = this.state.item;
          res.checkLiked = true;
          res.like_num += 1;
          this.setState({
            item: res,
          });
        });
    }
  };

  handleEditingEnd = () => {
    this.setState({
      showInput: false,
      text: '',
    });
  };

  handleInitOrReInit = () => {
    const {item} = this.state;
    let url = BaseUrl + '/getComment?target_type=2&target_id=' + item.moment_id;
    fetch(url, {
        headers: {
            'token': SyncStorage.getValue('token')
        }
    })
      .then(response => response.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let url2 =
            BaseUrl +
            '/checkLiked?target_type=3&target_id=' +
            data[i].comment_id +
            '&user_id=' +
            this.props.route.params.item.id;
          fetch(url2, {
              headers: {
                  'token': SyncStorage.getValue('token')
              }
          })
            .then(response => response.json())
            .then(data2 => {
              data[i].checkLiked = data2.like_id !== -1;
            });
        }
        this.setState({
          list: data,
        });
      });
  };

  handleSubmit = () => {
    const {item} = this.state;
    let content = this.state.text;
    if (content === '') {
      return;
    }
    let url =
      BaseUrl +
      '/addComment?target_type=2&target_id=' +
      item.moment_id +
      '&user_id=' +
      item.id +
      '&content=' +
      content;
    fetch(url, {
        headers: {
            'token': SyncStorage.getValue('token')
        }
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

  handleSubmitEditing = () => {
    console.log(this.state.text);
  };

  handleShowAlbum = (item, index, ii) => {
    const imgUrls = item.imageList.map(v => ({
      url: v.img,
    }));
    this.setState({imgUrls, currentIndex: ii, showAlbum: true});
  };

  render() {
    const {imgUrls, currentIndex, showAlbum, list, showInput, text} =
      this.state;
    const item = this.props.route.params.item;
    const index = this.props.route.params.index;
    return (
      <ScrollView>
        <SANav title="详情" />
        <View style={{padding: 10}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{paddingRight: 15}}>
              <Image
                style={{width: 40, height: 40, borderRadius: 20}}
                source={{uri: item.header}}
              />
            </View>

            <View style={{flex: 2, justifyContent: 'space-around'}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{color: '#555'}}>{item.nickname}</Text>
                <IconFont
                  style={{
                    marginLeft: 5,
                    marginRight: 5,
                    fontSize: 18,
                    color: item.sex === '女' ? '#b564bf' : 'red',
                  }}
                  name={item.sex === '女' ? 'icontanhuanv' : 'icontanhuanan'}
                />
                <Text style={{color: '#555'}}>{birth2age(item.birth)}岁</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={{color: '#555', marginRight: 5}}>
                  {exp2level(item.exp)}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 8,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}>
            <Text>{this.renderRichText(item.content)}</Text>
          </View>

          <View
            style={{
              flexWrap: 'wrap',
              flexDirection: 'row',
              paddingTop: 5,
              paddingBottom: 5,
            }}>
            {item.imageList.map((vv, ii) => (
              <TouchableOpacity
                onPress={() => this.handleShowAlbum(item, index, ii)}
                key={ii}>
                <Image
                  style={{width: 70, height: 70, marginRight: 5}}
                  source={{uri: vv.img}}
                />
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              flexDirection: 'row',
              paddingTop: 5,
              paddingBottom: 5,
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <View>
              <Text style={{color: '#666', marginRight: 20}}>
                {date(item.time).fromNow()}
              </Text>
            </View>
            <TouchableOpacity
              onPress={this.handleLike}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <IconFont
                style={
                  item.checkLiked ? styles.smallButtonLiked : styles.smallButton
                }
                name="icondianzan-o"
              />
              <Text
                style={
                  item.checkLiked ? styles.smallButtonLiked : styles.smallButton
                }>
                {item.like_num}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({showInput: true})}
              testID={'commentDetail'}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginRight: 20,
              }}>
              <IconFont style={styles.smallButton} name="iconpinglun" />
              <Text style={styles.smallButton}>{item.comment_num}</Text>
            </TouchableOpacity>
          </View>
          <Modal
            /* onRequestClose={()=>this.setState({showAlbum:false})} */ visible={
              showAlbum
            }
            transparent={true}>
            <ImageViewer
              onClick={() => this.setState({showAlbum: false})}
              imageUrls={imgUrls}
              index={currentIndex}
            />
          </Modal>
          <View style={{backgroundColor: '#eee'}}>
            {list.map((v, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  paddingTop: 5,
                  paddingBottom: 5,
                  borderBottomColor: '#ccc',
                  borderBottomWidth: 1,
                  alignItems: 'center',
                }}>
                <View style={{marginRight: 10, marginLeft: 10}}>
                  <Image
                    style={{width: 40, height: 40, borderRadius: 20}}
                    source={{uri: v.header}}
                  />
                </View>
                <View>
                  <Text style={{color: '#666'}}>{v.nickname}</Text>
                  <Text
                    style={{
                      color: '#666',
                      fontSize: 13,
                      marginTop: 5,
                      marginBottom: 5,
                    }}>
                    {date(v.time).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                  <Text style={{marginTop: 5}}>{v.content}</Text>
                </View>
                <TouchableOpacity
                  onPress={this.handleCommentLike.bind(this, v, i)}
                  style={{
                    flexDirection: 'row',
                    flex: 1,
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}>
                  <IconFont
                    style={
                      v.checkLiked
                        ? styles.smallButtonLiked
                        : styles.smallButton
                    }
                    name="icondianzan-o"
                  />
                  <Text
                    style={
                      v.checkLiked
                        ? styles.smallButtonLiked
                        : styles.smallButton
                    }>
                    {v.like_num}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
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
        </View>
      </ScrollView>
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
