import React from 'react';
import '../../css/INDEX.css';
import Book from './ABook';
import {BaseUrl, MicroUrl} from "../../utils/constants";
/*let books  =
    [["Java核心技术卷II","凯.S.霍斯特曼","50",".30","68",".30"],["ICS","计算机专家","88",".80","128",".00"]
        ,["Effective C++","侯捷","88",".00","100",".80"],["小王子","圣.埃克苏佩里","28",".88","38",".00"],
        ["Java编程思想","外国人","100",".33","120",".88"],["魔兽世界","暴雪","128",".00","150",".88"],
        ["三体","刘慈欣","68",".00","88",".88"],["悲惨世界","雨果","68",".00","88",".33"],
        ["魔力的胎动","东野圭吾","38",".80","55",".88"],["我不怕这漫长黑夜","苑子豪","38",".80","55",".88"],
        ["永久记录","斯诺登","55",".80","80",".88"],["纳尼亚传奇","刘易斯","129",".00","158",".88"]];

let AddBooks = [["红楼梦","曹雪芹","100",".88","120",".88"],["全球通史","阿诺斯","100",".99","128",".88"],
["自控力","麦格尼格尔","66",".00","88",".66"],["对称与不对称"]];
let deleted = [false,false,false,false,false,false,false,false,false,false,false,false];
let Chosen = [false,false,false,false,false,false,false,false,false,false,false,false];*/

import SearchNameAns from "./SearchNameAns";
let bookslist = [];//存储从后端读过来的数据

class BookList extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            List: [],
            PrevList: [],
            shown : false,
            authorName: "",
            bookName: "",
        }
        this.LoadBooks = this.LoadBooks.bind(this);
        this.ShowNewBooks = this.ShowNewBooks.bind(this);
        this.SearchForBooks = this.SearchForBooks.bind(this);
    }

    LoadBooks = () => {
        let url = BaseUrl + "getBooks";
        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then(data => {
                var arr = [];
                Object.keys(data).forEach(function(key) {
                    arr.push(data[key]);
                    console.log(data[key]);
                });
                for(let i = 0;i < arr.length;++i){
                    bookslist.push(arr[i]);
                }
                //localStorage.setItem("books", data);//存储书籍信息在内存中
                localStorage.setItem("books", JSON.stringify(data));//存储书籍信息在内存中
                this.setState({List:data,PrevList:data});
            }).catch(function (ex) {
            console.log('parsing failed', ex)
        })
    }

    componentDidMount=() =>{
        this.LoadBooks();
        document.addEventListener('scroll', this.onScrollHandle.bind(this));//监听滑动到底部的事件
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.onScrollHandle.bind(this));
    }

    ShowNewBooks = () => {
        /*for(let j = 9;j < 12;++j){
            //let book = React.createElement("li",{className:"line1"},<Book i = {j}
            //name = {books[j][0]}/>);
            this.state.List.push(<Book i = {j} name = {books[j][0]}/>);
            Chosen[j] = true;
        }*/
        Object.keys(this.state.PrevList).forEach((key) => {
            if(key % 5 === 0){
                this.state.List.push(this.state.PrevList[key]);
            }
        });
        this.setState({List:this.state.List,PrevList:this.state.List});
    }

    SearchForBooks = () => {
        let newlist = [];
        /*for(let i = 0;i < books.length;++i){
            if(this.props.filterText === "" || (books[i][0].toString().toLowerCase()
                .indexOf(this.props.filterText.toString().toLowerCase()) > -1 && Chosen[i] === true)){
                newlist.push(this.state.PrevList[i]);
                continue;
            }
            if(this.props.filterText === "" || (books[i][0].toString().toLowerCase()
                .indexOf(this.props.filterText.toString().toLowerCase()) > -1 && Chosen[i] === false)){
                newlist.push(<Book i = {i}/>);
            }
        }*/
        /*Object.keys(this.state.PrevList).forEach((key) => {
            //arr.push(data[key]);
            //但是这里使用localStorage.getItem()会出问题。。。
            console.log(this.state.PrevList[key].bookName);
            if(this.props.filterText === "" || (this.state.PrevList[key].bookName
                .toString().toLowerCase().indexOf(this.props.filterText.toString().toLowerCase()) > -1)){
                newlist.push(this.state.PrevList[key]);
            }
        });
        this.setState({
            List:newlist,
        });*/
        //向后端发送关键字请求
        // if(this.props.filterText === "") {
        //     this.setState({List: this.state.PrevList, shown: false});
        //     return ;
        // }
        // let url0 = MicroUrl + "SearchBookByName?name=" + this.props.filterText;
        // fetch(url0)
        //     .then(response => response.json())
        //     .then(data => {
        //         if(data.bookId !== -1) {
        //             //找到了
        //             let ans = [];
        //             ans.push(data);
        //             this.setState({
        //                 shown: true,
        //                 authorName: data.bookAuthor,
        //                 bookName: data.bookName,
        //                 List: ans,
        //             });
        //         }
        //         /*
        //         else {
        //             //若没找到对应的书籍，则默认为进行关键字搜索
        //             this.setState({shown: false});
        //             let url = BaseUrl + "querying?keyword=" + this.props.filterText;
        //             console.log(url);
        //             fetch(url)
        //                 .then(response => response.json())
        //                 .then(data => {
        //                     console.log("query ans=", data);
        //                     this.setState({List: data, shown: false});
        //                 })
        //         }
        //
        //          */
        //
        //     })
        //向后端发送请求，根据书的类别标签进行查询
        if(this.props.filterText === "") {
            this.setState({List: this.state.PrevList, shown: false});
            return ;
        }
        let tag_url = BaseUrl + "searchByTag?tag=" + this.props.filterText;
        console.log("tag_url =" + tag_url);
        fetch(tag_url)
            .then(response => response.json())
            .then(data => {
                this.setState({List: data});
            })
        /*
        let url = BaseUrl + "querying?keyword=" + this.props.filterText;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("query ans=", data);
                this.setState({List: data});
            })
         */
    }

    onScrollHandle(event) {
        let a = document.documentElement.scrollTop===0?
            document.body.clientHeight : document.documentElement.clientHeight;
        let b = document.documentElement.scrollTop===0?
            document.body.scrollTop : document.documentElement.scrollTop;
        let c = document.documentElement.scrollTop===0?
            document.body.scrollHeight : document.documentElement.scrollHeight;
        if(a + b === c){
            this.ShowNewBooks();
            console.log("12345");
        }
    }

    componentDidUpdate(preProps) {
        if(preProps.filterText !== this.props.filterText){
            this.SearchForBooks();
        }
    }

    render=()=>{
        return(
            <div className = "BookList">
                {/*<SearchNameAns shown = {this.state.shown}*/}
                {/*               name={this.state.authorName}*/}
                {/*bookName={this.state.bookName}/>*/}
                <ul className = "books" id = "books">
                    {
                        this.state.List.map((item, index)=>{
                            if(item.isShown === 1){
                                return null;
                            }
                            return < li key ={index}>
                            <Book info = {item}/>
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default BookList;
