import React from 'react';
import star from '../res/star.png';
import {Image, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Stars extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      List: [],
    };
  }
  componentDidMount = () => {
    let ans = [];
    for (let i = 0; i < this.props.nums; ++i) {
      ans.push(star);
    }
    this.setState({List: ans});
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          ...this.props.style,
        }}>
        {this.state.List.map((item, index) => {
          return (
            <Icon
              name={'star-o'}
              style={{color: '#fff', fontSize: 20}}
              key={index}
            />
          );
        })}
      </View>
    );
  }
}
