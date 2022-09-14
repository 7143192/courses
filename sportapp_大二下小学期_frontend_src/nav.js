import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import UserDetailInfo from '../src/pages/account/userinfo';
import MainPage from '../src/pages/mainpage';
import Comment from './pages/mainpage/deailpages/CirclePart/comment';
import Publish from './pages/mainpage/deailpages/CirclePart/publish';
import PwdLogIn from '../src/pages/account/login/PwdLogIn';
import ResetPwd from '../src/pages/account/login/ResetPwd';
import File1 from '../src/pages/File/File1';
import AllCourses from './pages/mainpage/deailpages/CoursesPart/AllCourses';
import CourseDetailInfo from './pages/mainpage/deailpages/CoursesPart/CourseDetailInfo';
import UserInformation from './pages/mainpage/deailpages/UserInfoPart/UserInformation';
import SportData from './pages/mainpage/deailpages/UserInfoPart/SportData';
import DetailSort from './pages/mainpage/deailpages/UserInfoPart/DetailSort';
import CollectPage from './pages/mainpage/deailpages/UserInfoPart/CollectPage';
import HealthData from './pages/mainpage/deailpages/UserInfoPart/HealthData';
import ForgetPwd from './pages/account/login/ForgetPwd';
import CodeForRegOrLogin from './pages/account/login/CodeForRegOrLogin';
import PlanChoose from './pages/mainpage/deailpages/PlanPart/PlanChoose';
import PlanStart from './pages/mainpage/deailpages/PlanPart/PlanStart';
import PlanDetail from './pages/mainpage/deailpages/PlanPart/PlanDetail';
import NewMap from './pages/mainpage/deailpages/SportRecordPart/BaiduMap';
import SportEndPage from './pages/mainpage/deailpages/SportRecordPart/SportEndPage';
import ExercisePage from './pages/mainpage/deailpages/ExercisePart/ExercisePage';
import ActionPage from './pages/mainpage/deailpages/ExercisePart/ActionPage';
import WorkingPlanPage from './pages/mainpage/deailpages/PlanPart/WorkingPlanPage';
import NoPlanPage from './pages/mainpage/deailpages/PlanPart/NoPlanPage';
import AddUserInfo from './pages/account/login/AddUserInfo';
import HistoryMap from './pages/mainpage/deailpages/SportRecordPart/HistoryMap';
import Toast from 'react-native-easy-toast';
import CourseVideo from './pages/mainpage/deailpages/CoursesPart/CourseVideo';

const Stack = createStackNavigator();
//将App组件中的this赋给全局的self
let self;
//所有子页面均可直接调用global.toast("")来吐司提示消息
global.toast = false;
class Nav extends React.Component {
  componentDidMount() {
    //封装全局方法
    self = this;
    global.toast = function (message) {
      self.refs.toast.show(message);
    };
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="PwdLogIn">
          <Stack.Screen name="HistoryMap" component={HistoryMap} />
          <Stack.Screen name="WorkingPlanPage" component={WorkingPlanPage} />
          <Stack.Screen name="NoPlanPage" component={NoPlanPage} />
          <Stack.Screen name="SportEnd" component={SportEndPage} />
          <Stack.Screen name="SportMap" component={NewMap} />
          <Stack.Screen name="PlanDetail" component={PlanDetail} />
          <Stack.Screen name="PlanStart" component={PlanStart} />
          <Stack.Screen name="PlanChoose" component={PlanChoose} />
          <Stack.Screen name="CollectPage" component={CollectPage} />
          <Stack.Screen name="DetailSort" component={DetailSort} />
          <Stack.Screen name="HealthData" component={HealthData} />
          <Stack.Screen name="Comment" component={Comment} />
          <Stack.Screen name="Publish" component={Publish} />
          <Stack.Screen name="CourseDetail" component={CourseDetailInfo} />
          <Stack.Screen name="SportData" component={SportData} />
          <Stack.Screen name="UserInformation" component={UserInformation} />
          <Stack.Screen name="Main" component={MainPage} />
          <Stack.Screen name="AllCourses" component={AllCourses} />
          <Stack.Screen name="File1" component={File1} />
          <Stack.Screen name="File2" component={File1} />
          <Stack.Screen name="ResetPwd" component={ResetPwd} />
          <Stack.Screen name="PwdLogIn" component={PwdLogIn} />
          <Stack.Screen name="UserDetailInfo" component={UserDetailInfo} />
          <Stack.Screen name="ForgetPwd" component={ForgetPwd} />
          <Stack.Screen
            name="CodeForRegOrLogin"
            component={CodeForRegOrLogin}
          />
          <Stack.Screen name="ActionPage" component={ActionPage} />
          <Stack.Screen name="ExercisePage" component={ExercisePage} />
          <Stack.Screen name="AddUserInfo" component={AddUserInfo} />
          <Stack.Screen name="CourseVideo" component={CourseVideo} />
        </Stack.Navigator>
        <Toast ref={toast => (this.toast = toast)} />
      </NavigationContainer>
    );
  }
}

export default Nav;
