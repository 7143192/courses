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
const books  =
    [["Java核心技术卷II","凯.S.霍斯特曼","50",".30","68",".30","科技类书籍","有货"],["ICS","计算机专家","88",".80","128",".00","科技类书籍","有货"]
        ,["Effective C++","侯捷","88",".00","100",".80","科技类书籍","有货"],["小王子","圣.埃克苏佩里","28",".88","38",".00","奇幻小说","有货"],
        ["Java编程思想","外国人","100",".33","120",".88","科技类书籍","有货"],["魔兽世界","暴雪","128",".00","150",".88","奇幻小说","有货"],
        ["三体","刘慈欣","68",".00","88",".88","奇幻小说","有货"],["悲惨世界","雨果","68",".00","88",".33","知名作家","有货"],
        ["魔力的胎动","东野圭吾","38",".80","55",".88","知名作家","有货"],["我不怕这漫长黑夜","苑子豪","38",".80","55",".88","知名作家","有货"],
        ["永久记录","斯诺登","55",".80","80",".88","纪实文学","有货"],["纳尼亚传奇","刘易斯","129",".00","158",".88","奇幻小说","有货"]];
const srcs = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12];
const Description = ["本书是Java领域有影响力和价值的著作之一， 由拥有20多年教学与研究经验的Java 技术专家撰写（获Jolt大奖" +
"）,与《Java编程思想》齐名，10余年全球畅销不衰，广受好评。第10版根据JavaSE8全面更新,同时修正了第9版中的不足,系统全面讲解了Java" +
"语言的核心概念、语法、重要特性和开发方法,包含大量案例,实践性强."];
const BookNums = [1000,1100,1200,1300,1400,1500,1400,1300,1200,1100,1000,1100];
class DetailImg extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            Src : srcs[0],
        };
    }
    render(){
        return (
            <img alt="Details1" src={this.state.Src} className="bookimage"
                 height="400px" width = "320px"/>
        );
    }
}

class BookIntro extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            Description:Description[this.props.i],
        };
    }
    render(){
        return (
            <h4 className="bookdescription">
                {this.state.Description};
            </h4>
        );
    }
}

class DetailInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            BookName : books[this.props.i][0],
            AuthorName : books[this.props.i][1],
            BookType : books[this.props.i][6],
            BookValue: books[this.props.i][2] + books[this.props.i][3],
            BookState : books[this.props.i][7],
            BookNum :BookNums[this.props.i],
        };
    }
    render(){
        const {info} = this.props;
        return (
            <div className="BookContents">
                <h2 id="bookname">{info.bookName}</h2>
                <br/>
                <h4 className="authorname">作者简介：{info.bookAuthor}</h4>
                <br/>
                <h4 className = "booktype">书籍分类：{this.state.BookType}</h4>
                <br/>
                <h4 className="valueword">定价：</h4>
                <h3 className="bookvalue">￥{info.nowPrice}</h3>
                <br/><br/>
                <h4 className="bookstate">状态:{info.storeNum > 0 ? "有货" : "已售完"}</h4>
                <h5 className="booknum">库存数量：{info.storeNum}件</h5>
                <br/><br/>
                <h4 className  = "ISBN">ISBN:{info.isbnNum}</h4>
                <br/><br/>
                <h4>作品简介：</h4>
                <h4 className="bookdescription">
                    {info.description};
                </h4>
                <div className="Clear"/>
                <button type="submit" className="cartbutton">
                    加入购物车
                </button>
                <a href = {"/buy"}>
                    <button type="submit" className="buybutton">
                        立即购买
                    </button>
                </a>
            </div>
        );
    }
}

class BookDetailInfo extends React.Component{
    render(){
        const {info} = this.props;
        if(info == null){
            return null;
        }
        return (
            <div className="Details">
                <img alt="Details1" src={info.image} className="bookimage"
                     height="400px" width = "320px"/>
                <div className="BookContents">
                    <h2 id="bookname">{info.bookName}</h2>
                    <br/>
                    <h4 className="authorname">作者简介：{info.bookAuthor}</h4>
                    <br/>
                    <h4 className="valueword">定价：</h4>
                    <h3 className="bookvalue">￥{info.nowPrice}</h3>
                    <br/><br/>
                    <h4 className="bookstate">状态:{info.storeNum > 0 ? "有货" : "已售完"}</h4>
                    <h5 className="booknum">库存数量：{info.storeNum}件</h5>
                    <br/><br/>
                    <h4 className  = "ISBN">ISBN:{info.isbnNum}</h4>
                    <br/><br/>
                    <h4>作品简介：</h4>
                    <h4 className="bookdescription">
                        {info.description};
                    </h4>
                </div>
            </div>
        );
    }
}

export default BookDetailInfo;
