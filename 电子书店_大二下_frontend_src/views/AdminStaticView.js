import React from 'react'
import { Menu,Layout, Icon} from 'antd'
import '../css/MAINPAGE.css';
import {Link} from "react-router-dom";
import AdminStaticInfo from "../components/StaticPages/AdminStaticInfo";
import HeadLine from "../components/BasicPart/HeadLine";
import SideBar from "../components/BasicPart/SideBar";

class AdminStaticView extends React.Component{
    render = () => {
        return(
            <div className = "AdminStaticPage">
                <div className = "AdminStaticHeaderPart">
                    <HeadLine username = "Administer"/>
                </div>
                <div className = "AdminStaticSideBarPart">
                    <SideBar/>
                </div>
                <AdminStaticInfo/>
            </div>
        );
    }
}

export default AdminStaticView;
