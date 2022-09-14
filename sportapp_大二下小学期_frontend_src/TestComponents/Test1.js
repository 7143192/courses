import React from 'react';
import PwdLogIn from '../pages/account/login/PwdLogIn';
import ForgetPwd from '../pages/account/login/ForgetPwd';
import CodeForRegOrLogin from '../pages/account/login/CodeForRegOrLogin';
import MainPage from '../pages/mainpage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import AllCourses from '../pages/mainpage/deailpages/CoursesPart/AllCourses';

const {Navigator, Screen} = createStackNavigator();
function Test1() {
  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="PwdLogIn" component={PwdLogIn} />
        <Screen name="ForgetPwd" component={ForgetPwd} />
        <Screen name="CodeForRegOrLogin" component={CodeForRegOrLogin} />
        <Screen name="Main" component={MainPage} />
        <Screen name="AllCourses" component={AllCourses} />
      </Navigator>
    </NavigationContainer>
  );
}

export default Test1;
