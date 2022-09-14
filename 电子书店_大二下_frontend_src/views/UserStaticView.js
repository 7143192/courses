import React from 'react'
import '../css/MAINPAGE.css';
import UserStaticInfo from "../components/StaticPages/UserStaticInfo";
import HeadLine from "../components/BasicPart/HeadLine";
import SideBar from "../components/BasicPart/SideBar";

class UserStaticView extends React.Component{
    render = () => {
        return(
            <div className = "AdminStaticPage">
                <div className = "AdminStaticHeaderPart">
                    <HeadLine username = "Administer"/>
                </div>
                <div className = "AdminStaticSideBarPart">
                    <SideBar/>
                </div>
                <UserStaticInfo/>
            </div>
        );
    }
}

export default UserStaticView;
