import React from 'react';
import PwdLogIn from '../pages/account/login/PwdLogIn';
import ForgetPwd from '../pages/account/login/ForgetPwd';
import CodeForRegOrLogin from '../pages/account/login/CodeForRegOrLogin';
import MainPage from '../pages/mainpage';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import CirclePage from '../pages/mainpage/deailpages/CirclePart/CirclePage';
import Comment from '../pages/mainpage/deailpages/CirclePart/comment';
import Publish from '../pages/mainpage/deailpages/CirclePart/publish';

const {Navigator, Screen} = createStackNavigator();
function TestCirclePart() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name={'CirclePage'} component={CirclePage}/>
                <Screen name={'Publish'} component={Publish}/>
                <Screen name="PwdLogIn" component={PwdLogIn} />
                <Screen name="ForgetPwd" component={ForgetPwd} />
                <Screen name="CodeForRegOrLogin" component={CodeForRegOrLogin} />
                <Screen name="Main" component={MainPage} />
                <Screen name={'Comment'} component={Comment}/>
            </Navigator>
        </NavigationContainer>
    );
}

export default TestCirclePart;
