import React from 'react';
import '../../css/INDEX.css';
import book1 from '../../assets/book1.png';
import book2 from '../../assets/book2.png';
import book3 from '../../assets/book3.png';
import book4 from '../../assets/book4.png';
import book5 from '../../assets/book5.png';
import book6 from '../../assets/book6.png';
import book7 from '../../assets/book7.png';
import book8 from '../../assets/book8.png';
import book9 from '../../assets/book9.png';
import book10 from '../../assets/book10.png';
import book11 from '../../assets/book11.png';
import book12 from '../../assets/book12.png';
import {Link} from "react-router-dom";

const srcs = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12];
const books  =
    [["Java核心技术卷II","凯.S.霍斯特曼","50",".30","68",".30","9787111561279"],["ICS","计算机专家","88",".80","128",".00","9787111561279"]
    ,["Effective C++","侯捷","88",".00","100",".80","9787111561279"],["小王子","圣.埃克苏佩里","28",".88","38",".00","9787111561279"],
    ["Java编程思想","外国人","100",".33","120",".88","9787111561279"],["魔兽世界","暴雪","128",".00","150",".88","9787111561279"],
    ["三体","刘慈欣","68",".00","88",".88","9787111561279"],["悲惨世界","雨果","68",".00","88",".33","9787111561279"],
    ["魔力的胎动","东野圭吾","38",".80","55",".88","9787111561279"],["我不怕这漫长黑夜","苑子豪","38",".80","55",".88","9787111561279"],
    ["永久记录","斯诺登","55",".80","80",".88","9787111561279"],["纳尼亚传奇","刘易斯","129",".00","158",".88","9787111561279"]];
let chosen = [false,false,false,false,false,false,false,false,false,false,false,false];

/*const AddBooks = [
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"},
    {name:"Java核心技术卷II",author:"凯.S.霍斯特曼",robnum:"50",robtail:".30",rnum:"68",rtail:".30",stock:"false"}
];*/

/*class Rob extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          num:"",
          tail:"",
        };
    }

    componentDidMount = () =>{
        this.setState({
           num:books[this.props.i][2],
           tail:books[this.props.i][3],
        });
    }

    render = () =>{
        return (
            <span className="rob">
                <span className="sign">$</span>
                <span className="usernum">
                    {this.state.num}
                </span>
                <span className="usertail">
                    {this.state.tail}
                </span>
            </span>
        );
    }
}


class Pricer extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            num:"",
            tail:"",
        };
        this.BookRef = React.createRef();
    }

    componentDidMount = () =>{
        chosen[this.props.i] = true;
        this.setState({
            num:books[this.props.i][4],
            tail:books[this.props.i][5],
        });
    }
    render=()=>{
        return (
            <span className="price_r">
                <span className="sign">
                    $
                </span>
                <span className="usernum">
                    {this.state.num}
                </span>
                <span className="usertail">
                    {this.state.tail}
                </span>
            </span>
        );
    }
}

class Price extends React.Component{
    render=()=>{
        return(
            <p className="price">
                <Rob i = {this.props.i}/>
                <Pricer i = {this.props.i}/>
            </p>
        );
    }
}

class Img extends React.Component{

    render(){
        return (
            <a className="img" href={'/detail'}
               target= "_blank" rel="noreferrer">
                <img src={srcs[this.props.info.image]} alt="book1" className="BookImg"/>
            </a>
        );
    }
}

class Name extends React.Component{
    render(){
        return (
            <p className="name">
                <a title={books[this.props.i][0]} href={'/detail'}
                   className="bookref" target="_blank" style={{}} rel="noreferrer">
                    {books[this.props.i][0]}
                </a>
            </p>
        );
    }
}

class Author extends React.Component{
    render(){
        return (
            <p className="author">
                <span className="author_t"/>
                {books[this.props.i][1]}
            </p>
        );
    }
}

class ISBN extends React.Component{
    render(){
        return(
            <span className="ISBN">
                <span className="ISBN_t"/>
                ISBN:{books[this.props.i][6]}
            </span>
        );
    }
}*/

class Book extends React.Component{
    getPrice = (price) => {
        let s = price.toString();
        if(s.indexOf(".") < 0){
            s += ".00";
            return s;
        }
        let pos = 0;
        if((pos = s.indexOf(".")) > 0){
            if(pos === s.length - 2){
                s = s + "0";
                return s;
            }
        }
        return s;
    }

    render(){
        const {info} = this.props;
        return(
            <Link to={{
                pathname: '/detail',
                search: '?id=' + info.bookId}}
                  target="_blank">
                <div className = "Book">
                    <a className="img"
                       target= "_blank" rel="noreferrer">
                        <img src={info.bookImage.image} alt="bookImg" className="BookImg"/>
                    </a>
                    <span className="ISBN">
                <span className="ISBN_t"/>
                    ISBN:{info.isbnNum}
                </span>
                    <p className="name">
                        <a title={info.bookName}
                           className="bookref" target="_blank" style={{}} rel="noreferrer">
                            {info.bookName}
                        </a>
                    </p>
                    <p className="author">
                        <span className="author_t"/>
                        {info.bookAuthor}
                    </p>
                    <p className="price">
                    <span className="rob">
                        <span className="sign">￥</span>
                        <span className="usernum">
                            {this.getPrice(info.nowPrice)}
                        </span>
                    </span>
                        <span className="price_r">
                        <span className="sign">￥</span>
                        <span className="usernum">
                            {this.getPrice(info.prevPrice)}
                        </span>
                    </span>
                    </p>
                    <p className="keyword">
                        <span className="keyword_t"/>
                        {info.keyword}
                    </p>
                    <div className="icon_pop"/>
                </div>
            </Link>
        );
    }
}

export default Book;
