import React from 'react';
import {Polyline} from 'react-native-amap3d';

export default class SportLine extends React.Component {
  render() {
    if (this.props.points.length === 0) {
      return null;
    }
    return (
      <Polyline
        width={10}
        color="rgba(255, 0, 0, 0.5)"
        points={this.props.points}
      />
    );
  }
}
