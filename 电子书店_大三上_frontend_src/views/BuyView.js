import React from "react";
import BuyInfo from '../components/BuyPagePart/BuyInfo';
import HeadLine from '../components/BasicPart/HeadLine';
import SideBar from '../components/BasicPart/SideBar';
import '../css/BUY.css';
import {withRouter} from "react-router-dom";

class BuyView extends React.Component{
    render(){
        return (
            <div className = "BuyPage">
                <div className = "HeaderPart">
                    <HeadLine username = "ThunderBoy"/>
                </div>
                <div className = "SideBarPart">
                    <SideBar/>
                </div>
                <div className = "buydetailpart">
                    <BuyInfo/>
                </div>
            </div>
        );
    }
}

export default withRouter(BuyView);

