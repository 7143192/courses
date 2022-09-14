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
  DeviceEventEmitter,
} from 'react-native';
import CoursePage1 from './CoursePage1';
import CoursePage2 from './CoursePage2';
import {useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import SearchBar from '../../../../components/SearchBar';
import GoBack from '../../../../components/GoBack';
import {SceneRendererProps} from 'react-native-tab-view';
import {Route} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import search from '../../../../res/search-black.png';
import BaseUrl from '../../../../utils/constants';
import storage from '../../../../utils/Storage';
import Toast from 'react-native-easy-toast';
import SyncStorage from '../../../../utils/syncStorage';

function TabViewExample(props) {
  const layout = useWindowDimensions();
  const {
    handleNav,
    getList,
    handleListUpdate,
    courseList,
    noMore,
    times,
    handleCourseNav,
  } = props;

  const FirstRoute = () => {
    const ListUpdate = data => {
      handleListUpdate(data);
    };
    return (
      <CoursePage1
        noMore={noMore}
        handleNav={handleNav}
        handleCourseNav={handleCourseNav}
        getList={getList}
        handleListUpdate={ListUpdate}
        courseList={courseList}
        times={times}
      />
    );
  };

  const SecondRoute = () => {
    return (
      <CoursePage2
        handleNav={handleNav}
        handleCourseNav={handleCourseNav}
        getList={getList}
        handleListUpdte={handleListUpdate}
        courseList={courseList}
        times={times}
      />
    );
  };

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: '按分区筛选'},
    {key: 'second', title: '按条件组合'},
  ]);

  const renderTabBar = (
    props: SceneRendererProps & {navigationState: State},
  ) => {
    return (
      <TabBar
        {...props}
        indicatorStyle={{
          backgroundColor: '#000',
          width: 20,
          height: 4,
          marginLeft: '16%',
        }}
        // renderIcon={renderIcon}
        style={{backgroundColor: 'rgba(0, 0, 0, 0)', marginBottom: 10}}
        labelStyle={{color: '#343434', fontSize: 18}}
        pressColor={'rgba(0,0,0,0)'}
      />
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      initialLayout={{width: layout.width}}
      style={{
        width: '92%',
        marginLeft: '4%',
      }}
    />
  );
}

export default class AllCourses extends React.Component {
  PageGoBack = () => {
    console.log('跳回前一个页面');
    storage
      .load({
        key: 'userInfo',
        autoSync: true,
        syncInBackground: true,
      })
      .then(ret => {
        /*setTimeout(() => {
          this.props.navigation.reset({
            routes: [
              {
                name: 'Main',
                params: {pagename: 'HomePage', id: ret.user_id},
              },
            ],
          });
        }, 1000);*/
        let data = JSON.parse(ret);
        DeviceEventEmitter.emit('HomePageGoBack', {id: data.user_id});
        this.props.navigation.goBack();
      });
    //DeviceEventEmitter.emit('EndPlan', {chosen: 0});
    //this.props.navigation.goBack();
  };
  handlePressNav = (e, params = null) => {
    console.log('进入ALLCOURSE页面的跳转函数!');
    this.props.navigation.navigate(e, params);
  };
  handleCourseNav = (e, params = null) => {
    console.log('进行课程详情的跳转!');
    this.props.navigation.reset({
      routes: [
        {
          name: e,
          params: params,
        },
      ],
    });
  };
  static cur1 = 0;
  static cur2 = 0;
  static times = 0;
  constructor() {
    super();
    this.state = {
      search: false,
      filterText: '',
      courseList: [],
      prevList: [],
      noMore: false,
      times: 0,
    };
  }
  handleListUpdate = data => {
    console.log('进入了AllCourses的handleListUpdate函数!');
    this.setState({
      courseList: [...this.state.courseList, ...data],
      prevList: [...this.state.prevList, ...data],
    });
  };
  getList1 = () => {
    AllCourses.times++;
    let start = AllCourses.cur1;
    AllCourses.cur1 += 4; //更新当前长度
    console.log(start);
    console.log(AllCourses.cur1);
    let url = BaseUrl + '/getPartCourse?cur=' + start + '&size=4';
    fetch(url, {
      headers: {
        token: SyncStorage.getValue('token'),
      },
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          courseList: [...this.state.courseList, ...data],
          prevList: [...this.state.prevList, ...data],
        });
        //console.log('AllExerciseList=', this.state.AllExerciseList);
        if (data.length < 4) {
          this.setState({noMore: true, times: AllCourses.times});
        }
        if (this.state.noMore === false) {
          this.toast.show('Loading.....');
        } else {
          this.toast.show('课程列表到底啦!');
        }
      });
    /*let tmp = this.state.AllExerciseList.slice(start, ActionPage.curLength); //
    this.isLoading = false;
    this.setState({
      actions: [...this.state.actions, ...tmp],
    });
    console.log(tmp);*/
  };
  componentDidMount = () => {
    /*let url = BaseUrl + '/getAllCourses';
    fetch(url)
      .then(response => response.json())
      .then(data => {
        storage.save({
          key: 'AllCourses', //key的名字里面不要出现下划线
          data: JSON.stringify(data),
          expires: null,
        }); //将全部课程信息存储在内存中
        this.setState({courseList: data, prevList: data});
      });*/
    AllCourses.cur1 = 0;
    AllCourses.times = 0;
    this.getList1();
  };
  handleTextChange = filterText => {
    this.setState({filterText: filterText});
    let list = [];
    Object.keys(this.state.prevList).forEach(key => {
      if (
        this.state.prevList[key].course_name
          .toString()
          .indexOf(filterText.toString()) >= 0
      ) {
        list.push(this.state.prevList[key]);
      }
    });
    this.setState({courseList: list}); //按照课程名进行查找
  };
  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <GoBack
          black={true}
          arrowStyle={{
            marginTop: 30,
            marginLeft: 15,
            marginBottom: 0,
          }}
          text={'全部课程'}
          PressGoBack={this.PageGoBack}
        />
        {!this.state.search ? (
          <TouchableOpacity
            style={{position: 'absolute', right: 15, marginTop: 30}}
            onPress={() => this.setState({search: true})}>
            <Image source={search} style={{width: 35, height: 35}} />
          </TouchableOpacity>
        ) : (
          <SearchBar
            style={{width: '100%', height: '50%'}}
            onBlur={() => this.setState({search: false})}
            filterText={this.state.filterText}
            handleTextChange={this.handleTextChange}
          />
        )}
        <View style={{width: '100%', height: '90%'}}>
          <TabViewExample
            noMore={this.state.noMore}
            courseList={this.state.courseList}
            handleNav={this.handlePressNav}
            handleCourseNav={this.handleCourseNav}
            getList={this.getList1}
            handleListUpdate={this.handleListUpdate}
            times={this.state.times}
          />
        </View>
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
  Back: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: '3%',
    marginTop: '3%',
  },
  title: {
    marginLeft: '35%',
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: '2%',
  },
});
