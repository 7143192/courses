import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import user from '../res/userpic.png';
import dianZan from '../res/dianzan.png';
import redLike from '../res/redLike.png';
import BaseUrl from '../utils/constants';
import SyncStorage from '../utils/syncStorage';

class ReplyPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {commentName: ''};
  }
  componentDidMount = () => {
    let id = this.props.commentName;
    let url = BaseUrl + '/getAUser?id=' + id;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({commentName: data.nickname});
      });
  };

  render() {
    return (
      <View
        style={{
          marginLeft: '15%',
          flexDirection: 'column',
          marginTop: '1%',
          marginBottom: 5,
          backgroundColor: 'rgba(211,202,202,0.24)',
          width: '80%',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text>
            <Text style={{color: '#050505'}}>{this.state.commentName}</Text>
            &nbsp;回复&nbsp;
            <Text style={{color: '#050505'}}>{this.props.username}</Text>:
          </Text>
        </View>
        <Text style={{marginLeft: '3%', color: '#050505'}}>
          {this.props.content}
        </Text>
      </View>
    );
  }
}

export default class CommentPart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', like: false};
  }
  componentDidMount = () => {
    let id = this.props.item.key.user_id;
    let url = BaseUrl + '/getAUser?id=' + id;
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log('根据评论获取的用户信息为:', data);
        let url1 =
          BaseUrl +
          '/checkLiked?target_type=3&target_id=' +
          this.props.item.key.comment_id +
          '&user_id=' +
          this.props.id;
        fetch(url1, {
          headers: {
            token: SyncStorage.getValue('token'),
          },
        })
          .then(response => response.json())
          .then(data1 => {
            let liked = false;
            if (data1.like_id === -1) {
              liked = false;
            } else {
              liked = true;
            }
            this.setState({username: data.nickname, like: liked});
          });
        //this.setState({username: data.nickname});
      });
  };
  handleLikePress = () => {
    let type = this.state.like === false ? '/addNewLike' : '/removeLike';
    let url =
      BaseUrl +
      type +
      '?target_type=3&target_id=' + //course的点赞type直接设置为1
      this.props.item.key.comment_id +
      '&user_id=' +
      this.props.id;
    console.log('url=', url);
    fetch(url)
      .then(response => response.json())
      .then(data1 => {
        if (data1.like_id === -1) {
          Alert.alert('已经点赞过！');
        } else {
          this.setState({like: !this.state.like});
        }
      });
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'column',
          borderStyle: 'solid',
          borderColor: '#ccc',
          borderBottomWidth: 1,
          width: '90%',
          marginTop: 10,
          marginBottom: 5,
          marginLeft: 15,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image source={user} style={{width: 50, height: 50}} />
          <View style={{flexDirection: 'column', marginTop: 4}}>
            <Text>{this.state.username}</Text>
            <Text>{this.props.item.key.time}</Text>
          </View>
          <TouchableOpacity onPress={this.handleLikePress}>
            <Image
              source={this.state.like ? redLike : dianZan}
              style={{width: 20, height: 20, marginLeft: '50%'}}
            />
          </TouchableOpacity>
        </View>
        <View style={{marginLeft: '15%'}}>
          <Text style={{color: '#343434', marginTop: 4, fontSize: 16}}>
            {this.props.item.key.content}
          </Text>
        </View>
        {this.props.item.value.map((item, index) => {
          return (
            <ReplyPart
              commentName={item.user_id}
              username={this.state.username}
              content={item.content}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ShareStyle: {
    width: 40,
    height: 40,
    marginLeft: '75%',
  },
  wordStyle: {
    color: '#ffffff',
    fontSize: 17,
  },
  title1: {
    marginTop: 20,
    marginLeft: 10,
    width: '80%',
    height: '7%',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
    color: '#050505',
    fontWeight: 'bold',
    fontSize: 17,
  },
  part3Style: {
    flex: 0.5,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: 2,
    borderTopColor: '#ffffff',
    borderStyle: 'solid',
  },
  ButtonStyle: {
    marginLeft: '40%',
    width: 100,
    marginTop: '3%',
  },
});
