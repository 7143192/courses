import React from 'react';
import '../css/MAINPAGE.css';
import HeadLine from '../components/BasicPart/HeadLine';
import SideBar from '../components/BasicPart/SideBar';
import SearchBar from '../components/BasicPart/SearchBar';
import BookList from '../components/MainPage/BookList';
import BookCarousel from '../components/MainPage/BookCarousel';
import {withRouter} from "react-router-dom";
import {BaseUrl} from "../utils/constants";

let data =
    [["Java核心技术卷II","凯.S.霍斯特曼","50",".30","68",".30","科技类书籍","有货"],["ICS","计算机专家","88",".80","128",".00","科技类书籍","有货"]
        ,["Effective C++","侯捷","88",".00","100",".80","科技类书籍","有货"],["小王子","圣.埃克苏佩里","28",".88","38",".00","奇幻小说","有货"],
        ["Java编程思想","外国人","100",".33","120",".88","科技类书籍","有货"],["魔兽世界","暴雪","128",".00","150",".88","奇幻小说","有货"],
        ["三体","刘慈欣","68",".00","88",".88","奇幻小说","有货"],["悲惨世界","雨果","68",".00","88",".33","知名作家","有货"],
        ["魔力的胎动","东野圭吾","38",".80","55",".88","知名作家","有货"],["我不怕这漫长黑夜","苑子豪","38",".80","55",".88","知名作家","有货"],
        ["永久记录","斯诺登","55",".80","80",".88","纪实文学","有货"],["纳尼亚传奇","刘易斯","129",".00","158",".88","奇幻小说","有货"]];

class MainPart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            filterText:"",
        };
        /*
        let url = BaseUrl + "indexing";
        fetch(url)
            .then(response => response.json());

         */
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);


    }

    handleFilterTextChange(filterText) {
        this.setState({ filterText: filterText });
    };

    render(){
        return (
            <div className = "MainPart">
                <SearchBar filterText={this.state.filterText}
                                     onFilterTextChange={this.handleFilterTextChange}/>
                <BookCarousel/>
                <BookList filterText={this.state.filterText}/>
            </div>
        );
    }
}

class MainPageView extends React.Component{
    render(){
        return(
            <div className = "HomePage">
                <div className = "HeaderPart">
                    <HeadLine username = "ThunderBoy"/>
                </div>
                <div className = "SideBarPart">
                    <SideBar/>
                </div>
                <MainPart/>
            </div>
        );
    }
}

export default withRouter(MainPageView);
