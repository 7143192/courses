import React from 'react';
import '../css/ADMIN.css';
import UserList from '../components/UserManagePage/userManage';
import HeadLine from "../components/BasicPart/HeadLine";
import SideBar from "../components/BasicPart/SideBar";
import {withRouter} from "react-router-dom";

class UserManageView extends React.Component
{
    render = () => {
        return (
            <div>
                <div className = "AdminPage">
                    <div className = "AdminHeaderPart">
                        <HeadLine username = "Administer"/>
                    </div>
                    <div className = "AdminSideBarPart">
                        <SideBar/>
                    </div>
                    <UserList/>
                </div>
            </div>
        );
    }
}

export default withRouter(UserManageView);
