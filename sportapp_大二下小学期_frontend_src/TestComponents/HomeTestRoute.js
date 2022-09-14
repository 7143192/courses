import React from 'react';
import PwdLogIn from '../pages/account/login/PwdLogIn';
import ForgetPwd from '../pages/account/login/ForgetPwd';
import CodeForRegOrLogin from '../pages/account/login/CodeForRegOrLogin';
import MainPage from '../pages/mainpage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AllCourses from '../pages/mainpage/deailpages/CoursesPart/AllCourses';
import ActionPage from '../pages/mainpage/deailpages/ExercisePart/ActionPage';
import CourseDetailInfo from '../pages/mainpage/deailpages/CoursesPart/CourseDetailInfo';
import UserInformation from '../pages/mainpage/deailpages/UserInfoPart/UserInformation';
import PlanStart from '../pages/mainpage/deailpages/PlanPart/PlanStart';
import PlanDetail from '../pages/mainpage/deailpages/PlanPart/PlanDetail';
import PlanChoose from '../pages/mainpage/deailpages/PlanPart/PlanChoose';
import WorkingPlanPage from '../pages/mainpage/deailpages/PlanPart/WorkingPlanPage';

const {Navigator, Screen} = createStackNavigator();
function HomeTestRoute() {
  return (
    <NavigationContainer>
      <Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="PwdLogIn">
        <Screen name="PwdLogIn" component={PwdLogIn} />
        <Screen name="ForgetPwd" component={ForgetPwd} />
        <Screen name="CodeForRegOrLogin" component={CodeForRegOrLogin} />
        <Screen name="Main" component={MainPage} />
        <Screen name="AllCourses" component={AllCourses} />
        <Screen name="ActionPage" component={ActionPage} />
        <Screen name="CourseDetail" component={CourseDetailInfo} />
        <Screen name="UserInformation" component={UserInformation} />
        <Screen name="PlanStart" component={PlanStart} />
        <Screen name="PlanDetail" component={PlanDetail} />
        <Screen name="PlanChoose" component={PlanChoose} />
        <Screen name="WorkingPlanPage" component={WorkingPlanPage} />
      </Navigator>
    </NavigationContainer>
  );
}

export default HomeTestRoute;
