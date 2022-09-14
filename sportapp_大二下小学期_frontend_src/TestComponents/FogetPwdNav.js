import React from 'react';
import ForgetPwd from '../pages/account/login/ForgetPwd';
import ResetPwd from '../pages/account/login/ResetPwd';
import PwdLogIn from '../pages/account/login/PwdLogIn';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const {Navigator, Screen} = createStackNavigator();
function ForgetPwdNav() {
    return (
        <NavigationContainer>
            <Navigator>
                <Screen name="ForgetPwd" component={ForgetPwd} />
                <Screen name="ResetPwd" component={ResetPwd} />
                <Screen name="PwdLogIn" component={PwdLogIn} />
            </Navigator>
        </NavigationContainer>
    );
}

export default ForgetPwdNav;
