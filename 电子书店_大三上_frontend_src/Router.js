import React from 'react';
import { Router, Route, Switch, Redirect} from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import LoginRoute from  './LoginRoute';
import MainPageView from './views/MainPageView';
import LoginView from './views/LoginView';
import DetailView from './views/DetailView';
import AdminView from './views/AdminView';
import ForgetPwdView from './views/ForgetPwdView';
import RegisterView from './views/RegisterView';
import OrdersView from './views/OrdersView';
import CartView from './views/CartView';
import BuyView from './views/BuyView';
import {history} from './utils/history';
import UserManageView from "./views/UserManageView";
import AdminStaticView from "./views/AdminStaticView";
import UserStaticView from "./views/UserStaticView";

function UserManageViewView() {
    return null;
}

class BasicRoute extends React.Component{
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            console.log(location,action);
        });
    }
    render(){
        /*return(
            <Router history = {history}>
                <Route exact path = "/login"><LoginView/></Route>
                <Route exact path = "/"><MainPageView/></Route>
                <Route exact path = "/detail"><DetailView/></Route>
                <Route exact path = "/register"><RegisterView/></Route>
                <Route exact path = "/forgetpwd"><ForgetPwdView/></Route>
                <Route exact path = "/admin"><AdminView/></Route>
                <Route exact path = "/myorder"><OrdersView/></Route>
                <Route exact path = "/cart"><CartView/></Route>
                <Route exact path = "/buy"><BuyView/></Route>
            </Router>
        )*/
        return (
            <Router history = {history}>
                <Switch>
                    <PrivateRoute exact path="/" component={MainPageView} />
                    <Route exact path = "/admin"><AdminView/></Route>
                    <Route exact path = "/login"><LoginView/></Route>
                    <Route exact path = "/detail"><DetailView/></Route>
                    <Route exact path = "/cart"><CartView/></Route>
                    <Route exact path = "/myorder"><OrdersView/></Route>
                    <Route exact path = "/buy"><BuyView/></Route>
                    <Route exact path = "/register"><RegisterView/></Route>
                    <Route exact path = "/forgetpwd"><ForgetPwdView/></Route>
                    <Route exact path = "/userManage"><UserManageView/></Route>
                    <Route exact path = "/AdminStatic"><AdminStaticView/></Route>
                    <Route exact path = "/UserStatic"><UserStaticView/></Route>
                    <Redirect from="/*" to="/"/>
                </Switch>
            </Router>
        )
    }
}

export default BasicRoute;