import React from 'react';
import {geolocationInit} from '../utils/MapHelpTest';
import {MapType, MapView} from 'react-native-amap3d';
import SportLine from './SportLine';

export default class HistoryMapPart extends React.Component {
  componentDidMount() {
    geolocationInit();
  }

  render() {
    return (
      <MapView
        mapType={MapType.Standard}
        initialCameraPosition={{
          target: {
            latitude:
              this.props.points.length === 0
                ? 39.91095
                : this.props.points[0].lat,
            longitude:
              this.props.points.length === 0
                ? 116.37296
                : this.props.points[0].lng,
          },
          zoom: 15,
        }}
        center={{
          latitude:
            this.props.points.length === 0
              ? 39.91095
              : this.props.points[0].lat,
          longitude:
            this.props.points.length === 0
              ? 116.37296
              : this.props.points[0].lng,
        }}
        myLocationButtonEnabled={true}
        myLocationEnabled={true}
        compassEnabled={false}
        locationStyle={{fillColor: 0, strokeWidth: 0, strokeColor: 0}}
        style={{width: '100%', height: '100%'}}>
        <SportLine points={this.props.points} />
      </MapView>
    );
  }
}
