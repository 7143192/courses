// import React from 'react';
// import {Text} from 'react-native';
//
// import ScrollableTabView, {
//   DefaultTabBar,
// } from 'react-native-scrollable-tab-view';
//
// export default () => {
//   return (
//     <ScrollableTabView
//       style={{marginTop: 20}}
//       initialPage={0}
//       renderTabBar={() => <DefaultTabBar />}>
//       <Text tabLabel="推荐">推荐</Text>
//       <Text tabLabel="关注">关注</Text>
//     </ScrollableTabView>
//   );
// };
import React from 'react';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import Recommend from './recommend';
import Follow from './follow';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'clwy-react-native-scrollable-tab-view';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';

function CircleTab(props) {
  const layout = useWindowDimensions();
  const {handleNav} = props;
  const FirstRoute = () => {
    return <Recommend id={props.id} />;
  };

  const SecondRoute = () => {
    return <Follow id={props.id} />;
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '广场'},
    {key: 'second', title: '我的关注'},
  ]);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: 'white'}}
      style={{backgroundColor: '#36a476'}}
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            marginTop:10,
          }}>
          {route.title}
        </Text>
      )}
    />
  );

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: layout.width}}
    />
  );
}

export default class CirclePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
    };
  }
  static len = 0;
  componentDidMount() {
    CirclePage.len = 0;
    console.log(this.props.id + '???');
    this.setState({
      id: this.props.id,
    });
  }

  render() {
    return <CircleTab id={this.state.id} handleNav={this.handlePressNav} />;
  }
}
/*export default function CirclePage() {
  return (
    <ScrollableTabView
      style={styles.container}
      initialPage={0}
      renderTabBar={() => <ScrollableTabBar />}
      tabBarUnderlineStyle={{backgroundColor: 'blue'}}
      tabBarBackgroundColor={'white'}
      tabBarInactiveTextColor={'#666'}
      tabBarActiveTextColor={'black'}
      tabBarTextStyle={{fontWeight: '600', fontSize: 18}}>
      <Recommend tabLabel="广场" />
      <Follow tabLabel="我的关注" />
    </ScrollableTabView>
  );
}*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
